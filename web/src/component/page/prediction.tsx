/*
 * todo: vote on predictions
 */

import React from 'react';
import { CommentsSection } from '../container/comments'
import { Navigate, useParams } from 'react-router-dom';
import { Ratings } from '../element/ratings';
import { User } from '../element/user';
import { usePredictionQuery } from '../../hook/urql';

export const Prediction: React.FC = () => {
  const params = useParams();
  const [predictionQueryState] = usePredictionQuery(params.predictionId!);

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
        <h2>Prediction:</h2>
        <p>{prediction.conditions}</p>
      </div>

      {/*
      <div>
        <h3>Ratings:</h3>
        <Ratings ratings={prediction.ratings} />
      </div>
      */}
      <Ratings ratings={prediction.ratings} />

      <div>
        <h3>By:</h3>
        <User
          user={{
            ...prediction,
            userId: prediction.prognosticatorId,
            verdict: undefined,
          }}
        />
      </div>

      <div>
        <h3>Made On:</h3>
        <div>{prediction.created_at}</div>
      </div>

      <div>
        <h3>Prediction ID:</h3>
        <p>{prediction.predictionId}</p>
      </div>

      <div>
        <h3>Judges:</h3>
        {/* {prediction.judges.map(e => (
          <User
            key={e.judgeId}
            user={{
              ...e,
              userId: e.judgeId,
              verdict: e.verdict || null,
            }}
          />
        ))} */}
      </div>

      <div>
        <h3>Comments:</h3>
        <CommentsSection comments={prediction.comments!} />
      </div>

    </div>
  );
}
