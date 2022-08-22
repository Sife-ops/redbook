import 'twin.macro';
import React from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { Rating as RatingType } from '../../../../graphql/genql/schema';
import { useLike } from '../../hook/like';

export const Ratings: React.FC<{
  ratings: RatingType[];
  predictionId: string;
  commentId?: string;
}> = props => {
  const { ratingsState, rate, percentage } = useLike(
    props.ratings,
    props.predictionId,
    props.commentId
  );

  return (
    <div>
      <div tw="flex flex-row">
        <span
          tw="mr-2 pt-1"
          onClick={() => {
            rate('like');
          }}
        >
          <FiThumbsUp />
        </span>
        <span tw="mr-4">{ratingsState.likes}</span>
        <span
          tw="mr-2 pt-1"
          onClick={() => {
            rate('dislike');
          }}
        >
          <FiThumbsDown />
        </span>
        <span>{ratingsState.dislikes}</span>
      </div>
      <div tw="bg-red-500">
        <div
          tw="bg-green-500 h-[2px]"
          style={{
            width: `${percentage().toString()}%`
          }}
        />
      </div>
    </div>
  );
};
