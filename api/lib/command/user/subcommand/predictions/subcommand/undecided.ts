import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';
import { schema } from './common';

export const undecided = {
  schema,
  handler: async (body: any) => {
    const { options } = body.data.options[0].options[0];
    const prognosticatorId = optionValue(options, 'user');

    const predictions = await redbookModel
      .entities
      .PredictionEntity
      .query
      .prognosticatorPrediction({
        prognosticatorId
      })
      .go()

    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'Undecided Predictions',
            description: `The list of <@${prognosticatorId}>'s undecided predictions.`,
            color: 0x808080,
            fields: predictions
              .filter((e) => e.verdict !== true && e.verdict !== false)
              .map((e) => ({
                name: e.predictionId,
                value: e.conditions,
                inline: false,
              })),
          },
        ],
      },
    };
  },
};
