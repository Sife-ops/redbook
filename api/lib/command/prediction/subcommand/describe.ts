import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

export const describe = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array().has(
            Joi.object({
              name: Joi.string().valid('id'),
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
    const { options } = body.data.options[0];
    const predictionId = optionValue(options, 'id');

    const { PredictionEntity, JudgeEntity } = await redbookModel
      .collections
      .predictionJudge({
        predictionId
      }).go();

    if (PredictionEntity.length < 1) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Prediction does not exist.`,
        },
      };
    }

    const prediction = PredictionEntity[0];

    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'Prediction',
            description: prediction.conditions,
            color: 0x00ffff,
            fields: [
              {
                name: 'By',
                value: `<@${prediction.prognosticatorId}>`,
                inline: true,
              },
              {
                name: 'Made On',
                value: prediction.created_at,
                inline: false,
              },
              {
                name: 'Judge(s)',
                value: JudgeEntity.reduce((a, c) => {
                  if (!a) {
                    return `<@${c.judgeId}>`;
                  } else {
                    return `${a} <@${c.judgeId}>`;
                  }
                }, ''),
                inline: true,
              },
              {
                name: 'ID',
                value: prediction.predictionId,
                inline: false,
              },
              {
                name: 'Web',
                value: `${process.env.SITE_URL}/${prediction.predictionId}`,
                inline: false,
              },
            ],
          },
        ],
      },
    };
  },
};
