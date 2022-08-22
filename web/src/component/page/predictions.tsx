import 'twin.macro';
import React from 'react';
import { Prediction } from '../container/prediction';
import { useParams, Navigate } from 'react-router-dom';
import { usePredictionsQuery } from '../../hook/urql';

export const Predictions: React.FC = () => {
  const params = useParams();
  const [predictionsQueryState] = usePredictionsQuery(params.userId!);

  if (predictionsQueryState.fetching) {
    return <div style={{ padding: '1rem' }}>loading...</div>;
  }

  if (predictionsQueryState.error || !predictionsQueryState.data) {
    // todo: don't push history
    return <Navigate to="/error" />;
  }

  const { predictions } = predictionsQueryState.data;

  if (predictions.length < 1) {
    return <h2 tw="text-center">no predictos</h2>;
  }

  return (
    <div>
      <h2 tw="text-center">{predictions[0].username}'s Predictos:</h2>
      <div>
        {predictions.map(e => (
          <Prediction prediction={e} type="summary" />
        ))}
      </div>
    </div>
  );
};
