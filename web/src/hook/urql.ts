import { useTypedQuery, useTypedMutation } from "../urql";

export const usePredictionQuery = () => {
  return useTypedQuery({
    query: {
      prediction: {
        predictionId: true,

        prognosticatorId: true,
        avatar: true,
        discriminator: true,
        username: true,

        conditions: true,
        created_at: true,
        verdict: true,

        judges: {
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
    }
  })
}

export const useRateMutation = () => {
  return useTypedMutation(
    (
      vars: {
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

