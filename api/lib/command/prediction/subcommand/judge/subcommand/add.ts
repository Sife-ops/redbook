import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

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

    const predictions = await redbookModel.entities.PredictionEntity.query.prognosticatorPrediction({
      prognosticatorId,
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

    await redbookModel.entities.JudgeEntity.create({
      judgeId,
      predictionId,
      discriminator: judge.discriminator,
      username: judge.username,
      avatar: judge.avatar,
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
