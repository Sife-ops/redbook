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
      return await redbookModel
        .entities
        .CommentEntity
        .create({
          userId: context.user.userId,
          predictionId: args.predictionId,
          comment: args.comment,
        }).go();
    }
  }),

  ratePrediction: t.string({
    args: {
      predictionId: t.arg.string({ required: true }),
      rating: t.arg.boolean({ required: true }),
    },
    resolve: async (_, args, context: any) => {
      // todo: move logic to sqs???
      // todo: refactor
      const ratings = await redbookModel
        .entities
        .RatingEntity
        .query
        .rating({
          userId: context.user.userId,
          predictionId: args.predictionId,
          commentId: ''
        }).go()

      const [prediction] = await redbookModel
        .entities
        .PredictionEntity
        .query
        .collection({
          predictionId: args.predictionId
        }).go()

      const ratingInput = args.rating ? 'like' : 'dislike';

      if (ratings.length < 1) {
        await redbookModel
          .entities
          .RatingEntity
          .create({
            userId: context.user.userId,
            predictionId: args.predictionId,
            rating: ratingInput,
          }).go();

        await redbookModel
          .entities
          .PredictionEntity
          .update(prediction)
          .set({
            likes: args.rating ? prediction.likes + 1 : prediction.likes,
            dislikes: args.rating ? prediction.dislikes : prediction.likes + 1,
          })
          .go()

        return `create ${ratingInput}`;
      }

      const [{ rating }] = ratings;

      if (rating !== 'none') {
        await redbookModel
          .entities
          .RatingEntity
          .update({
            userId: context.user.userId,
            predictionId: args.predictionId,
            commentId: '',
          }).set({
            rating: 'none'
          }).go();

        await redbookModel
          .entities
          .PredictionEntity
          .update(prediction)
          .set({
            likes: rating === 'like' ? prediction.likes - 1 : prediction.likes,
            dislikes: rating === 'dislike' ? prediction.dislikes - 1 : prediction.dislikes,
          }).go()

        return `remove ${ratingInput}`;
      }

      await redbookModel
        .entities
        .RatingEntity
        .update({
          userId: context.user.userId,
          predictionId: args.predictionId,
          commentId: '',
        }).set({
          rating: ratingInput,
        }).go();

      await redbookModel
        .entities
        .PredictionEntity
        .update(prediction)
        .set({
          likes: args.rating ? prediction.likes + 1 : prediction.likes,
          dislikes: args.rating ? prediction.dislikes : prediction.dislikes + 1,
        }).go()

      return `update to ${ratingInput}`;
    }
  }),

  rateComment: t.string({
    args: {
      predictionId: t.arg.string({ required: true }),
      commentId: t.arg.string({ required: true }),
      rating: t.arg.boolean({ required: true }),
    },
    resolve: async (_, args, context: any) => {
      // todo: move logic to sqs???
      const ratings = await redbookModel
        .entities
        .RatingEntity
        .query
        .rating({
          userId: context.user.userId,
          predictionId: args.predictionId,
          commentId: args.commentId,
        }).go()

      const [comment] = await redbookModel
        .entities
        .CommentEntity
        .query
        .collection({
          predictionId: args.predictionId,
          commentId: args.commentId,
        }).go()

      const ratingInput = args.rating ? 'like' : 'dislike';

      if (ratings.length < 1) {
        await redbookModel
          .entities
          .RatingEntity
          .create({
            userId: context.user.userId,
            predictionId: args.predictionId,
            commentId: args.commentId,
            rating: ratingInput,
          }).go();

        await redbookModel
          .entities
          .CommentEntity
          .update(comment)
          .set({
            likes: args.rating ? comment.likes + 1 : comment.likes,
            dislikes: args.rating ? comment.dislikes : comment.likes + 1,
          })
          .go()

        return `create ${ratingInput}`;
      }

      const [{ rating }] = ratings;

      if (rating !== 'none') {
        const ratingUpdate = await redbookModel
          .entities
          .RatingEntity
          .update({
            userId: context.user.userId,
            predictionId: args.predictionId,
            commentId: args.commentId,
          }).set({
            rating: 'none'
          }).go();

        const predictionUpdate = await redbookModel
          .entities
          .CommentEntity
          .update(comment)
          .set({
            likes: rating === 'like' ? comment.likes - 1 : comment.likes,
            dislikes: rating === 'dislike' ? comment.dislikes - 1 : comment.dislikes,
          }).go()

        return `remove ${ratingInput}`;
      }

      await redbookModel
        .entities
        .RatingEntity
        .update({
          userId: context.user.userId,
          predictionId: args.predictionId,
          commentId: args.commentId,
        }).set({
          rating: ratingInput,
        }).go();

      await redbookModel
        .entities
        .CommentEntity
        .update(comment)
        .set({
          likes: args.rating ? comment.likes + 1 : comment.likes,
          dislikes: args.rating ? comment.dislikes : comment.dislikes + 1,
        }).go()

      return `update to ${ratingInput}`;
    }
  }),
}));

