# Render function once for useState (Example - prevent unnecessary re-render) - 


## Custom hook function example:

```tsx
import { useCallback, useEffect, useState } from 'react';

function initialCount() {
  const savedCount = localStorage.getItem('count');
  return savedCount ? Number(savedCount) : 0;
}

export function useCount() {
  const [count, setCount] = useState(initialCount); // initialCount passed as a function reference to avoid unnecessary re-render !!!!!!!!

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  const increment = useCallback(() => { // also for prevent unnecessary re-render
    setCount(count + 1);
  }, []);

  const decrement = useCallback(() => { // also for prevent unnecessary re-render
    setCount(count - 1);
  }, []);

  return [count, increment, decrement];
}
```

## Now we can use this custom hook in our component:
```tsx
import { useCount } from './useCount';

function App() {
  const [count, increment, decrement] = useCount();

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>Count: {count}</p>
    </div>
  );
}

export default App;
```
