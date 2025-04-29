import { useCallback, useEffect, useState } from 'react';

interface UseStatePassAsFnProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

function initialCount() {
  const savedCount = localStorage.getItem('count');
  return savedCount ? Number(savedCount) : 0;
}

export function useCount(): UseStatePassAsFnProps {
  const [count, setCount] = useState(initialCount); // ✅ initialCount passed as a function reference to avoid unnecessary re-render !!!!!!!!
  // const [count, setCount] = useState(initialCount()); // ❌ 

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  const increment = useCallback(() => { // also for prevent unnecessary re-render
    setCount(count + 1);
  }, [count]);

  const decrement = useCallback(() => { // also for prevent unnecessary re-render
    setCount(count - 1);
  }, [count]);

  return { count, increment, decrement };
}
