import { builder } from "./builder";

import {
  PredictionEntityType,
  JudgeEntityType,
  redbookModel,
  RatingEntityType,
  CommentEntityType,
} from '@redbook/lib/db';

// import "./types/article";

const JudgeType = builder
  .objectRef<JudgeEntityType>("Judge")
  .implement({
    fields: t => ({
      predictionId: t.exposeString("predictionId"),

      judgeId: t.exposeID("judgeId"),
      avatar: t.exposeString("username"),
      username: t.exposeString("username"),
      discriminator: t.exposeString("discriminator"),

      verdict: t.exposeBoolean("verdict", { nullable: true })
    })
  })

const RatingType = builder
  .objectRef<RatingEntityType>("Rating")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      commentId: t.exposeID("commentId"),

      criticId: t.exposeString("criticId"),
      avatar: t.exposeString("avatar"),
      discriminator: t.exposeString("discriminator"),
      username: t.exposeString("username"),

      like: t.exposeBoolean("like"),
    })
  })

const CommentType = builder
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

const PredictionType = builder
  .objectRef<PredictionEntityType>("Prediction")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),

      prognosticatorId: t.exposeString("prognosticatorId"),
      avatar: t.exposeString("avatar"),
      discriminator: t.exposeString("discriminator"),
      username: t.exposeString("username"),

      conditions: t.exposeString("conditions"),
      created_at: t.exposeString("created_at"),
      verdict: t.exposeBoolean("verdict", { nullable: true }),

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

      ratings: t.field({
        type: [RatingType],
        resolve: async (parent) => {
          const { RatingEntity } = await redbookModel
            .collections
            .predictionRating({
              predictionId: parent.predictionId,
            })
            .go();
          // todo: use 'where'
          return RatingEntity.filter(e => e.commentId === '');
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

builder.queryFields(t => ({
  hello: t.string({
    // type: t.string({}),
    resolve: () => 'hello'
  }),

  prediction: t.field({
    type: PredictionType,
    args: {
      predictionId: t.arg.string({ required: true })
    },
    resolve: async (_, args) => {
      const predictions = await redbookModel
        .entities
        .PredictionEntity
        .query
        .prediction({
          predictionId: args.predictionId
        })
        .go();

      // todo: lodash
      if (predictions.length < 1) {
        throw new Error('prediction not found')
      }

      return predictions[0];
    }
  })
}));

builder.mutationFields(t => ({
  mello: t.string({
    resolve: () => 'mello'
  }),

  // todo: comment-ratings
  rate: t.string({
    args: {
      commentId: t.arg.string(),
      like: t.arg.boolean({ required: true }),
    },
    // todo: no explicit any
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
          // predictionId: context.predictionId
          predictionId,
          commentId,
        })
        .where(({ commentId: c }, { eq }) => eq(c, commentId))
        .go();

      console.log(ratings)
      // return 'stop'

      // create rating if no previous rating
      if (ratings.length < 1) {
        await redbookModel
          .entities
          .RatingEntity
          .create({
            predictionId,
            commentId,

            criticId: context.userId,
            avatar: '',
            username: '',
            discriminator: '',

            like: args.like,
          })
          .go()

        return `create: ${args.like}`
      }

      // remove if same rating
      const rating = ratings[0]

      if (rating.like === args.like) {
        await redbookModel
          .entities
          .RatingEntity
          .remove({
            criticId: context.userId,
            predictionId,
            commentId,
          })
          .go()

        return `remove: ${args.like}`
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

      return `update: ${args.like}`

    }
  })
}))

export const schema = builder.toSchema({});

