import AWS from "aws-sdk";
import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

const sqs = new AWS.SQS();

const { ONBOARD_SQS } = process.env;

export const create = {
  // todo: better validation library
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array()
            .has(
              Joi.object({
                name: Joi.string().valid('conditions'),
              })
            )
            .has(
              Joi.object({
                name: Joi.string().valid('judge'),
              })
            ),
        })
      ),
      resolved: Joi.object({
        users: Joi.any(),
      })
    }),
    member: Joi.object({
      user: Joi.object({
        avatar: Joi.string(),
        discriminator: Joi.string(),
        id: Joi.string(),
        username: Joi.string(),
      }),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    /*
     * 1) create prediction
     * 2) create judge (verdict)
     * 3) format message
     */

    // 1) create prediction
    const prognosticatorId = body.member.user.id;
    const { options } = body.data.options[0];
    const conditions = optionValue(options, 'conditions');
    const judgeId = optionValue(options, 'judge');
    const judge = body.data.resolved.users[judgeId]; // todo: validation

    // cannot make self default judge (prod only)
    if (
      process.env.REDBOOK_ENV === 'prod' &&
      judge.id === prognosticatorId
    ) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> You cannot make yourself the default judge.`,
        },
      };
    }

    const prediction = await redbookModel
      .entities
      .PredictionEntity
      .create({
        userId: prognosticatorId,
        conditions,
      })
      .go()

    // 2) create judge (verdict)
    await sqs
      .sendMessage({
        QueueUrl: ONBOARD_SQS!,
        MessageBody: JSON.stringify(judge),
      })
      .promise();

    await redbookModel
      .entities
      .VerdictEntity
      .create({
        userId: judge.id,
        predictionId: prediction.predictionId,
      })
      .go()

    // 3) format message
    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'New Prediction',
            description: conditions,
            color: 0x00ffff,
            fields: [
              {
                name: 'By',
                value: `<@${prognosticatorId}>`,
                inline: true,
              },
              {
                name: 'Judge',
                value: `<@${judgeId}>`,
                inline: true,
              },
              {
                name: 'ID',
                value: prediction.predictionId,
                inline: false,
              },
            ],
          },
        ],
      },
    };
  },
};
