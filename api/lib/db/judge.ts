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
      judgeId: {
        type: "string",
        required: true,
      },
      predictionId: {
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
      verdict: {
        type: "boolean",
        // required: true,
      },
    },
    indexes: {
      judge: {
        pk: {
          field: "pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "sk",
          composite: ["judgeId"],
        },
      },
      predictionJudges: {
        collection: 'predictionJudges',
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

