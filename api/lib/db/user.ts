export * as User from "./user";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
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

      created_at: {
        type: "string",
        required: true,
        default: () => Date.now().toString()
      },
    },
    indexes: {

      user: {
        collection: 'user',
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type UserEntityType = EntityItem<typeof UserEntity>;
