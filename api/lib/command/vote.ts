import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

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
    const judgeId = body.member.user.id;
    const { options } = body.data;
    const predictionId = optionValue(options, 'id');

    const { PredictionEntity, VerdictEntity } = await redbookModel
      .collections
      .prediction({
        predictionId
      }).go();

    if (
      PredictionEntity.length < 1 ||
      !VerdictEntity.find(e => e.userId === judgeId)
    ) {
      return {
        type: 4,
        data: {
          content: `<@${judgeId}> Vote failed because the prediction does not exist or you are not a judge.`,
        },
      };
    }

    // 2) check prediction verdict
    const prediction = PredictionEntity[0];

    if (prediction.verdict !== 'none') {
      return {
        type: 4,
        data: {
          content: `<@${judgeId}> Voting on this prediction has ended.`,
        },
      };
    }

    // 3) update judge verdict
    const verdict = (() => {
      const v = optionValue(options, 'verdict');
      return v ? 'correct' : 'incorrect';
    })();

    await redbookModel
      .entities
      .VerdictEntity
      .update({
        userId: judgeId,
        predictionId
      })
      .set({
        verdict
      }).go()

    const judges = VerdictEntity.map(e => {
      if (e.userId === judgeId) {
        return {
          ...e,
          verdict
        }
      }
      return e;
    })

    // 4) count votes
    const count = judges.reduce(
      (a: { correct: number; incorrect: number; none: number }, c) => {
        // if (c.verdict !== true && c.verdict !== false) {
        if (c.verdict === 'none') {
          return {
            ...a,
            none: a.none + 1,
          };
        } else if (c.verdict === 'correct') {
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
        none: 0,
      }
    );

    // 5) format response
    if (count.none < 1) {
      if (count.correct < 1) {
        await redbookModel
          .entities
          .PredictionEntity
          .put({
            ...prediction,
            verdict: 'incorrect'
          })
          .go()
      } else {
        await redbookModel
          .entities
          .PredictionEntity
          .put({
            ...prediction,
            verdict: 'correct'
          })
          .go()
      }
      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Verdict',
              description: `A prediction has been voted ${count.correct < 1 ? 'incorrect' : 'correct'
                } by the judge(s).`,
              color: count.correct < 1 ? 0xff0000 : 0x00ff00,
              fields: [
                {
                  name: 'Prediction',
                  value: prediction.conditions,
                  inline: false,
                },
                {
                  name: 'Made On',
                  value: new Date(parseInt(prediction.created_at)).toLocaleDateString(),
                  inline: false,
                },
                {
                  name: 'By',
                  value: `<@${prediction.userId}>`,
                  inline: false,
                },
                {
                  name: 'Judge(s)',
                  value: VerdictEntity.reduce((a, c) => {
                    return `${a}<@${c.userId}>`;
                  }, ''),
                  inline: false,
                },
              ],
            },
          ],
        },
      };
    } else {
      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Vote',
              description: `<@${judgeId}> has voted ${verdict ? 'in favor of' : 'against'
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
                  value: `<@${prediction.userId}>`,
                  inline: false,
                },
                {
                  name: 'Undecided',
                  value: judges.reduce((a, c) => {
                    if (c.verdict === 'none') {
                      return `${a}<@${c.userId}>`;
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
      };
    }
  },
};

