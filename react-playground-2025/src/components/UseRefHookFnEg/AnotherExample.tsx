import { useEffect, useRef, useState } from "react";

const AnotherUseRefHookFnExample = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(count);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return <section>
    <div>
      <button onClick={() => {
        setCount(count + 1);
      }}>Increment</button>
      <button onClick={() => {
        setCount(count - 1);
      }}>Decrement</button>
      <button onClick={() => {
        setCount(0);
        prevCountRef.current = 0;
      }}>Reset</button>
    </div>
    <p>Current Count: {count}</p>
    <p>Previous Count: {prevCountRef.current}</p>
  </section>;
};

export default AnotherUseRefHookFnExample;

