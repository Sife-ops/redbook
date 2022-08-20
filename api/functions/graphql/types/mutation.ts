import { builder } from "../builder";
import { redbookModel } from '@redbook/lib/db';
import { ulid } from 'ulid';

builder.mutationFields(t => ({
  comment: t.string({
    args: {
      comment: t.arg.string({ required: true })
    },
    // todo: no explicit any
    resolve: async (_, args, context: any) => {
      await redbookModel
        .entities
        .CommentEntity
        .create({
          predictionId: context.predictionId,
          commentId: ulid(),

          commenterId: context.userId,
          username: context.username,
          discriminator: context.discriminator,
          avatar: context.avatar,

          comment: args.comment,
          created_at: new Date().toISOString(),
        })
        .go();

      return 'comment';
    }
  }),

  rate: t.string({
    args: {
      commentId: t.arg.string(),
      like: t.arg.boolean({ required: true }),
    },
    // todo: no explicit any
    // todo: destructure context
    resolve: async (_, args, context: any) => {
      const predictionId = context.predictionId as string;
      const commentId = args.commentId || '';

      // look up previous rating
      const ratings = await redbookModel
        .entities
        .RatingEntity
        .query
        .criticRating({
          criticId: context.userId,
          predictionId,
        })
        .where(({ commentId: c }, { eq }) => eq(c, commentId))
        .go();

      // create rating if no previous rating
      if (ratings.length < 1) {
        await redbookModel
          .entities
          .RatingEntity
          .create({
            predictionId,
            commentId,

            criticId: context.userId,
            avatar: context.avatar,
            username: context.username,
            discriminator: context.discriminator,

            like: args.like,
          })
          .go();

        return `create: ${args.like}`;
      }

      // remove if same rating
      const rating = ratings[0];

      if (rating.like === args.like) {
        await redbookModel
          .entities
          .RatingEntity
          .remove({
            criticId: context.userId,
            predictionId,
            commentId,
          })
          .go();

        return `remove: ${args.like}`;
      }

      // update if different rating
      await redbookModel
        .entities
        .RatingEntity
        .update({
          criticId: context.userId,
          predictionId,
          commentId,
        })
        .set({
          like: args.like
        })
        .go();

      return `update: ${args.like}`;
    }
  })
}));


