import 'twin.macro';
import React, { useState, useEffect } from 'react';
import { Comment as CommentType } from '../../../../graphql/genql/schema';
import { Ratings } from '../element/ratings';
import { useAvatar } from '../../hook/avatar';
import { useCommentMutation } from '../../hook/urql';
import { useComments } from '../../hook/comments';

export const CommentsSection: React.FC<{
  comments: CommentType[];
  predictionId: string;
  user: {
    userId: string;
    avatar: string;
  };
}> = props => {
  const { comments, pushComment } = useComments(props.comments);

  return (
    <div>
      <div tw="mb-4">
        <CommentForm
          predictionId={props.predictionId}
          pushComment={pushComment}
          user={props.user}
        />
      </div>
      <Comments comments={comments} />
    </div>
  );
};

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
export const Comment: React.FC<{ comment: CommentType }> = props => {
  const { avatarImg, fetchAvatar } = useAvatar();

  useEffect(() => {
    const { avatar, userId } = props.comment.user;
    fetchAvatar({ userId, avatar });
  }, []);

  return (
    <div tw="mb-6">
      <div tw="flex gap-2">
        <div tw="min-w-[48px] max-w-[48px]">
          {avatarImg && <img tw="rounded-full" src={avatarImg} alt="icons" />}
        </div>
        <div>
          <div tw="font-bold text-sm">{props.comment.user.username}</div>
          <div tw='mb-2'>{props.comment.comment}</div>
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
