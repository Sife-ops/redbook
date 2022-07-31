export * as Prediction from "./prediction";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

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
      userId: {
        type: "string",
        required: true,
      },
      conditions: {
        type: "string",
        required: true,
      },
      verdict: {
        type: "boolean",
        // required: true,
      },
      created_at: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      predictions: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["predictionId"],
        },
      },
      predicted: {
        collection: 'predictions',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      }
    },
  },
  Dynamo.Configuration
);

export type PredictionEntityType = EntityItem<typeof PredictionEntity>;

export function create({
  userId,
  conditions
}: {
  userId: string;
  conditions: string;
}) {
  return PredictionEntity.create({
    predictionId: ulid(),
    userId,
    conditions,
    created_at: 'todo' // todo: timestamp
  }).go();
}

