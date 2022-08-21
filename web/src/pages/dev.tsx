import React, { useState } from 'react';
import { CommentsSection } from '../component/comments'
import { Navigate } from 'react-router-dom';
import { Ratings } from '../component/ratings';
import { User } from '../component/user';
import { usePredictionQuery } from '../hook/urql';

export const Dev: React.FC = () => {

  const [predictionQueryState] = usePredictionQuery();

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
            avatar: prediction.avatar,
            userId: prediction.prognosticatorId,
            username: prediction.username,
            discriminator: prediction.discriminator,
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
        <h3>Comments:</h3>
        <CommentsSection comments={prediction.comments!} />
      </div>

    </div>
  );
}
