import { db } from '../../../model';
import { optionValue } from '../../utility';

export const summary = async (body: any) => {
  const { options } = body.data.options[0];
  const userId = optionValue(options, 'user');

  const predictions = await db
    .selectFrom('prediction')
    .where('user_id', '=', userId)
    .selectAll()
    .execute();

  interface Stats {
    correct: number;
    incorrect: number;
    undecided: number;
    total: number;
  }

  const stats = predictions.reduce(
    (a: Stats, c) => {
      if (c.verdict === null) {
        return {
          ...a,
          undecided: a.undecided + 1,
        };
      } else if (c.verdict) {
        return {
          ...a,
          correct: a.correct + 1,
        };
      } else {
        return {
          ...a,
          incorrect: a.incorrect + 1,
        };
      }
    },
    {
      correct: 0,
      incorrect: 0,
      undecided: 0,
      total: predictions.length,
    }
  );

  return JSON.stringify({
    type: 4,
    data: {
      embeds: [
        {
          title: 'Summary',
          description: `The summary of <@${userId}>'s predictions.`,
          color: 0xff00ff,
          fields: [
            {
              name: 'Total',
              value: stats.total,
              inline: false,
            },
            {
              name: 'Undecided',
              value: stats.undecided,
              inline: false,
            },
            {
              name: 'Correct',
              value: stats.correct,
              inline: true,
            },
            {
              name: 'Incorrect',
              value: stats.incorrect,
              inline: true,
            },
            {
              name: 'Accuracy',
              value: `${
                (stats.correct / (stats.total - stats.undecided)) * 100
              }%`,
              inline: false,
            },
          ],
        },
      ],
    },
  });
};
