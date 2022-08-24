import { CommentType } from './comment';
import { JudgeType } from './judge';
import { PredictionEntityType, redbookModel } from '@redbook/lib/db';
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
      verdict: t.exposeString("verdict"),
      created_at: t.exposeInt("created_at"),

      likes: t.exposeInt('likes'),
      dislikes: t.exposeInt('dislikes'),

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

