import AWS from "aws-sdk";
import Joi from 'joi';
import { optionValue, mnemonic } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db'

const sqs = new AWS.SQS();

export const create = {
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
     * 2) create judge
     * 3) format message
     */

    // 1) create prediction

    let predictionId = mnemonic();

    // todo: automation service to detect collisions
    // // report mnemonic predictionId collisions
    // redbookModel.entities.PredictionEntity.query.prediction({ predictionId })
    //   .go()
    //   .then(e => {
    //     if (e.length > 1) {
    //       console.log('WARNING');
    //       console.log('mnemonic predictionId conflict:', predictionId);
    //       // todo: test duplicate mnemonic dlq
    //       sqs.sendMessage({
    //         QueueUrl: process.env.MNEMONIC_DLQ!,
    //         MessageBody: JSON.stringify({
    //           mnemonic: predictionId
    //         })
    //       });
    //     }
    //   })

    const { avatar, discriminator, username } = body.member.user;
    const prognosticatorId = body.member.user.id;
    const { options } = body.data.options[0];
    const conditions = optionValue(options, 'conditions');

    redbookModel.entities.PredictionEntity.create({
      predictionId,
      prognosticatorId,
      username,
      discriminator,
      avatar,
      conditions,
      created_at: new Date().toISOString()
    }).go()

    // 2) create judge

    const judgeId = optionValue(options, 'judge');

    // cannot make self default judge
    if (
      process.env.REDBOOK_ENV === 'prod' &&
      judgeId === prognosticatorId
    ) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> You cannot make yourself the default judge.`,
        },
      };
    }

    redbookModel.entities.JudgeEntity.create({
      judgeId,
      predictionId,
    }).go()

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
                value: predictionId,
                inline: false,
              },
            ],
            // todo: user footer
            // footer: {
            //   text: `Permalink?`,
            // },
          },
        ],
      },
    };
  },
};
