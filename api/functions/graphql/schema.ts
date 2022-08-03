import { builder } from "./builder";
import { PredictionEntityType, JudgeEntityType, redbookModel } from '@redbook/lib/db';

// import "./types/article";

const JudgeType = builder
  .objectRef<JudgeEntityType>("Judge")
  .implement({
    fields: t => ({
      judgeId: t.exposeID("judgeId"),
      predictionId: t.exposeString("predictionId"),
      username: t.exposeString("username", { nullable: true }),
      discriminator: t.exposeString("discriminator", { nullable: true }),
      verdict: t.exposeBoolean("verdict", { nullable: true })
    })
  })

const PredictionType = builder
  .objectRef<PredictionEntityType>("Prediction")
  .implement({
    fields: t => ({
      predictionId: t.exposeID("predictionId"),
      prognosticatorId: t.exposeString("prognosticatorId"),
      username: t.exposeString("username"),
      discriminator: t.exposeString("discriminator"),
      avatar: t.exposeString("avatar"),
      conditions: t.exposeString("conditions"),
      verdict: t.exposeBoolean("verdict", { nullable: true }),
      likes: t.exposeInt("likes", { nullable: true }),
      dislikes: t.exposeInt("dislikes", { nullable: true }),
      created_at: t.exposeString("created_at"),
      judges: t.field({
        type: [JudgeType],
        resolve: async (parent) => {
          // todo: parent resolver resolves judges...
          const { JudgeEntity } = await redbookModel
            .collections
            .predictionJudges({
              predictionId: parent.predictionId,
            }).go()
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
        }).go()

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
      // prognosticatorId: t.arg.string({ required: true }),
      like: t.arg.boolean({ required: true }),
    },
    resolve: async (_, args) => {
      const [{
        predictionId,
        prognosticatorId,
        likes,
        dislikes
      }] = await redbookModel
        .entities
        .PredictionEntity
        .query
        .prediction({
          predictionId: args.predictionId
        }).go()

      await redbookModel
        .entities
        .PredictionEntity
        .update({
          predictionId,
          prognosticatorId,
        }).add({
          [args.like ? 'likes' : 'dislikes']: 1
          // likes: 1
        }).go()

      const rating = {
        likes: likes || 0,
        dislikes: dislikes || 0,
      }

      if (args.like) {
        rating.likes++
      } else {
        rating.dislikes++
      }

      return rating;
    }
  })
}))

export const schema = builder.toSchema({});

