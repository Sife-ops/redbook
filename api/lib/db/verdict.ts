export * as Verdict from "./verdict";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const VerdictEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Verdict",
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
      },

      verdict: {
        type: ["correct", "incorrect", "none"],
        required: true,
        default: 'none'
      },
    },
    indexes: {

      verdict: {
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

export type VerdictEntityType = EntityItem<typeof VerdictEntity>;

