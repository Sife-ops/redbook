import React, { useEffect, useState } from 'react';
import { Comment as CommentType, Rating as RatingType } from '../../../graphql/genql/schema';
import { Navigate } from 'react-router-dom';
import { useLike } from '../hook/like';
import { usePredictionQuery, useCommentMutation } from '../hook/urql';

export const Ratings: React.FC<{ ratings: RatingType[], commentId?: string }> = (props) => {
  const { ratingsState, rate } = useLike(props.ratings, props.commentId);

  return (
    <div>
      <button onClick={() => rate('like')} >
        like
      </button> {' '}

      {ratingsState.likes} {' '}

      <button onClick={() => rate('dislike')} >
        dislike
      </button> {' '}

      {ratingsState.dislikes}
    </div>
  );
}

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

export const Dev = () => {

  const [avatar, setAvatar] = useState<string | undefined>();
  const fetchAvatar = async (user: { userId: string, avatar: string }) => {
    const res = await fetch(`https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setAvatar(imageObjectURL);
  };

  const [comment, setComment] = useState('');

  const [predictionQueryState] = usePredictionQuery();

  const [_, commentMutation] = useCommentMutation();

  useEffect(() => {
    const { data, error } = predictionQueryState
    if (data && !error) {
      const { prediction: { avatar, prognosticatorId } } = data;
      fetchAvatar({ avatar, userId: prognosticatorId });
    }
  }, [predictionQueryState.fetching])

  if (predictionQueryState.fetching) {
    return (
      <div style={{ padding: "1rem" }}>
        loading...
      </div>
    );
  }

  if (predictionQueryState.error || !predictionQueryState.data) {
    // todo: don't push history
    return <Navigate to='/error' />
  }

  const { prediction } = predictionQueryState.data;

  const verdict = (i: boolean | undefined) => {
    if (i === true) {
      return 'in favor'
    } else if (i === false) {
      return 'against'
    } else {
      return 'undecided'
    }
  }

  return (
    <div>

      <div>
        <h1>Prediction:</h1>
        <p>{prediction.conditions}</p>
      </div>

      <div>
        <h1>Prognosticator:</h1>
        <div>
          {avatar && <img src={avatar} alt="icons" />}
          {prediction.username}#{prediction.discriminator}
        </div>
      </div>

      <div>
        <h3>Prediction ID:</h3>
        <p>{prediction.predictionId}</p>
      </div>

      <div>
        <h3>Ratings:</h3>
        <Ratings ratings={prediction.ratings} />
      </div>

      <div>
        <h3>Judges:</h3>
        {prediction.judges.map(e => (
          <div key={e.judgeId}>
            <div>{`${e.username}#${e.discriminator}`}</div>
            <div>{verdict(e.verdict)}</div>
          </div>
        ))}
      </div>

      <div>
        <h3>Add Comment:</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commentMutation({ comment });
          }}
        >
          {/* 
          <label>
            Name: 
            <input type="textarea" name="name" />
          </label>
          */}
          <textarea
            onChange={e => setComment(e.target.value)}
            rows={2}
            value={comment}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div>
        <h3>Comments:</h3>
        <Comments comments={prediction.comments!} />
      </div>

    </div>
  );
}
