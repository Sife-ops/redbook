import { db } from '@redbook/lib/model';
import { optionValue } from '@redbook/lib/utility';
import { schema } from './common';

export const correct = {
  schema,
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
            title: 'Correct Predictions',
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
