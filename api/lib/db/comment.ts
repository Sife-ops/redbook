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
          composite: ['commentId'],
        },
        sk: {
          field: "sk",
          composite: ['commenterId'],
        },
      },

      collection: {
        collection: [
            'prognosticator',
            'judge',
            'commenter',
        ],
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["predictionId"],
        },
      }

      // predictionComment: {
      //   collection: [
      //     'predictionJudge',
      //     'predictionComment'
      //   ] as const,
      //   index: 'gsi1',
      //   pk: {
      //     field: "gsi1pk",
      //     composite: ["predictionId"],
      //   },
      //   sk: {
      //     field: "gsi1sk",
      //     composite: ["commentId"],
      //   },
      // },

      // comment: {
      //   collection: 'commentRating',
      //   index: 'gsi2',
      //   pk: {
      //     field: "gsi2pk",
      //     composite: ["commentId"],
      //   },
      //   sk: {
      //     field: "gsi2sk",
      //     composite: [],
      //   },
      // },

    },
  },
  Dynamo.Configuration
);

export type CommentEntityType = EntityItem<typeof CommentEntity>;

