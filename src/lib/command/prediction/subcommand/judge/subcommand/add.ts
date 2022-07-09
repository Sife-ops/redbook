import Joi from 'joi';
import { db } from '@redbook/lib/model';
import { optionValue } from '@redbook/lib/utility';

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
    const predictionUserId = body.member.user.id;

    const { options } = body.data.options[0].options[0];
    const predictionId = optionValue(options, 'id');

    try {
      const prediction = await db
        .selectFrom('prediction')
        .where('user_id', '=', predictionUserId)
        .where('id', '=', predictionId)
        .selectAll()
        .executeTakeFirstOrThrow();

      const judgeUserId = optionValue(options, 'judge');

      await db
        .insertInto('judge')
        .values({
          prediction_id: predictionId,
          user_id: judgeUserId,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

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
                  value: `<@${predictionUserId}>`,
                  inline: true,
                },
                {
                  name: 'Judge',
                  value: `<@${judgeUserId}>`,
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
          content: `<@${predictionUserId}> Adding judge failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }
  },
};
