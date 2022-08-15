import { builder } from "./builder";
import { PredictionEntityType, JudgeEntityType, redbookModel } from '@redbook/lib/db';

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
            .go()
          return JudgeEntity;
        }
      })
    })
  })

const RatingType = builder
  .objectRef<{ likes: number; dislikes: number }>("Rating")
  .implement({
    fields: t => ({
      likes: t.exposeInt("likes"),
      dislikes: t.exposeInt("dislikes"),
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
        .go()

      // todo: lodash
      if (predictions.length < 1) {
        throw new Error('prediction not found')
      }

      return predictions[0]
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
    resolve: async (_, args) => {

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
        likes: 0,
        dislikes: 0,
      }

    }
  })
}))

export const schema = builder.toSchema({});

