export * as Comment from "./comment";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const CommentEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Comment",
      service: "redbook",
    },
    attributes: {
      predictionId: {
        type: "string",
        required: true,
      },
      commentId: {
        type: "string",
        required: true,
      },

      commenterId: {
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
      commenterComment: {
        pk: {
          field: "pk",
          composite: ['commenterId'],
        },
        sk: {
          field: "sk",
          composite: ['commentId'],
        },
      },
      predictionComment: {
        collection: [
          'predictionJudge',
          'predictionComment'
        ] as const,
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["commenterId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type CommentEntityType = EntityItem<typeof CommentEntity>;

