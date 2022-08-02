import React from 'react';
import { useTypedMutation, useTypedQuery } from "../urql";

export function Dev() {
  const [a, b] = useTypedQuery({
    query: {
      hello: true
    }
  });

  React.useEffect(() => {
    console.log(a.data)
  }, [a.fetching])

  return (
    <div style={{ padding: "1rem" }}>
      hello
    </div>
  );
}
