import React from 'react';
import { Rating as RatingType } from '../../../graphql/genql/schema';
import { useLike } from '../hook/like';

export const Ratings: React.FC<{ ratings: RatingType[], commentId?: string }> = (props) => {
  const { ratingsState, rate } = useLike(props.ratings, props.commentId);

  return (
    <div>
      <button onClick={() => rate('like')} >
        like
      </button> {' '}

      {ratingsState.likes} {' '}

      <button onClick={() => rate('dislike')} >
        dislike
      </button> {' '}

      {ratingsState.dislikes}
    </div>
  );
}


