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

  console.log(predictionsQueryState.data)

  return <div>lol</div>
}

