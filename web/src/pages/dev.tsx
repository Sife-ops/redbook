import React, { useState } from 'react';
import { Comments } from '../component/comments'
import { Navigate } from 'react-router-dom';
import { Ratings } from '../component/ratings';
import { User } from '../component/user';
import { usePredictionQuery, useCommentMutation } from '../hook/urql';

export const Dev: React.FC = () => {

  const [comment, setComment] = useState('');

  const [predictionQueryState] = usePredictionQuery();

  const [_, commentMutation] = useCommentMutation();

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

  return (
    <div>

      <div>
        <h1>Prediction:</h1>
        <p>{prediction.conditions}</p>
      </div>

      <div>
        <h3>Prognosticator:</h3>
        <User
          user={{
            avatar: prediction.avatar,
            userId: prediction.prognosticatorId,
            username: prediction.username,
            discriminator: prediction.discriminator,
          }}
        />
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
          <User
            key={e.judgeId}
            user={{
              avatar: e.avatar,
              userId: e.judgeId,
              username: e.username,
              discriminator: e.discriminator,
              verdict: e.verdict || null,
            }}
          />
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
