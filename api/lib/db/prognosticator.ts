export * as Prognosticator from "./prognosticator";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

// todo: remove file, deprecated
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
      prognosticator: {
        pk: {
          field: "pk",
          composite: ["prognosticatorId"],
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

