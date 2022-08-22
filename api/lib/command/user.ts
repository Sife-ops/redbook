import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

const { SITE_URL, REDBOOK_ENV } = process.env;

export const user = {
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
    const { options } = body.data;
    const prognosticatorId = optionValue(options, 'user');

    const predictions = await redbookModel
      .entities
      .PredictionEntity
      .query
      .prognosticatorPrediction({
        prognosticatorId
      }).go()

    interface Stats {
      correct: number;
      incorrect: number;
      undecided: number;
      total: number;
    }

    // todo: test after refactoring vote command
    const stats = predictions.reduce(
      (a: Stats, c) => {
        if (c.verdict === undefined) {
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

    const url = REDBOOK_ENV === 'dev'
      ? 'http://localhost:5173'
      : SITE_URL;

    return {
      type: 4,
      data: {
        flags: 64,
        embeds: [
          {
            title: 'Summary',
            description: `The summary of <@${prognosticatorId}>'s predictions.`,
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
                value: (() => {
                  const decided = stats.correct + stats.incorrect;
                  if (decided === 0) {
                    return 'unavailable';
                  } else {
                    return `${(stats.correct / decided) * 100}%`
                  }
                })(),
                inline: false,
              },
            ],
          },
          {
            title: 'Redbook Web Link',
            description: `don't share links`,
            url: `${url}/user/${prognosticatorId}`,
            color: 0xff0000,
          },
        ],
      },
    };
  },
};
