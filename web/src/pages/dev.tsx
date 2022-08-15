import React from 'react';
import { useParams, Navigate } from 'react-router-dom'
import { usePredictionQuery, useRateMutation } from '../hook/urql'

export function Dev() {
  const params = useParams();

  const [predictionQueryState] = usePredictionQuery(params.predictionId!)

  // const [rateMutationState, rateMutation] = useRateMutation()

  // todo: like button state hook
  // const [likes, setLikes] = React.useState<number>(0)
  // const [dislikes, setDisikes] = React.useState<number>(0)

  // React.useEffect(() => {
  //   const { data, error, fetching } = predictionQueryState
  //   if (!fetching && !error && data) {
  //     // const { likes, dislikes } = data.prediction
  //     // setLikes(likes || 0)
  //     // setDisikes(dislikes || 0)
  //   }
  // }, [predictionQueryState.fetching])

  // React.useEffect(() => {
  //   const { data, error, fetching } = rateMutationState
  //   if (!fetching && !error && data) {
  //     // const { likes, dislikes } = data.rate
  //     // setLikes(likes)
  //     // setDisikes(dislikes)
  //     // localStorage.setItem(prediction.predictionId, '1')
  //   }
  // }, [rateMutationState.fetching])

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

  // const handleRate = ({ like }: { like: boolean }) => {
  //   return (e: any) => {
  //     e.preventDefault();
  //     rateMutation({
  //       predictionId: prediction.predictionId,
  //       like
  //     });
  //   }
  // }

  const useVerdict = (i: boolean | undefined) => {
    if (i === true) {
      return 'in favor'
    } else if (i === false) {
      return 'against'
    } else {
      return 'undecided'
    }
  }

  return (
    <div>
      <div>
        <h1>Prediction:</h1>
        <p>{prediction.conditions}</p>
      </div>
      {/*
      <div>
        {likes}
        <button
          disabled={!!localStorage.getItem(prediction.predictionId)}
          onClick={handleRate({ like: true })}
        >like</button>
        <button
          disabled={!!localStorage.getItem(prediction.predictionId)}
          onClick={handleRate({ like: false })}
        >dislike</button>
        {dislikes}
      </div>
      */}
      <div>
        <h3>Prediction ID:</h3>
        <p>{prediction.predictionId}</p>
      </div>
      <div>
        <h3>Judges:</h3>
        {prediction.judges.map(e => (
          <div key={e.judgeId}>
            <div>{`${e.username}#${e.discriminator}`}</div>
            <div>{useVerdict(e.verdict)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
