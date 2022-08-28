import { useTypedMutation } from '../../urql';

export const useRatePredictionMutation = () => {
  return useTypedMutation((vars: { predictionId: string; rating: boolean }) => {
    return {
      ratePrediction: [vars]
    };
  });
};

export const useRateCommentMutation = () => {
  return useTypedMutation(
    (vars: { predictionId: string; commentId: string; rating: boolean }) => {
      return {
        rateComment: [vars]
      };
    }
  );
};
