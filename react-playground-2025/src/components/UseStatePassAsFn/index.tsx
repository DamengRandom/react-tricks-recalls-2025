/* eslint-disable no-debugger */
import { useCount } from '../../hooks/useCount';

function UseStatePassAsFn() {
  const { count, increment, decrement } = useCount();
  console.log('count', count);
  
  // debugger; // we can easily set up a breakpoint here

  return (
    <>
      <button type="button" onClick={increment}>Increment</button>
      <button type="button" onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </>
  );
}

export default UseStatePassAsFn;
