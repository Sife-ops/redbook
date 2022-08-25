export * as Comment from "./comment";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from 'ulid';

export const CommentEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Comment",
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
      commentId: {
        type: "string",
        required: true,
        default: () => ulid()
      },

      comment: {
        type: "string",
        required: true,
      },
      created_at: {
        type: "number",
        required: true,
        default: () => Date.now()
      },
      replyTo: {
        type: "string",
      },

      likes: {
        type: "number",
        required: true,
        default: 0,
      },
      dislikes: {
        type: "number",
        required: true,
        default: 0,
      },
    },
    indexes: {

      comment: {
        pk: {
          field: "pk",
          composite: ['userId'],
        },
        sk: {
          field: "sk",
          composite: ['commentId'],
        },
      },

      collection: {
        collection: [
          'prediction',
          'comment',
        ] as const,
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ['commentId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type CommentEntityType = EntityItem<typeof CommentEntity>;

