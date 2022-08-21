import React from 'react';
import { Prediction as PredictionType } from '../../../graphql/genql/schema';
import { useParams, Navigate } from 'react-router-dom';
import { usePredictionsQuery } from '../hook/urql';

const PredictionSummary: React.FC<{ prediction: PredictionType }> = (props) => {
  return (
    <div
      style={{
        border: '1px solid red'
      }}
    >
      <h3>{props.prediction.predictionId}</h3>
      <div>{props.prediction.conditions}</div>
      <div>{props.prediction.created_at}</div>
      <div>
        {(() => {
          if (props.prediction.verdict === null) {
            return 'undecided'
          } else if (props.prediction.verdict) {
            return 'correct'
          } else {
            return 'incorrect'
          }
        })()}
      </div>
    </div>
  )
}

export const Predictions: React.FC = () => {
  const params = useParams();
  const [predictionsQueryState] = usePredictionsQuery(params.userId!);

  if (predictionsQueryState.fetching) {
    return (
      <div style={{ padding: "1rem" }}>
        loading...
      </div>
    );
  }

  if (predictionsQueryState.error || !predictionsQueryState.data) {
    // todo: don't push history
    return <Navigate to='/error' />
  }

  const { predictions } = predictionsQueryState.data;

  if (predictions.length < 1) {
    return (
      <div>no predictos</div>
    )
  }

  return (
    <div>
      <h2>{predictions[0].username}'s Predictos:</h2>
      <div>
        {predictions.map(e => (
          <PredictionSummary prediction={e} />
        ))}
      </div>
    </div>
  )
}

