export * as Prediction from "./prediction";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const PredictionEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Prediction",
      service: "redbook",
    },
    attributes: {
      predictionId: {
        type: "string",
        required: true,
      },

      prognosticatorId: {
        type: "string",
        required: true,
      },
      username: {
        type: "string",
        required: true,
      },
      discriminator: {
        type: "string",
        required: true,
      },
      avatar: {
        type: "string",
        required: true,
      },

      conditions: {
        type: "string",
        required: true,
      },
      verdict: {
        type: ["correct", "incorrect", "none"],
        required: true,
        default: 'none'
      },
      created_at: {
        type: "number",
        required: true,
        default: () => Date.now()
      },

      likes: {
        type: "number",
        required: true,
        default: 0,
      },
      dislikes: {
        type: "number",
        required: true,
        default: 0,
      },
    },
    indexes: {
      prognosticatorPrediction: {
        pk: {
          field: "pk",
          composite: ["prognosticatorId"],
        },
        sk: {
          field: "sk",
          composite: ["predictionId"],
        },
      },
      prediction: {
        collection: [
          'predictionJudge',
          // 'predictionRating',
          'predictionComment'
        ] as const,
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type PredictionEntityType = EntityItem<typeof PredictionEntity>;

