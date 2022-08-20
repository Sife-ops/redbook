import { CommentEntityType, redbookModel } from '@redbook/lib/db';
import { RatingType } from './rating';
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

      replyTo: t.exposeString("replyTo", { nullable: true }),
      comment: t.exposeString("comment"),
      created_at: t.exposeString("created_at"),

      ratings: t.field({
        type: [RatingType],
        resolve: async (parent) => {
          const { RatingEntity } = await redbookModel
            .collections
            .commentRating({
              commentId: parent.commentId,
            })
            .go();
          return RatingEntity;
        }
      }),
    })
  })

