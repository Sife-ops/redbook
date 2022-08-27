import tw from 'twin.macro';
import React, { useState } from 'react';
import { Avatar } from '../avatar';
import { Comment as CommentType } from '@redbook/graphql/genql/schema';
import { CommentForm } from './comment-form';
import { Ratings } from '../ratings';
import { useComments } from '../../hook/comments';

export const Comments: React.FC<{
  type: 'comments' | 'replies';
  comments: CommentType[];
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  if (props.comments.length < 1) {
    return <div>No comments.</div>;
  } else {
    return (
      <div
        css={[
          tw`flex flex-col`,
          () => {
            return props.type === 'comments' ? tw`gap-6` : tw`gap-3`;
          }
        ]}
      >
        {props.comments.map(e => (
          <Comment
            comment={e}
            key={e.commentId}
            type={props.type}
            user={props.user}
          />
        ))}
      </div>
    );
  }
};

const Comment: React.FC<{
  type: 'comments' | 'replies';
  comment: CommentType;
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const [replyMode, setReplyMode] = useState(false);
  // @ts-ignore
  const { comments, pushComment } = useComments(props.comment.replies || []);

  return (
    <div tw="flex gap-2">
      <Avatar user={props.comment.user} />
      <div>
        {/* todo: time since comment */}
        <div tw="font-bold text-sm">{props.comment.user.username}</div>
        <div tw="mb-2">{props.comment.comment}</div>
        <div tw="flex gap-3">
          <Ratings
            commentId={props.comment.commentId}
            predictionId={props.comment.predictionId}
            ratings={{
              likes: props.comment.likes,
              dislikes: props.comment.dislikes
            }}
          />
          {props.type === 'comments' && (
            <button tw="text-sm" onClick={() => setReplyMode(s => !s)}>
              REPLY
            </button>
          )}
        </div>
        {replyMode && (
          <div tw="mt-3">
            <CommentForm
              commentId={props.comment.commentId}
              predictionId={props.comment.predictionId}
              pushComment={pushComment}
              setReplyMode={setReplyMode}
              user={props.user}
            />
          </div>
        )}
        {comments.length > 0 && (
          <div tw="mt-3">
            <Comments type="replies" comments={comments} user={props.user} />
          </div>
        )}
      </div>
    </div>
  );
};
