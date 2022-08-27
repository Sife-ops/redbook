import 'twin.macro';
import React, { useState, useEffect } from 'react';
import { Comment as CommentType } from '@redbook/graphql/genql/schema';
import { useAvatar } from '../../hook/avatar';
import { useCommentMutation } from '../../hook/urql';

export const CommentForm: React.FC<{
  predictionId: string;
  pushComment: (c: CommentType) => void;
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const { avatarImg, fetchAvatar } = useAvatar();
  const [comment, setComment] = useState('');
  const [commentMutationState, commentMutation] = useCommentMutation();

  useEffect(() => {
    const { avatar, userId } = props.user;
    fetchAvatar({ userId, avatar });
  }, []);

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
            predictionId: props.predictionId
          });
        }}
      >
        <div tw="flex gap-2">
          <div tw="min-w-[48px] max-w-[48px]">
            {avatarImg && <img tw="rounded-full" src={avatarImg} alt="icons" />}
          </div>
          <textarea
            tw="bg-gray-500 text-white w-[100%]"
            onChange={e => setComment(e.target.value)}
            rows={2}
            value={comment}
          />
        </div>
        <div tw="flex justify-end gap-10 text-sm">
          <button>CANCEL</button>
          <button type="submit" value="Submit">
            COMMENT
          </button>
        </div>
      </form>
    </div>
  );
};

