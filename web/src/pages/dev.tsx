import React from 'react';
import { useTypedQuery, useTypedMutation } from "../urql";
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
          likes: true,
          dislikes: true,
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

  const [rateMutationState, rateMutation] = useTypedMutation((vars: {
    predictionId: string;
    like: boolean;
  }) => ({
    rate: [
      vars,
      {
        likes: true,
        dislikes: true,
      }
    ]
  }));

  const [likes, setLikes] = React.useState<number>(0)
  const [dislikes, setDisikes] = React.useState<number>(0)

  React.useEffect(() => {
    const { data, fetching } = predictionQuery
    if (!fetching && data) {
      const { likes, dislikes } = data.prediction
      setLikes(likes || 0)
      setDisikes(dislikes || 0)
    }
  }, [predictionQuery.fetching])

  React.useEffect(() => {
    const { data, fetching } = rateMutationState
    if (!fetching && data) {
      const { likes, dislikes } = data.rate
      setLikes(likes)
      setDisikes(dislikes)
      // console.log(rateMutationState)
    }
  }, [rateMutationState.fetching])

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

  const handleRate = ({ like }: { like: boolean }) => {
    return (e: any) => {
      e.preventDefault();
      rateMutation({
        predictionId: prediction.predictionId,
        like
      });
    }
  }

  return (
    <div>
      <div>
        <h1>Prediction:</h1>
        <p>{prediction.conditions}</p>
      </div>
      <div>
        {likes}
        <button onClick={handleRate({ like: true })}>like</button>
        <button onClick={handleRate({ like: false })}>dislike</button>
        {dislikes}
      </div>
      <div>
        <h3>Prediction ID:</h3>
        <p>{prediction.predictionId}</p>
      </div>
      <div>
        <h3>Judges:</h3>
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
