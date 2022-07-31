export * as Prognosticator from "./prognosticator";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const PrognosticatorEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Prognosticator",
      service: "redbook",
    },
    attributes: {
      prognosticatorId: {
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
      prognosticators: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["prognosticatorId"],
        },
      },
      prognosticator: {
        collection: 'predictions',
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["prognosticatorId"],
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

export type PrognosticatorEntityType = EntityItem<typeof PrognosticatorEntity>;

export function create({
  prognosticatorId,
  username,
  discriminator,
  avatar,
}: {
  prognosticatorId: string;
  username: string;
  discriminator: string;
  avatar: string;
}) {
  return PrognosticatorEntity.create({
    prognosticatorId,
    username,
    discriminator,
    avatar,
  }).go();
}

