import { builder } from "./builder";
import { PredictionEntityType, redbookModel } from '@redbook/lib/db';

// import "./types/article";

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
      const { JudgeEntity, PredictionEntity } = await redbookModel
        .collections
        .predictionJudges({
          predictionId: args.predictionId,
        }).go()

      if (PredictionEntity.length < 1) {
        throw new Error('ree')
      }

      return PredictionEntity[0]
    }
  })
}));

builder.mutationFields(t => ({
  mello: t.string({
    resolve: () => 'mello'
  })
}))

export const schema = builder.toSchema({});

