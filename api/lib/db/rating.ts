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
      },

      rating: {
        type: ['like', 'dislike', 'none'],
        required: true,
      },
    },
    indexes: {

      rating: {
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
      },

      // predictionRating: {
      //   collection: [
      //     'predictionJudge',
      //     'predictionComment',
      //     'predictionRating',
      //   ] as const,
      //   index: 'gsi1',
      //   pk: {
      //     field: "gsi1pk",
      //     composite: ["predictionId"],
      //   },
      //   sk: {
      //     field: "gsi1sk",
      //     composite: ["criticId"],
      //   },
      // },
      // commentRating: {
      //   collection: 'commentRating',
      //   index: 'gsi2',
      //   pk: {
      //     field: "gsi2pk",
      //     composite: ["commentId"],
      //   },
      //   sk: {
      //     field: "gsi2sk",
      //     composite: ['criticId'],
      //   },
      // },

    },
  },
  Dynamo.Configuration
);

export type RatingEntityType = EntityItem<typeof RatingEntity>;

