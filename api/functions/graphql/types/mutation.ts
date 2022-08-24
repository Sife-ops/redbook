import { CommentType } from './comment';
import { builder } from "../builder";
import { redbookModel } from '@redbook/lib/db';

builder.mutationFields(t => ({
  comment: t.field({
    type: CommentType,
    args: {
      predictionId: t.arg.string({ required: true }),
      comment: t.arg.string({ required: true })
    },
    // todo: no explicit any
    resolve: async (_, args, context: any) => {
      const comment = await redbookModel
        .entities
        .CommentEntity
        .create({
          predictionId: args.predictionId,

          commenterId: context.userId,
          username: context.username,
          discriminator: context.discriminator,
          avatar: context.avatar,

          comment: args.comment,
        })
        .go();

      return comment;
    }
  }),

  rate: t.string({
    args: {
      predictionId: t.arg.string({ required: true }),
      commentId: t.arg.string(),
      rating: t.arg.boolean({ required: true }),
    },
    // todo: no explicit any
    // todo: destructure context
    resolve: async (_, args, context: any) => {
      const predictionId = args.predictionId;
      const commentId = args.commentId || '';
      const rating = args.rating ? 'like' : 'dislike';

      // look up previous rating
      const criticRatings = await redbookModel
        .entities
        .RatingEntity
        .query
        .criticRating({
          criticId: context.userId,
          predictionId,
          // commentId, // todo: why no work?
        })
        .where(({ commentId: c }, { eq }) => eq(c, commentId))
        .go();

      let operation: 'add' | 'subtract' | undefined = undefined;

      // create rating if no previous rating
      if (criticRatings.length < 1) {
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

            rating
          })
          .go();

        operation = 'add';
      } else {
        // if already rated, change to 'none'
        const [criticRating] = criticRatings;
        if (criticRating.rating !== 'none') {
          await redbookModel
            .entities
            .RatingEntity
            .update({
              criticId: context.userId,
              predictionId,
              commentId,
            })
            .set({
              rating: 'none'
            })
            .go();

          operation = 'subtract';
        } else {
          // if 'none', change to 'like'/'dislike'
          await redbookModel
            .entities
            .RatingEntity
            .update({
              criticId: context.userId,
              predictionId,
              commentId,
            })
            .set({
              rating
            })
            .go();

          operation = 'add';
        }
      }

      if (!operation) {
        // todo: better error
        throw new Error('ree!')
      }

      if (commentId.length < 1) {
        // update prediction
        const [prediction] = await redbookModel
          .entities
          .PredictionEntity
          .query
          .prediction({
            predictionId
          })
          .go();

        const updatedRating = calcRating({
          rating,
          operation,
          current: prediction,
        });

        await redbookModel
          .entities
          .PredictionEntity
          .update({ ...prediction })
          .set({ ...updatedRating })
          .go();

        return 'update prediction rating';
      } else {
        // update comment
        const [comment] = await redbookModel
          .entities
          .CommentEntity
          .query
          .predictionComment({
            predictionId,
            commentId
          })
          .go();

        const updatedRating = calcRating({
          rating,
          operation,
          current: comment,
        });

        await redbookModel
          .entities
          .CommentEntity
          .update({ ...comment })
          .set({ ...updatedRating })
          .go();

        return 'update comment rating';
      }
    }
  })
}));

// wtf
const calcRating = (arg: {
  rating: 'like' | 'dislike';
  operation: 'add' | 'subtract';
  current: {
    likes: number;
    dislikes: number;
  }
}) => {
  const result = { ...arg.current }
  const field: 'likes' | 'dislikes' = `${arg.rating}s`
  if (arg.operation === 'add') {
    result[field] = result[field] + 1
  } else {
    result[field] = result[field] - 1
  }
  return result;
}

