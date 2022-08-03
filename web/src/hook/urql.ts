import { useTypedQuery, useTypedMutation } from "../urql";

export const usePredictionQuery = (predictionId: string) => {
  return useTypedQuery({
    query: {
      prediction: [
        {
          predictionId,
        },
        {
          avatar: true,
          conditions: true,
          created_at: true,
          discriminator: true,
          predictionId: true,
          prognosticatorId: true,
          username: true,
          verdict: true,
          likes: true,
          dislikes: true,
          judges: {
            judgeId: true,
            predictionId: true,
            username: true,
            discriminator: true,
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

