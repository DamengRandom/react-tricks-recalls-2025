import { useEffect, useState } from "react";

// This is a simple example of how to use AbortController to abort a fetch request.
// It is useful when you want to cancel a fetch request when the component unmounts.

const AbortControllerEg = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
      .then(response => response.json())
      .then(json => setCount(json?.length ?? 0))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          throw error;
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return <div>How many: {count}</div>;
};

export default AbortControllerEg;
