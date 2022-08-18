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
          return RatingEntity;
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

  // todo: unrate
  rate: t.field({
    type: RatingType,
    args: {
      predictionId: t.arg.string({ required: true }),
      like: t.arg.boolean({ required: true }),
    },
    resolve: async () => {

      // const [{
      //   predictionId,
      //   prognosticatorId,
      // }] = await redbookModel
      //   .entities
      //   .PredictionEntity
      //   .query
      //   .prediction({
      //     predictionId: args.predictionId
      //   }).go()

      // await redbookModel
      //   .entities
      //   .PredictionEntity
      //   .update({
      //     predictionId,
      //     prognosticatorId,
      //   }).add({
      //     [args.like ? 'likes' : 'dislikes']: 1
      //   }).go()

      // const rating = {
      //   likes: likes || 0,
      //   dislikes: dislikes || 0,
      // }

      // if (args.like) {
      //   rating.likes++
      // } else {
      //   rating.dislikes++
      // }

      // return rating;

      return {
        like: true,
        criticId: 'a',
        commentId: 'a',
        predictionId: 'a',
        avatar: 'a',
        username: 'a',
        discriminator: 'a',
      }

    }
  })
}))

export const schema = builder.toSchema({});

