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
  })
}))

export const schema = builder.toSchema({});

