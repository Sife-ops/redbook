import Joi from 'joi';
import { db } from '../../../../../model';
import { optionValue } from '../../../../../utility';

export const correct = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array().has(
            Joi.object({
              options: Joi.array().has(
                Joi.object({
                  name: Joi.string().valid('user'),
                })
              ),
            })
          ),
        })
      ),
    }),
  }).options({ allowUnknown: true }),

  handler: async (body: any) => {
    const { options } = body.data.options[0].options[0];
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
            description: `The list of <@${userId}>'s correct predictions.`,
            color: 0x808080,
            fields: predictions
              .filter((e) => e.verdict)
              .map((e) => ({
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
