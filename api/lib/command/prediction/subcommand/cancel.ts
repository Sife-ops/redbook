import Joi from 'joi';
import { optionValue } from '@redbook/lib/utility';
import { redbookModel } from '@redbook/lib/db'

export const cancel = {
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
    const prognosticatorId = body.member.user.id;
    const { options } = body.data.options[0];
    const predictionId = optionValue(options, 'id');

    try {
      const { JudgeEntity, PredictionEntity } = await redbookModel
        .collections
        .predictionJudge({
          predictionId
        })
        .go()

      // todo: batch-delete
      await redbookModel
        .entities
        .PredictionEntity
        .remove(PredictionEntity[0])
        .go()

      for (const judge of JudgeEntity) {
        await redbookModel
          .entities
          .JudgeEntity
          .remove(judge)
          .go()
      }
    } catch {
      return {
        type: 4,
        data: {
          content: `<@${prognosticatorId}> Cancellation failed because the prediction does not exist or it is not your prediction.`,
        },
      };
    }

    return {
      type: 4,
      data: {
        embeds: [
          {
            title: 'Prediction Cancelled',
            description: predictionId,
            color: 0xffff00,
          },
        ],
      },
    };
  },
};
