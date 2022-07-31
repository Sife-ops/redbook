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
      verdict: {
        type: "boolean",
        // required: true,
      },
    },
    indexes: {
      judges: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["judgeId"],
        },
      },
      predictionJudges: {
        collection: 'predictionJudges',
        index: 'gsi2',
        pk: {
          field: "gsi2pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi2sk",
          composite: [],
        },
      }
    },
  },
  Dynamo.Configuration
);

export type JudgeEntityType = EntityItem<typeof JudgeEntity>;

export function create({
  judgeId,
  predictionId
}: {
  judgeId: string;
  predictionId: string;
}) {
  return JudgeEntity.create({
    judgeId,
    predictionId,
  }).go();
}

