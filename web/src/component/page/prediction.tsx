import 'twin.macro';
import React from 'react';
import { CommentsSection } from '../container/comments';
import { Navigate, useParams } from 'react-router-dom';
import { Prediction as PredictionContainer } from '../container/prediction';
import { Ratings } from '../element/ratings';
import { usePredictionQuery } from '../../hook/urql';

export const Prediction: React.FC = () => {
  const params = useParams();
  const [predictionQueryState] = usePredictionQuery(params.predictionId!);

  if (predictionQueryState.fetching) {
    return <div style={{ padding: '1rem' }}>loading...</div>;
  }

  if (predictionQueryState.error || !predictionQueryState.data) {
    // todo: don't push history
    return <Navigate to="/error" />;
  }

  const { prediction } = predictionQueryState.data;

  return (
    <div>
      <div tw="mb-4">
        <PredictionContainer prediction={prediction} type="full" />
      </div>
      <div tw="mb-4">
        <Ratings
          ratings={{
            likes: prediction.likes,
            dislikes: prediction.dislikes
          }}
          predictionId={prediction.predictionId}
        />
      </div>
      <CommentsSection
        predictionId={prediction.predictionId}
        comments={prediction.comments!}
      />
    </div>
  );
};
