/*
 * todo: move to files
 */

import { useTypedQuery, useTypedMutation } from "../urql";

// todo: not very dry
export const usePredictionsQuery = (userId: string) => {
  return useTypedQuery({
    query: {
      predictions: [
        {
          userId
        },
        {
          __typename: true,
          predictionId: true,

          prognosticatorId: true,
          avatar: true,
          discriminator: true,
          username: true,

          conditions: true,
          created_at: true,
          verdict: true,

          judges: {
            __typename: true,
            predictionId: true,

            judgeId: true,
            avatar: true,
            discriminator: true,
            username: true,

            verdict: true,
          },

          ratings: {
            __typename: true,
            commentId: true,

            predictionId: true,

            criticId: true,
            avatar: true,
            discriminator: true,
            username: true,

            like: true,
          },

          comments: {
            __typename: true,

            predictionId: true,
            commentId: true,

            commenterId: true,
            avatar: true,
            discriminator: true,
            username: true,

            comment: true,
            replyTo: true,
            created_at: true,

            ratings: {
              __typename: true,
              predictionId: true,

              commentId: true,

              criticId: true,
              avatar: true,
              discriminator: true,
              username: true,

              like: true,
            }
          }
        }
      ]
    }
  })
}

export const usePredictionQuery = (predictionId: string) => {
  return useTypedQuery({
    query: {
      prediction: [
        {
          predictionId
        },
        {
          __typename: true,
          predictionId: true,

          prognosticatorId: true,
          avatar: true,
          discriminator: true,
          username: true,

          conditions: true,
          created_at: true,
          verdict: true,

          judges: {
            __typename: true,
            predictionId: true,

            judgeId: true,
            avatar: true,
            discriminator: true,
            username: true,

            verdict: true,
          },

          ratings: {
            __typename: true,
            commentId: true,

            predictionId: true,

            criticId: true,
            avatar: true,
            discriminator: true,
            username: true,

            like: true,
          },

          comments: {
            __typename: true,

            predictionId: true,
            commentId: true,

            commenterId: true,
            avatar: true,
            discriminator: true,
            username: true,

            comment: true,
            replyTo: true,
            created_at: true,

            ratings: {
              __typename: true,
              predictionId: true,

              commentId: true,

              criticId: true,
              avatar: true,
              discriminator: true,
              username: true,

              like: true,
            }
          }
        }
      ]
    }
  })
}

export const useRateMutation = () => {
  return useTypedMutation(
    (
      vars: {
        predictionId: string;
        commentId?: string;
        like: boolean;
      }
    ) => {
      return {
        rate: [
          vars,
        ]
      }
    }
  );
}

export const useCommentMutation = () => {
  return useTypedMutation(
    (
      vars: {
        comment: string
      }
    ) => {
      return {
        comment: [
          vars,
          {
            __typename: true,

            predictionId: true,
            commentId: true,

            commenterId: true,
            avatar: true,
            discriminator: true,
            username: true,

            comment: true,
            replyTo: true,
            created_at: true,

            ratings: {
              __typename: true,
              predictionId: true,

              commentId: true,

              criticId: true,
              avatar: true,
              discriminator: true,
              username: true,

              like: true,
            }
          }
        ]
      }
    }
  )
}

