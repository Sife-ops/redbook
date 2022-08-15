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

      like: {
        type: "boolean",
        required: true,
      },
    },
    indexes: {
      criticRating: {
        pk: {
          field: "pk",
          composite: ["criticId"],
        },
        sk: {
          field: "sk",
          composite: ['predictionId', 'commentId'],
        },
      },
      predictionRating: {
        collection: [
          'predictionJudge',
          'predictionRating'
        ] as const,
        index: 'gsi1',
        pk: {
          field: "gsi1pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["criticId"],
        },
      },
      commentRating: {
        collection: 'commentRating',
        index: 'gsi2',
        pk: {
          field: "gsi2pk",
          composite: ["commentId"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["criticId"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type RatingEntityType = EntityItem<typeof RatingEntity>;

