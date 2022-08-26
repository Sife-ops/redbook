import { PredictionType } from './prediction'
import { builder } from "../builder";
import { redbookModel, } from '@redbook/lib/db';

builder.queryFields(t => ({
  prediction: t.field({
    args: {
      predictionId: t.arg.string({ required: true })
    },
    type: PredictionType,
    resolve: async (_, args) => {
      const [prediction] = await redbookModel
        .entities
        .PredictionEntity
        .query
        .collection({
          predictionId: args.predictionId
        }).go();
      return prediction;
    }
  }),

  predictions: t.field({
    args: {
      userId: t.arg.string({ required: true })
    },
    type: [PredictionType],
    resolve: async (_, args) => {
      return await redbookModel
        .entities
        .PredictionEntity
        .query
        .prediction({
          userId: args.userId
        }).go()
    }
  })
}));

