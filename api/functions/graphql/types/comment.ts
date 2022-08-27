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
      created_at: t.exposeString("created_at"),
      // replyTo: t.exposeString("replyTo", { nullable: true }),

      likes: t.exposeInt('likes'),
      dislikes: t.exposeInt('dislikes'),

      user: t.field({
        type: UserType,
        resolve: async (parent) => {
          const [user] = await redbookModel
            .entities
            .UserEntity
            .query
            .user({ userId: parent.userId })
            .go();
          return user;
        }
      }),

      replies: t.field({
        type: [ReplyType],
        resolve: async (parent) => {
          return await redbookModel
            .entities
            .CommentEntity
            .query
            .collection({ predictionId: parent.predictionId })
            .where(({ replyTo }, { eq }) => eq(replyTo, parent.commentId))
            .go();
        }
      }),
    })
  })

const ReplyType = builder
  .objectRef<CommentEntityType>("Reply")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      commentId: t.exposeID("commentId"),

      comment: t.exposeString("comment"),
      created_at: t.exposeString("created_at"),

      likes: t.exposeInt('likes'),
      dislikes: t.exposeInt('dislikes'),

      user: t.field({
        type: UserType,
        resolve: async (parent) => {
          const [user] = await redbookModel
            .entities
            .UserEntity
            .query
            .user({ userId: parent.userId })
            .go();
          return user;
        }
      }),
    })
  })

