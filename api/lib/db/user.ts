export * as User from "./user";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

// export interface UserTable {
//   id: string;
//   username: string;
//   discriminator: string;
//   avatar: string;
// }

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "redbook",
    },
    attributes: {
      userID: {
        type: "string",
        required: true,
        readOnly: true,
      },
      name: {
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
          composite: ["userID"],
        },
      },
      contributor: {
        collection: 'contributions',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["userID"],
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

export function create(name: string) {
  return UserEntity.create({
    userID: ulid(),
    name
  }).go();
}

// export async function list() {
//   const a = UserEntity.query.users({}).go();
//   console.log(await a);
//   return a;
// }


