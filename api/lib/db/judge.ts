export * as Judge from "./judge";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

// export interface JudgeTable {
//   id?: number;
//   prediction_id: string;
//   user_id: string;
//   verdict?: boolean;
//   created_at?: string;
// }

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Judge",
      service: "redbook",
    },
    attributes: {
      userId: {
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
    },
    indexes: {
      users: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["userId"],
        },
      },
      prognosticator: {
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

export type UserEntityType = EntityItem<typeof UserEntity>;

export function create({
  username,
  discriminator,
  avatar,
}: {
  username: string;
  discriminator: string;
  avatar: string;
}) {
  return UserEntity.create({
    userId: ulid(),
    username,
    discriminator,
    avatar,
  }).go();
}

