import Joi from 'joi';
import { db } from '@redbook/lib/model';
import { optionValue } from '@redbook/lib/utility';

export const cancel = {
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
      const prediction = await db
        .deleteFrom('prediction')
        .where('user_id', '=', predictionUserId)
        .where('id', '=', predictionId)
        .returningAll()
        .executeTakeFirstOrThrow();

      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Prediction Cancelled',
              description: prediction.conditions,
              color: 0xffff00,
              fields: [
                {
                  name: 'By',
                  value: `<@${prediction.user_id}>`,
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
          content: `<@${predictionUserId}> Cancellation failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }
  },
};
