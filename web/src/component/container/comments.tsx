// import { Ratings } from '../element/ratings';
import 'twin.macro';
import React, { useState, useEffect } from 'react';
import { Comment as CommentType } from '../../../../graphql/genql/schema';
import { useAvatar } from '../../hook/avatar';
import { useCommentMutation } from '../../hook/urql';
import { useComments } from '../../hook/comments';

export const CommentsSection: React.FC<{
  comments: CommentType[];
  predictionId: string;
}> = props => {
  const { comments, pushComment } = useComments(props.comments);

  return (
    <div>
      <div tw="mb-4">
        <CommentForm
          predictionId={props.predictionId}
          pushComment={pushComment}
        />
      </div>
      <Comments comments={comments} />
    </div>
  );
};

export const CommentForm: React.FC<{
  predictionId: string;
  pushComment: (c: CommentType) => void;
}> = props => {
  // const { avatarImg, fetchAvatar } = useAvatar();
  const [comment, setComment] = useState('');
  const [commentMutationState, commentMutation] = useCommentMutation();

  // useEffect(() => {
  //   fetchAvatar({ userId, avatar });
  // }, []);

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
        <div>
          <textarea
            tw="bg-gray-500 text-white w-[100%]"
            onChange={e => setComment(e.target.value)}
            rows={2}
            value={comment}
          />
        </div>
        <div tw="flex justify-end gap-4">
          <button>cancel</button>
          <button type="submit" value="Submit">
            comment
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
  return (
    <div
      tw="mb-2"
      style={{
        border: '1px solid red'
      }}
    >
      <div>{props.comment.user.username}</div>
      <div>{props.comment.comment}</div>

      {/* <Ratings
        ratings={props.comment.ratings}
        commentId={props.comment.commentId}
      /> */}
    </div>
  );
};
