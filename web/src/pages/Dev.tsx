import React from 'react';
import { useTypedQuery } from "../urql";
import { useParams } from 'react-router-dom'

export function Dev() {
  const params = useParams();

  // const [a] = useTypedQuery({
  //   query: {
  //     hello: true
  //   }
  // });

  const [b] = useTypedQuery({
    query: {
      prediction: [
        {
          predictionId: params.predictionId!
        },
        {
          conditions: true,
          judges: {
            judgeId: true
          }
        }
      ]
    }
  })

  React.useEffect(() => {
    console.log(params)
    console.log(b)
  }, [b.fetching])

  return (
    <div style={{ padding: "1rem" }}>
      hello
    </div>
  );
}
