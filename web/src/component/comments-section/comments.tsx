import 'twin.macro';
import React from 'react';
import { Avatar } from '../avatar';
import { Comment as CommentType } from '@redbook/graphql/genql/schema';
import { Ratings } from '../ratings';

export const Comments: React.FC<{ comments: CommentType[] }> = props => {
  if (props.comments.length < 1) {
    return <div>No comments.</div>;
  } else {
    return (
      <div>
        {props.comments.map(e => (
          <Comment key={e.commentId} comment={e} />
        ))}
      </div>
    );
  }
};

/*
 * todo: nested comments
 */
const Comment: React.FC<{ comment: CommentType }> = props => {
  return (
    <div tw="mb-6">
      <div tw="flex gap-2">
        <Avatar user={props.comment.user} />
        <div>
          <div tw="font-bold text-sm">{props.comment.user.username}</div>
          <div tw="mb-2">{props.comment.comment}</div>
          <div tw="flex gap-6">
            <Ratings
              commentId={props.comment.commentId}
              predictionId={props.comment.predictionId}
              ratings={{
                likes: props.comment.likes,
                dislikes: props.comment.dislikes
              }}
            />
            <button tw="text-sm">REPLY</button>
          </div>
        </div>
      </div>
    </div>
  );
};
