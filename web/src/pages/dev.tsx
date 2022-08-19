import React, { useState, useEffect } from 'react';
import { Comment as CommentType, Rating as RatingType } from '../../../graphql/genql/schema';
import { useParams, Navigate } from 'react-router-dom'
import { usePredictionQuery } from '../hook/urql'
import { useLike } from '../hook/like';

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
    return (
      <div>
        {props.comments.map(e => (
          <Comment key={e.commentId} comment={e} />
        ))}
      </div>
    )
  }
}

export function Dev() {
  const params = useParams();

  const [predictionQueryState] = usePredictionQuery(params.predictionId!)

  // const [rateMutationState, rateMutation] = useRateMutation()

  // todo: like button state hook
  // const [likes, setLikes] = React.useState<number>(0)
  // const [dislikes, setDisikes] = React.useState<number>(0)

  // React.useEffect(() => {
  //   const { data, error, fetching } = predictionQueryState
  //   if (!fetching && !error && data) {
  //     // const { likes, dislikes } = data.prediction
  //     // setLikes(likes || 0)
  //     // setDisikes(dislikes || 0)
  //   }
  // }, [predictionQueryState.fetching])

  // React.useEffect(() => {
  //   const { data, error, fetching } = rateMutationState
  //   if (!fetching && !error && data) {
  //     // const { likes, dislikes } = data.rate
  //     // setLikes(likes)
  //     // setDisikes(dislikes)
  //     // localStorage.setItem(prediction.predictionId, '1')
  //   }
  // }, [rateMutationState.fetching])

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
  // console.log(prediction);

  // const handleRate = ({ like }: { like: boolean }) => {
  //   return (e: any) => {
  //     e.preventDefault();
  //     rateMutation({
  //       predictionId: prediction.predictionId,
  //       like
  //     });
  //   }
  // }

  const useVerdict = (i: boolean | undefined) => {
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

      {/*
      <div>
        {likes}
        <button
          disabled={!!localStorage.getItem(prediction.predictionId)}
          onClick={handleRate({ like: true })}
        >like</button>
        <button
          disabled={!!localStorage.getItem(prediction.predictionId)}
          onClick={handleRate({ like: false })}
        >dislike</button>
        {dislikes}
      </div>
      */}

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
            <div>{useVerdict(e.verdict)}</div>
          </div>
        ))}
      </div>

      <div>
        <h3>Comments:</h3>
        <Comments comments={prediction.comments!} />
      </div>

    </div>
  );
}
