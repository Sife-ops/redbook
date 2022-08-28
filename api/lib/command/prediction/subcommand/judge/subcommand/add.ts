import AWS from "aws-sdk";
import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

const sqs = new AWS.SQS();

const { ONBOARD_SQS } = process.env;

export const add = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array().has(
            Joi.object({
              options: Joi.array()
                .has(
                  Joi.object({
                    name: Joi.string().valid('judge'),
                  })
                )
                .has(
                  Joi.object({
                    name: Joi.string().valid('id'),
                  })
                ),
            })
          ),
        })
      ),
    }),
    member: Joi.object({
      user: Joi.object({
        id: Joi.string(),
      }),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    const prognosticatorId = body.member.user.id;
    const { options } = body.data.options[0].options[0];
    const predictionId = optionValue(options, 'id');

    const predictions = await redbookModel
      .entities
      .PredictionEntity
      .query
      .prediction({
        userId: prognosticatorId,
        predictionId,
      }).go()

    if (predictions.length < 1) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Adding judge failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }

    const judgeId = optionValue(options, 'judge');
    const judge = body.data.resolved.users[judgeId]; // todo: validation

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
        predictionId,
      }).go()

    const prediction = predictions[0]

    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'Judge Added',
            description: prediction.conditions,
            color: 0x00baff,
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
                value: predictionId,
                inline: false,
              },
            ],
          },
        ],
      },
    };
  },
};
