import { CommentEntityType, redbookModel } from '@redbook/lib/db';
import { UserType } from './user';
import { builder } from "../builder";

export const CommentType = builder
  .objectRef<CommentEntityType>("Comment")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      commentId: t.exposeID("commentId"),

      comment: t.exposeString("comment"),
      created_at: t.exposeInt("created_at"),
      replyTo: t.exposeString("replyTo", { nullable: true }),

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
    })
  })

