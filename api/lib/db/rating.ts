export * as Rating from "./rating";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const RatingEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Rating",
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
        default: '',
      },

      rating: {
        type: ['like', 'dislike', 'none'],
        required: true,
      },
    },
    indexes: {

      rating: {
        collection: 'user',
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: ['predictionId', 'commentId'],
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
          composite: ['userId'],
        },
      },

    },
  },
  Dynamo.Configuration
);

export type RatingEntityType = EntityItem<typeof RatingEntity>;

