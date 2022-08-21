import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePredictionsQuery } from '../hook/urql';

export const DevUser: React.FC = () => {
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

  return (
    <div>
      {predictions.map(e => (
        <div 
          key={e.predictionId}
          style={{
            border: '1px solid red'
          }}
        >
          <h3>{e.predictionId}</h3>
          <div>{e.conditions}</div>
          <div>{e.created_at}</div>
        </div>
      ))}
    </div>
  )
}

