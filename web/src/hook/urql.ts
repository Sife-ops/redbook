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
            judgeId: true,
            predictionId: true,

            avatar: true,
            discriminator: true,
            username: true,

            verdict: true,
          }
        }
      ]
    }
  })
}

export const useRateMutation = () => {
  return useTypedMutation((vars: {
    predictionId: string;
    like: boolean;
  }) => ({
    rate: [
      vars,
      {
        likes: true,
        dislikes: true,
      }
    ]
  }));
}

