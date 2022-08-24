import { CommentEntityType } from '@redbook/lib/db';
import { builder } from "../builder";

export const CommentType = builder
  .objectRef<CommentEntityType>("Comment")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      commentId: t.exposeID("commentId"),

      commenterId: t.exposeString("commenterId"),
      avatar: t.exposeString("avatar"),
      discriminator: t.exposeString("discriminator"),
      username: t.exposeString("username"),

      comment: t.exposeString("comment"),
      created_at: t.exposeInt("created_at"),
      replyTo: t.exposeString("replyTo", { nullable: true }),

      likes: t.exposeInt('likes'),
      dislikes: t.exposeInt('dislikes'),
    })
  })

