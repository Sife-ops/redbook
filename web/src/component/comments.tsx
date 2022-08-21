/*
 * todo: move components
 */

import React, { useState, useEffect } from 'react';
import { Comment as CommentType } from '../../../graphql/genql/schema';
import { Ratings } from '../component/ratings';
import { useCommentMutation } from '../hook/urql';
import { useComments } from '../hook/comments';

export const CommentsSection: React.FC<{ comments: CommentType[] }> = (props) => {
  const { comments, pushComment } = useComments(props.comments);

  return (
    <div>
      <CommentForm pushComment={pushComment} />
      <Comments comments={comments} />
    </div>
  );
}

interface CommentFormProps {
  pushComment: (c: CommentType) => void
}

export const CommentForm: React.FC<CommentFormProps> = (props) => {
  const [comment, setComment] = useState('');
  const [commentMutationState, commentMutation] = useCommentMutation();

  useEffect(() => {
    const { fetching, data } = commentMutationState
    if (fetching === false && data) {
      console.log(data);
      props.pushComment(data.comment);
    }
  }, [commentMutationState.fetching])

  return (
    <div>
      <h3>Add Comment:</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commentMutation({ comment });
        }}
      >
        <textarea
          onChange={e => setComment(e.target.value)}
          rows={2}
          value={comment}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export const Comments: React.FC<{ comments: CommentType[] }> = (props) => {
  if (props.comments.length < 1) {
    return <div>No comments.</div>
  } else {
    return (
      <div>
        {props.comments.map(e => (
          <Comment key={e.commentId} comment={e} />
        ))}
      </div>
    );
  }
}

/*
 * todo: nested comments
 */
export const Comment: React.FC<{ comment: CommentType }> = (props) => {
  return (
    <div
      style={{
        border: '1px solid red'
      }}
    >
      <div>{props.comment.username}</div>
      <div>{props.comment.comment}</div>

      <Ratings
        ratings={props.comment.ratings}
        commentId={props.comment.commentId}
      />
    </div>
  )
}

