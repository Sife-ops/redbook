export * as Judge from "./judge";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
// import { ulid } from "ulid";

// export interface JudgeTable {
//   id?: number;
//   prediction_id: string;
//   user_id: string;
//   verdict?: boolean;
//   created_at?: string;
// }

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
      // prognosticator: {
      //   collection: 'predictions',
      //   index: 'gsi1',
      //   pk: {
      //     field: "gsi1pk",
      //     composite: ["userId"],
      //   },
      //   sk: {
      //     field: "gsi1sk",
      //     composite: [],
      //   },
      // }
    },
  },
  Dynamo.Configuration
);

export type JudgeEntityType = EntityItem<typeof JudgeEntity>;

// export function create({
//   username,
//   discriminator,
//   avatar,
// }: {
//   username: string;
//   discriminator: string;
//   avatar: string;
// }) {
//   return UserEntity.create({
//     userId: ulid(),
//     username,
//     discriminator,
//     avatar,
//   }).go();
// }

