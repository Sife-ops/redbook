export * as Verdict from "./verdict";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from 'ulid';

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
        pk: {
          field: "pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "sk",
          composite: ["userId"],
        },
      },

      collection: {
        collection: [
            'prognosticator',
            'judge',
            'commenter',
        ],
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["predictionId"],
        },
      }

      // predictionVerdict: {
      //   collection: 'predictionVerdict',
      //   index: 'gsi1',
      //   pk: {
      //     field: "gsi1pk",
      //     composite: ["predictionId"],
      //   },
      //   sk: {
      //     field: "gsi1sk",
      //     composite: ["verdictId"],
      //   },
      // }

    },
  },
  Dynamo.Configuration
);

export type VerdictEntityType = EntityItem<typeof VerdictEntity>;

