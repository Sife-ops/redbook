import { CommentType } from './comment';
import { JudgeType } from './judge';
import { PredictionEntityType, redbookModel } from '@redbook/lib/db';
import { UserType } from './user';
import { builder } from "../builder";

export const PredictionType = builder
  .objectRef<PredictionEntityType>("Prediction")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),

      conditions: t.exposeString("conditions"),
      verdict: t.exposeString("verdict"),
      created_at: t.exposeInt("created_at"),

      likes: t.exposeInt('likes'),
      dislikes: t.exposeInt('dislikes'),

      user: t.field({
        type: UserType,
        resolve: async (parent) => {
          const [user] = await redbookModel
            .entities
            .UserEntity
            .query
            .user({
              userId: parent.userId
            }).go()
          return user;
        }
      }),

      judges: t.field({
        type: [JudgeType],
        resolve: async (parent) => {
          return await redbookModel
            .entities
            .PredictionEntity
            .query
            .collection({
              predictionId: parent.predictionId,
            }).go();
        }
      }),

      comments: t.field({
        type: [CommentType],
        resolve: async (parent) => {
          return await redbookModel
            .entities
            .CommentEntity
            .query
            .collection({
              predictionId: parent.predictionId
            }).go()
        }
      })
    })
  })

