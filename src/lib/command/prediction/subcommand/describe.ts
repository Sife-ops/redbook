import Joi from 'joi';
import { db } from '../../../model';
import { optionValue } from '../../../utility';

export const describe = {
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
      const predictionJudges = await db
        .selectFrom('prediction')
        .innerJoin('judge', 'judge.prediction_id', 'prediction.id')
        .where('prediction.id', '=', predictionId)
        .select('prediction.id')
        .select('prediction.user_id')
        .select('prediction.conditions')
        .select('prediction.created_at')
        .select('judge.user_id as judge_id')
        .select('judge.verdict')
        .execute();

      const prediction = predictionJudges[0];

      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Prediction',
              description: prediction.conditions,
              color: 0x00ffff,
              fields: [
                {
                  name: 'By',
                  value: `<@${prediction.user_id}>`,
                  inline: true,
                },
                {
                  name: 'Made On',
                  value: prediction.created_at,
                  inline: false,
                },
                {
                  name: 'Judge(s)',
                  value: predictionJudges.reduce((a, c) => {
                    if (!a) {
                      return `<@${c.judge_id}>`;
                    }
                    return `${a} <@${c.judge_id}>`;
                  }, ''),
                  inline: true,
                },
                {
                  name: 'ID',
                  value: prediction.id,
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
          content: `<@${predictionUserId}> Prediction does not exist.`,
        },
      };
    }
  },
};
