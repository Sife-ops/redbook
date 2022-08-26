import { useRateCommentMutation, useRatePredictionMutation } from './urql';
import { useState } from 'react';

export const useRating = (
  ratings: {
    likes: number;
    dislikes: number;
  },
  predictionId: string,
  commentId?: string
) => {
  const [_, ratePredictionMutation] = useRatePredictionMutation();
  const [__, rateCommentMutation] = useRateCommentMutation();

  // todo: fetch initial 'rated' state
  const [rated, setRated] = useState<'liked' | 'disliked' | null>(null);

  const [ratingState, setRatingsState] = useState(ratings);

  const like = (remove: boolean = false) => {
    setRatingsState(s => ({
      ...s,
      likes: remove ? s.likes - 1 : s.likes + 1
    }));
  };

  const dislike = (remove: boolean = false) => {
    setRatingsState(s => ({
      ...s,
      dislikes: remove ? s.dislikes - 1 : s.dislikes + 1
    }));
  };

  const rate = (s: 'like' | 'dislike') => {
    if (rated) {
      if (rated === 'liked') {
        like(true);
        if (commentId) {
          rateCommentMutation({ rating: true, predictionId, commentId });
        } else {
          ratePredictionMutation({ rating: true, predictionId });
        }
      } else {
        dislike(true);
        if (commentId) {
          rateCommentMutation({ rating: false, predictionId, commentId });
        } else {
          ratePredictionMutation({ rating: false, predictionId });
        }
      }
      setRated(null);
    } else {
      if (s === 'like') {
        like();
        if (commentId) {
          rateCommentMutation({ rating: true, predictionId, commentId });
        } else {
          ratePredictionMutation({ rating: true, predictionId });
        }
        setRated('liked');
      } else {
        dislike();
        if (commentId) {
          rateCommentMutation({ rating: false, predictionId, commentId });
        } else {
          ratePredictionMutation({ rating: false, predictionId });
        }
        setRated('disliked');
      }
    }
  };

  const percentage = () => {
    const { dislikes, likes } = ratingState;
    if (likes + dislikes === 0) {
      return 100;
    } else {
      const r = likes / (likes + dislikes);
      return r * 100;
    }
  };

  return {
    percentage,
    ratingState,
    rate
  };
};
