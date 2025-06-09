// import { useMemo, useState } from "react";
import { useState } from "react";
import useFetch, { FetchOptions } from "../../hooks/useFetch";

function UseEffectUnderstanding() {
  console.log("UseEffectUnderstanding component rendered");
  const [url, setUrl] = useState<string | null>(null);
  // const memoedOptions = useMemo(() => ({ url }), [url]); // This is the trick, we make { url } as a new object which is immutable, which means it will not trigger the useEffect hook to run every single time ...
  // const { data } = useFetch(memoedOptions as { url: string });
  const { data } = useFetch({ url, onSuccess: (data) => console.log("onSuccess", data) } as FetchOptions);

  return (
    <>
      <h3>A useEffect understanding component</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => setUrl("./mocks/bob.json")}>Bob Json</button>
      <button onClick={() => setUrl("./mocks/damon.json")}>Damon Json</button>
    </>
  )
}

export default UseEffectUnderstanding;
