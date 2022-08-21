import { builder } from "../builder";
import { redbookModel, } from '@redbook/lib/db';
import { PredictionType } from './prediction'

builder.queryFields(t => ({
  prediction: t.field({
    type: PredictionType,
    resolve: async (_, __, context: any) => {
      const predictions = await redbookModel
        .entities
        .PredictionEntity
        .query
        .prediction({
          predictionId: context.predictionId
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


