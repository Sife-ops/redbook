export * as Judge from "./judge";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const JudgeEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Judge",
      service: "redbook",
    },
    attributes: {
      predictionId: {
        type: "string",
        required: true,
      },

      judgeId: {
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

      verdict: {
        type: ["correct", "incorrect", "none"],
        required: true,
        default: 'none'
      },
    },
    indexes: {
      judgePrediction: {
        pk: {
          field: "pk",
          composite: ["judgeId"],
        },
        sk: {
          field: "sk",
          composite: ["predictionId"],
        },
      },
      predictionJudge: {
        collection: 'predictionJudge',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["judgeId"],
        },
      }
    },
  },
  Dynamo.Configuration
);

export type JudgeEntityType = EntityItem<typeof JudgeEntity>;

