import { Rating as RatingType } from '../../../graphql/genql/schema';
import { useRateMutation } from './urql'
import { useState } from 'react';

interface Rating {
  likes: number;
  dislikes: number;
}

export const useLike = (r: RatingType[], commentId?: string) => {
  const [_, rateMutation] = useRateMutation();

  // todo: fetch initial 'rated' state
  const [rated, setRated] = useState<'liked' | 'disliked' | null>(null);

  const [ratingsState, setRatingsState] = useState<Rating>(
    r.reduce((a, c) => {
      if (c.like) {
        return {
          ...a,
          likes: a.likes + 1
        }
      } else {
        return {
          ...a,
          dislikes: a.dislikes + 1
        }
      }
    },
      {
        likes: 0,
        dislikes: 0,
      }
    )
  );

  const like = (remove: boolean = false) => {
    setRatingsState(s => ({
      ...s,
      likes: remove ? s.likes - 1 : s.likes + 1
    }))
  }

  const dislike = (remove: boolean = false) => {
    setRatingsState(s => ({
      ...s,
      dislikes: remove ? s.dislikes - 1 : s.dislikes + 1
    }))
  }

  const rate = (s: 'like' | 'dislike') => {
    if (rated) {
      if (rated === 'liked') {
        like(true);
        rateMutation({ like: true, commentId })
      } else {
        dislike(true);
        rateMutation({ like: false, commentId })
      }
      setRated(null)
    } else {
      if (s === 'like') {
        like();
        rateMutation({ like: true, commentId })
        setRated('liked');
      } else {
        dislike();
        rateMutation({ like: false, commentId })
        setRated('disliked');
      }
    }
  }

  return {
    ratingsState,
    rate,
  }
}
