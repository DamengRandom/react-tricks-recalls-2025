# React {children} not trigger re-render

## Example

```tsx
import { useState } from 'react';
import AnotherComponent from './AnotherComponent';

function Parent() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return <div>
    <button onClick={increment}>Increment</button>
    <p>{count}</p>
    <AnotherComponent />
  </div>;
}
```

Above code will trigger re-render of `AnotherComponent` when increment function get called, which is not good for performance.

## Solution

```tsx
import { memo } from 'react';
import Parent from './Parent';
import AnotherComponent from './AnotherComponent';

const App = () => {
  return <Parent><AnotherComponent /></Parent>;
};

function Parent({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  return <div>
    <button onClick={increment}>Increment</button>
    <p>{count}</p>
    {children} /* children will not trigger re-render */
  </div>;
}
``` 

Above code will not trigger re-render of `AnotherComponent` when increment function get called.
