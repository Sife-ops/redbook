import 'twin.macro';
import React from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { useRating } from '../../hook/rating';

export const Ratings: React.FC<{
  ratings: {
    likes: number;
    dislikes: number;
  };
  predictionId: string;
  commentId?: string;
}> = props => {
  const { ratingState, rate, percentage } = useRating(
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
        <span tw="mr-4">{ratingState.likes}</span>
        <span
          tw="mr-2 pt-1"
          onClick={() => {
            rate('dislike');
          }}
        >
          <FiThumbsDown />
        </span>
        <span>{ratingState.dislikes}</span>
      </div>
      {props.commentId === undefined && (
        <div tw="bg-red-500">
          <div
            tw="bg-green-500 h-[2px]"
            style={{
              width: `${percentage().toString()}%`
            }}
          />
        </div>
      )}
    </div>
  );
};
