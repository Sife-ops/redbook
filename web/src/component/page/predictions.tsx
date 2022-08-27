import React from 'react';
import tw from 'twin.macro';
import { Prediction } from '../prediction/prediction';
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
      <h2 tw="text-center">{predictions[0].user.username}'s Predictos:</h2>
      <div>
        {predictions.map(e => (
          <div
            key={e.predictionId}
            css={[
              tw`mb-2 p-2 rounded-md bg-gray-700`,
              () => {
                if (e.verdict === 'correct') {
                  return tw`bg-green-900 border-2 border-solid border-green-500`;
                } else if (e.verdict === 'incorrect') {
                  return tw`bg-red-900 border-2 border-solid border-red-500`;
                }
              }
            ]}
          >
            <Prediction prediction={e} type="summary" />
          </div>
        ))}
      </div>
    </div>
  );
};
