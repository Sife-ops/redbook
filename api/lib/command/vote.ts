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

    const { PredictionEntity, JudgeEntity } = await redbookModel
      .collections
      .predictionJudges({
        predictionId
      }).go();

    if (
      PredictionEntity.length < 1 ||
      !JudgeEntity.find(e => e.judgeId === judgeId)
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

    if (prediction.verdict !== undefined) {
      return {
        type: 4,
        data: {
          content: `<@${judgeId}> Voting on this prediction has ended.`,
        },
      };
    }

    // 3) update judge verdict
    const verdict = optionValue(options, 'verdict');

    await redbookModel.entities.JudgeEntity.put({
      judgeId,
      predictionId,
      verdict,
    }).go()

    const judges = JudgeEntity.map(e => {
      if (e.judgeId === judgeId) {
        return {
          ...e,
          verdict
        }
      }
      return e;
    })

    // 4) count votes
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
        await redbookModel.entities.PredictionEntity.put({
          ...prediction,
          verdict: false
        }).go()
      } else {
        await redbookModel.entities.PredictionEntity.put({
          ...prediction,
          verdict: true
        }).go()
      }
      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Verdict',
              description: `A prediction has been voted ${count.yes < 1 ? 'incorrect' : 'correct'
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
                  value: `<@${prediction.prognosticatorId}>`,
                  inline: false,
                },
                {
                  name: 'Judge(s)',
                  value: JudgeEntity.reduce((a, c) => {
                    return `${a}<@${c.judgeId}>`;
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
                  value: `<@${prediction.prognosticatorId}>`,
                  inline: false,
                },
                {
                  name: 'Undecided',
                  value: judges.reduce((a, c) => {
                    if (c.verdict !== true && c.verdict !== false) {
                      return `${a}<@${c.judgeId}>`;
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
