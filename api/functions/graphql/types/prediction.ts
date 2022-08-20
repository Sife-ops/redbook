import { CommentType } from './comment';
import { JudgeType } from './judge';
import { PredictionEntityType, redbookModel } from '@redbook/lib/db';
import { RatingType } from './rating';
import { builder } from "../builder";

export const PredictionType = builder
  .objectRef<PredictionEntityType>("Prediction")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),

      prognosticatorId: t.exposeString("prognosticatorId"),
      avatar: t.exposeString("avatar"),
      discriminator: t.exposeString("discriminator"),
      username: t.exposeString("username"),

      conditions: t.exposeString("conditions"),
      created_at: t.exposeString("created_at"),
      verdict: t.exposeBoolean("verdict", { nullable: true }),

      judges: t.field({
        type: [JudgeType],
        resolve: async (parent) => {
          // todo: parent resolver resolves judges...
          const { JudgeEntity } = await redbookModel
            .collections
            .predictionJudge({
              predictionId: parent.predictionId,
            })
            .go();
          return JudgeEntity;
        }
      }),

      ratings: t.field({
        type: [RatingType],
        resolve: async (parent) => {
          const { RatingEntity } = await redbookModel
            .collections
            .predictionRating({
              predictionId: parent.predictionId,
            })
            .where(({ commentId }, { eq }) => eq(commentId, ''))
            .go();
          return RatingEntity;
        }
      }),

      comments: t.field({
        type: [CommentType],
        resolve: async (parent) => {
          const { CommentEntity } = await redbookModel
            .collections
            .predictionComment({
              predictionId: parent.predictionId,
            })
            .go();
          return CommentEntity;
        }
      })
    })
  })

