import Joi from 'joi';
import { db } from '@redbook/lib/model';
import { optionValue } from '@redbook/lib/utility';

export const remove = {
  schema: Joi.object({
    data: Joi.object({
      options: Joi.array().has(
        Joi.object({
          options: Joi.array().has(
            Joi.object({
              options: Joi.array()
                .has(
                  Joi.object({
                    name: Joi.string().valid('judge'),
                  })
                )
                .has(
                  Joi.object({
                    name: Joi.string().valid('id'),
                  })
                ),
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

    const { options } = body.data.options[0].options[0];
    const predictionId = optionValue(options, 'id');

    try {
      const prediction = await db
        .selectFrom('prediction')
        .where('user_id', '=', predictionUserId)
        .where('id', '=', predictionId)
        .selectAll()
        .executeTakeFirstOrThrow();

      const judgeUserId = optionValue(options, 'judge');

      const judges = await db
        .selectFrom('judge')
        .where('prediction_id', '=', prediction.id)
        .selectAll()
        .execute();

      if (judges.length < 2) {
        return {
          type: 4,
          data: {
            content: `<@${predictionUserId}> Removing judge failed because there must be at least one judge.`,
          },
        };
      }

      // must remove self if you are a judge and there are only 2 judges
      if (
        judges.length < 3 &&
        judges.find((e) => e.id === predictionUserId) &&
        judgeUserId !== predictionUserId
      ) {
        return {
          type: 4,
          data: {
            content: `<@${predictionUserId}> Removing judge failed because that would make you the default judge. Remove yourself first.`,
          },
        };
      }

      await db
        .deleteFrom('judge')
        .where('user_id', '=', judgeUserId)
        .where('prediction_id', '=', predictionId)
        .returningAll()
        .executeTakeFirstOrThrow();

      return {
        type: 4,
        data: {
          embeds: [
            {
              title: 'Judge Removed',
              description: prediction.conditions,
              color: 0x00baff,
              fields: [
                {
                  name: 'By',
                  value: `<@${predictionUserId}>`,
                  inline: true,
                },
                {
                  name: 'Judge',
                  value: `<@${judgeUserId}>`,
                  inline: true,
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
    } catch {
      return {
        type: 4,
        data: {
          content: `<@${predictionUserId}> Removing judge failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }
  },
};
