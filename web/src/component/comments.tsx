import React from 'react';
import { Comment as CommentType } from '../../../graphql/genql/schema';
import { Ratings } from '../component/ratings';

export const Comment: React.FC<{ comment: CommentType }> = (props) => {
  // const [replyMode, setReplyMode] = useState<boolean>(false);

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

      {/*
      <button onClick={() => setReplyMode(true)}>reply</button>
      {replyMode && (
        <div>
          <input />
          <button>post</button>
          <button onClick={() => setReplyMode(false)}>cancel</button>
        </div>
      )}
      */}
    </div>
  )
}

export const Comments: React.FC<{ comments: CommentType[] }> = (props) => {
  if (props.comments.length < 1) {
    return <div>No comments.</div>
  } else {
    const comments = props.comments;
    comments.sort((a, b) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at)
    });

    return (
      <div>
        {comments.map(e => (
          <Comment key={e.commentId} comment={e} />
        ))}
      </div>
    );
  }
}
