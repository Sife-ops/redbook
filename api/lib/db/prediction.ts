export * as Prediction from "./prediction";

import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";

export const PredictionEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Prediction",
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

      conditions: {
        type: "string",
        required: true,
      },
      verdict: {
        type: ["correct", "incorrect", "none"],
        required: true,
        default: 'none'
      },
      created_at: {
        type: "number",
        required: true,
        default: () => Date.now()
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

      prediction: {
        pk: {
          field: "pk",
          composite: ["predictionId"],
        },
        sk: {
          field: "sk",
          composite: ["created_at"],
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

      // prognosticatorPrediction: {
      //   index: 'gsi2',
      //   pk: {
      //     field: "gsi2pk",
      //     composite: ["prognosticatorId"],
      //   },
      //   sk: {
      //     field: "gsi2sk",
      //     composite: ["predictionId"],
      //   },
      // },

      // prediction: {
      //   collection: [
      //     'predictionJudge',
      //     'predictionComment',
      //     // 'predictionRating'
      //   ] as const,
      //   index: 'gsi1',
      //   pk: {
      //     field: "gsi1pk",
      //     composite: ["predictionId"],
      //   },
      //   sk: {
      //     field: "gsi1sk",
      //     composite: [],
      //   },
      // },

    },
  },
  Dynamo.Configuration
);

export type PredictionEntityType = EntityItem<typeof PredictionEntity>;
