import 'twin.macro';
import React, { useState, useEffect } from 'react';
import { Avatar } from '../avatar';
import { Comment as CommentType } from '@redbook/graphql/genql/schema';
import { useCommentMutation } from '../../hook/urql';

export const CommentForm: React.FC<{
  commentId?: string;
  predictionId: string;
  pushComment: (c: CommentType) => void;
  setReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const [comment, setComment] = useState('');
  const [commentMutationState, commentMutation] = useCommentMutation();

  useEffect(() => {
    const { fetching, data } = commentMutationState;
    if (fetching === false && data) {
      console.log(data);
      props.pushComment(data.comment);
    }
  }, [commentMutationState.fetching]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          setComment('');
          commentMutation({
            comment,
            commentId: props.commentId,
            predictionId: props.predictionId
          });
        }}
      >
        <div tw="flex gap-2">
          <Avatar user={props.user} />
          <textarea
            tw="bg-gray-500 text-white w-[100%]"
            onChange={e => setComment(e.target.value)}
            rows={2}
            value={comment}
          />
        </div>
        <div tw="flex justify-end gap-5 text-sm">
          {props.setReplyMode && (
            <button
              onClick={e => {
                e.preventDefault();
                // @ts-ignore
                props.setReplyMode(false);
              }}
            >
              CANCEL
            </button>
          )}
          <button type="submit" value="Submit">
            COMMENT
          </button>
        </div>
      </form>
    </div>
  );
};
