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
        .prognosticatorPrediction({
          prognosticatorId: args.userId
        })
        .go()
    }
  })
}));


