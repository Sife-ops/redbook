import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';
import { sign } from 'jsonwebtoken';

const { SITE_URL, REDBOOK_ENV, TOKEN_SECRET } = process.env;

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
        username: Joi.string(),
        discriminator: Joi.string(),
        avatar: Joi.string(),
      }),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    const {
      id: userId,
      username,
      discriminator,
      avatar
    } = body.member.user;

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
          content: `<@${userId}> Prediction does not exist.`,
        },
      };
    }

    // todo: direct message
    const prediction = PredictionEntity[0];

    const url = REDBOOK_ENV === 'dev'
      ? 'http://localhost:5173'
      : SITE_URL;

    const token = sign(
      {
        predictionId,
        userId,
        username,
        discriminator,
        avatar,
      },
      TOKEN_SECRET
    );

    return {
      type: 4,
      data: {
        flags: 64,
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
            ],
          },
          {
            title: 'Redbook Web Link',
            description: `don't share links`,
            url: `${url}/${prediction.predictionId}?token=${token}`,
            color: 0xff0000,
          },
        ],
      },
    };
  },
};
