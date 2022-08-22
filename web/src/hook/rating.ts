import { Rating as RatingType } from '@redbook/graphql/genql/schema';
import { useRateMutation } from './urql';
import { useState } from 'react';

interface Rating {
  likes: number;
  dislikes: number;
}

export const useRating = (
  r: RatingType[],
  predictionId: string,
  commentId?: string
) => {
  const [_, rateMutation] = useRateMutation();

  // todo: fetch initial 'rated' state
  const [rated, setRated] = useState<'liked' | 'disliked' | null>(null);

  const [ratingState, setRatingsState] = useState<Rating>(
    r.reduce(
      (a, c) => {
        if (c.like) {
          return {
            ...a,
            likes: a.likes + 1
          };
        } else {
          return {
            ...a,
            dislikes: a.dislikes + 1
          };
        }
      },
      {
        likes: 0,
        dislikes: 0
      }
    )
  );

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
        rateMutation({ like: true, predictionId, commentId });
      } else {
        dislike(true);
        rateMutation({ like: false, predictionId, commentId });
      }
      setRated(null);
    } else {
      if (s === 'like') {
        like();
        rateMutation({ like: true, predictionId, commentId });
        setRated('liked');
      } else {
        dislike();
        rateMutation({ like: false, predictionId, commentId });
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
