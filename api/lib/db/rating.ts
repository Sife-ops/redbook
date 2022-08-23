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
      predictionId: {
        type: "string",
        required: true,
      },
      commentId: {
        type: "string",
        required: true,
      },

      criticId: {
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

      rating: {
        type: ['like', 'dislike', 'none'],
        required: true,
      },
    },
    indexes: {
      predictionRating: {
        pk: {
          field: "pk",
          composite: ["criticId"],
        },
        sk: {
          field: "sk",
          composite: ['predictionId'],
        },
      },
      commentRating: {
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["criticId"],
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

export type RatingEntityType = EntityItem<typeof RatingEntity>;

