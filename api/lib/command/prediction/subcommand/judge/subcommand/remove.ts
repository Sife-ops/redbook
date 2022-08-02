import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db';

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
    const prognosticatorId = body.member.user.id;
    const { options } = body.data.options[0].options[0];
    const predictionId = optionValue(options, 'id');

    const { PredictionEntity, JudgeEntity } = await redbookModel.collections.predictionJudges({
      predictionId,
    }).go()

    // prediction must exist and belong to user
    if (
      PredictionEntity.length < 1 ||
      PredictionEntity[0].prognosticatorId !== prognosticatorId
    ) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Removing judge failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }

    const judgeId = optionValue(options, 'judge');

    // specified user must be a judge
    if (!JudgeEntity.find(e => e.judgeId === judgeId)) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Removing judge failed because the specified user is not a judge.`,
        },
      };
    }

    // cannot remove last judge
    if (JudgeEntity.length < 2) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Removing judge failed because there must be at least one judge.`,
        },
      };
    }

    // must remove self if you are a judge and there are only 2 judges
    if (
      JudgeEntity.length < 3 &&
      JudgeEntity.find((e) => e.judgeId === prognosticatorId) &&
      judgeId !== prognosticatorId
    ) {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Removing judge failed because that would make you the default judge. Remove yourself first.`,
        },
      };
    }

    // todo: use try/catch
    await redbookModel.entities.JudgeEntity.remove({
      judgeId,
      predictionId,
    }).go()

    const prediction = PredictionEntity[0]

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
                value: `<@${prognosticatorId}>`,
                inline: true,
              },
              {
                name: 'Judge',
                value: `<@${judgeId}>`,
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
  },
};
