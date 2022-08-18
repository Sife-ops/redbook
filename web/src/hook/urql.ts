import { useTypedQuery, useTypedMutation } from "../urql";

export const usePredictionQuery = (predictionId: string) => {
  return useTypedQuery({
    query: {
      prediction: [
        {
          predictionId,
        },
        {
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
            predictionId: true,

            criticId: true,
            avatar: true,
            discriminator: true,
            username: true,

            like: true,
          },

          comments: {
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

// export const useRateMutation = () => {
//   return useTypedMutation((vars: {
//     predictionId: string;
//     like: boolean;
//   }) => ({
//     rate: [
//       vars,
//       {
//         likes: true,
//         dislikes: true,
//       }
//     ]
//   }));
// }

