export * as Prediction from "./prediction";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { faker } from '@faker-js/faker';

export const PredictionEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Prediction",
      service: "redbook",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
      },
      predictionId: {
        type: "string",
        required: true,
        default: () => {
          const a = faker.word.adjective();
          const b = faker.word.adjective();
          const c = faker.word.noun();
          return `${a}-${b}-${c}`;
        }
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
        type: "string",
        required: true,
        default: () => Date.now().toString()
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

      prediction: {
        collection: 'user',
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: ["predictionId"],
        },
      },

      collection: {
        collection: 'prediction',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ['userId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type PredictionEntityType = EntityItem<typeof PredictionEntity>;
