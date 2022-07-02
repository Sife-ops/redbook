import Joi from 'joi';
import { db } from '../../../model';
import { optionValue } from '../../../utility';

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
    const predictionUserId = body.member.user.id;
    const { options } = body.data.options[0];
    const predictionId = optionValue(options, 'id');

    try {
      // todo: query relation?
      const prediction = await db
        .selectFrom('prediction')
        .where('id', '=', predictionId)
        .selectAll()
        .executeTakeFirstOrThrow();

      const judges = await db
        .selectFrom('judge')
        .where('prediction_id', '=', predictionId)
        .selectAll()
        .execute();

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
                  value: `<@${predictionUserId}>`,
                  inline: true,
                },
                {
                  name: 'Made On',
                  value: prediction.created_at,
                  inline: false,
                },
                {
                  name: 'Judge(s)',
                  value: judges.reduce((a, c) => {
                    if (!a) {
                      return `<@${c.user_id}>`;
                    }
                    return `${a} <@${c.user_id}>`;
                  }, ''),
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
    } catch {
      return {
        type: 4,
        data: {
          content: `<@${predictionUserId}> Prediction does not exist.`,
        },
      };
    }
  },
};
