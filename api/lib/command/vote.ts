import Joi from 'joi';
import { db } from '../model';
import { optionValue } from '../utility';

export const vote = {
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
    /*
     * 1) voter must be a judge
     * 2) check prediction verdict
     * 3) update judge verdict
     * 4) count votes
     * 5) format response
     */

    // 1) voter must be a judge
    const voterUserId = body.member.user.id;
    const { options } = body.data;
    const predictionId = optionValue(options, 'id');

    let judge;
    try {
      judge = await db
        .selectFrom('judge')
        .select('id')
        .where('prediction_id', '=', predictionId)
        .where('user_id', '=', voterUserId)
        .executeTakeFirstOrThrow();
    } catch {
      return JSON.stringify({
        type: 4,
        data: {
          content: `<@${voterUserId}> Vote failed because the prediction does not exist or you are not a judge.`,
        },
      });
    }

    // 2) check prediction verdict
    const prediction = await db
      .selectFrom('prediction')
      .selectAll()
      .where('id', '=', predictionId)
      .executeTakeFirst();

    if (prediction?.verdict !== null) {
      return JSON.stringify({
        type: 4,
        data: {
          content: `<@${voterUserId}> Voting on this prediction has ended.`,
        },
      });
    }

    // 3) update judge verdict
    const verdict = optionValue(options, 'verdict');

    await db
      .updateTable('judge')
      .set({ verdict })
      .where('id', '=', judge.id)
      .executeTakeFirstOrThrow();

    // 4) count votes
    const judges = await db
      .selectFrom('judge')
      .selectAll()
      .where('prediction_id', '=', predictionId)
      .execute();

    const count = judges.reduce(
      (a: { yes: number; no: number; undecided: number }, c) => {
        if (c.verdict !== true && c.verdict !== false) {
          return {
            ...a,
            undecided: a.undecided + 1,
          };
        } else if (c.verdict === true) {
          return {
            ...a,
            yes: a.yes + 1,
          };
        } else {
          return {
            ...a,
            no: a.no + 1,
          };
        }
      },
      {
        yes: 0,
        no: 0,
        undecided: 0,
      }
    );

    // 5) format response
    if (count.undecided < 1) {
      if (count.yes < 1) {
        await db
          .updateTable('prediction')
          .set({ verdict: false })
          .where('id', '=', predictionId)
          .executeTakeFirstOrThrow();
      } else {
        await db
          .updateTable('prediction')
          .set({ verdict: true })
          .where('id', '=', predictionId)
          .executeTakeFirstOrThrow();
      }
      return JSON.stringify({
        type: 4,
        data: {
          embeds: [
            {
              title: 'Verdict',
              description: `A prediction has been voted ${
                count.yes < 1 ? 'incorrect' : 'correct'
              } by the judge(s).`,
              color: count.yes < 1 ? 0xff0000 : 0x00ff00,
              fields: [
                {
                  name: 'Prediction',
                  value: prediction.conditions,
                  inline: false,
                },
                {
                  name: 'Made On',
                  value: prediction.created_at,
                  inline: false,
                },
                {
                  name: 'By',
                  value: `<@${prediction.user_id}>`,
                  inline: false,
                },
                {
                  name: 'Judge(s)',
                  value: judges.reduce((a, c) => {
                    return `${a}<@${c.user_id}>`;
                  }, ''),
                  inline: false,
                },
              ],
            },
          ],
        },
      });
    } else {
      return JSON.stringify({
        type: 4,
        data: {
          embeds: [
            {
              title: 'Vote',
              description: `<@${voterUserId}> has voted ${
                verdict ? 'in favor of' : 'against'
              } a prediction.`,
              color: 0x0000ff,
              fields: [
                {
                  name: 'Prediction',
                  value: prediction.conditions,
                  inline: false,
                },
                {
                  name: 'By',
                  value: `<@${prediction.user_id}>`,
                  inline: false,
                },
                {
                  name: 'Undecided',
                  value: judges.reduce((a, c) => {
                    if (c.verdict !== true && c.verdict !== false) {
                      return `${a}<@${c.user_id}>`;
                    }
                    return a;
                  }, ''),
                  inline: false,
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
      });
    }
  },
};
