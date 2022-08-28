import 'twin.macro';
import React from 'react';
import { CommentsSection } from '../comments-section/comments-section';
import { Loading } from '../loading';
import { Navigate, useParams } from 'react-router-dom';
import { Prediction as PredictionComponent } from '../prediction';
import { Ratings } from '../ratings';
import { usePredictionQuery } from '../../hook/urql';

export const Prediction: React.FC<{
  user: { userId: string; avatar: string };
}> = props => {
  const params = useParams();
  const [predictionQueryState] = usePredictionQuery(params.predictionId!);

  if (predictionQueryState.fetching) {
    return <Loading />
  }

  if (predictionQueryState.error || !predictionQueryState.data) {
    // todo: don't push history
    return <Navigate to="/error" />;
  }

  const { prediction } = predictionQueryState.data;

  return (
    <div>
      <div tw="mb-4">
        <PredictionComponent prediction={prediction} type="full" />
      </div>
      <div tw="mb-4">
        <Ratings
          predictionId={prediction.predictionId}
          ratings={{
            likes: prediction.likes,
            dislikes: prediction.dislikes
          }}
        />
      </div>
      <CommentsSection
        comments={prediction.comments!}
        predictionId={prediction.predictionId}
        user={props.user}
      />
    </div>
  );
};
