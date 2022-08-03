import React from 'react';
import { useTypedQuery } from "../urql";
import { useParams, Navigate } from 'react-router-dom'

export function Dev() {
  const params = useParams();

  const [predictionQuery] = useTypedQuery({
    query: {
      prediction: [
        {
          predictionId: params.predictionId!,
        },
        {
          avatar: true,
          conditions: true,
          created_at: true,
          discriminator: true,
          predictionId: true,
          prognosticatorId: true,
          username: true,
          verdict: true,
          judges: {
            judgeId: true,
            predictionId: true,
            username: true,
            discriminator: true,
            verdict: true,
          }
        }
      ]
    }
  })

  if (predictionQuery.fetching) {
    return (
      <div style={{ padding: "1rem" }}>
        loading...
      </div>
    );
  }

  if (predictionQuery.error || !predictionQuery.data) {
    // todo: don't push history
    return <Navigate to='/error' />
  }

  const { prediction } = predictionQuery.data;

  return (
    <div>
      <h1>{prediction.predictionId}</h1>
      <div>
        <h3>conditions</h3>
        <p>{prediction.conditions}</p>
      </div>
      <div>
        <h3>judges</h3>
        {prediction.judges.map(e => (
          <div key={e.judgeId}>
            <div>{e.username ? e.username : e.judgeId}{e.discriminator ? `#${e.discriminator}` : ''}</div>
            <div>verdict: {useVerdict(e.verdict)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const useVerdict = (i: boolean | undefined) => {
  if (i === true) {
    return 'in favor'
  } else if (i === false) {
    return 'against'
  } else {
    return 'undecided'
  }
}
