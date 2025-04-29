# Hook functions Recalls

## useRef

- This hook function will not re-render the component when the value changes.
- Usually used to store the reference of the DOM element (DOM control purpose)
- Can also use it for checking previous states

- Example of using useRef for DOM control:
```tsx
import { useRef } from "react";

const UseRefHookFnEg = () => {
  const ref = useRef<HTMLParagraphElement>(null);

  const handleScrollDown = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' });
  };

  return <div>
    <button onClick={handleScrollDown}>Scroll Down To Bottom</button>
    <p style={{ height: '400px', width: '100%' }}>mock text content 1</p>
    <p style={{ height: '400px', width: '100%' }}>mock text content 2</p>
    <p style={{ height: '400px', width: '100%' }}>mock text content 3</p>
    <p style={{ height: '400px', width: '100%' }}>mock text content 4</p>
    <p style={{ height: '400px', width: '100%' }}>mock text content 5</p>
    <p style={{ height: '400px', width: '100%' }} ref={ref}>mock text content 6</p>
  </div>;
};

export default UseRefHookFnEg;
```

- Another example of using useRef for checking previous state value:
```tsx
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
```
