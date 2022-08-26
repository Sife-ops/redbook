import { UserType } from './user';
import { VerdictEntityType, redbookModel } from '@redbook/lib/db';
import { builder } from "../builder";

export const JudgeType = builder
  .objectRef<VerdictEntityType>("Judge")
  .implement({
    fields: t => ({
      predictionId: t.exposeString("predictionId"),

      verdict: t.exposeString("verdict"),

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
      })
    })
  })


