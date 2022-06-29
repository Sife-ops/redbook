import Joi from 'joi';
import { db } from '../../../model';
import { optionValue } from '../../../utility';

export const predictions = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array().has(
            Joi.object({
              name: Joi.string().valid('user'),
            })
          ),
        })
      ),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    const { options } = body.data.options[0];
    const userId = optionValue(options, 'user');

    const predictions = await db
      .selectFrom('prediction')
      .where('user_id', '=', userId)
      .selectAll()
      .execute();

    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'Predictions',
            description: `The list of all <@${userId}>'s predictions.`,
            color: 0x808080,
            fields: predictions.map((e) => ({
              name: e.id,
              value: e.conditions,
              inline: false,
            })),
          },
        ],
      },
    };
  },
};
