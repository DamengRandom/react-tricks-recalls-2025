# Hook functions Recalls

## useEffect

### Common use cases

1. Fetching data from an API when component mounts

```tsx
useEffect(() => {
  fetchingData();
}, []);
```

2. Subscribing & Unsubscribing events

```tsx
useEffect(() => {
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
```

3. Times / Intervals

```tsx
useEffect(() => {
  const id = setInterval(() => setTime(Date.now()), 1000);

  return () => clearInterval(id);
}, []);
```

### Common mistakes of using useEffect hooks

1. Forget to add dependency array

```tsx
useEffect(() => {
  fetchingData();
}); // ❌ forget to add dependency array []
```

2. Incorrect depdencies

```tsx
useEffect(() => {
  fetchingData(user.id);
}, []); // ❌ user.id not tracked
```

3. Forget to cleanup

```tsx
useEffect(() => {
  window.addEventListener("resize", handleResize);
}, []); // ❌ forget to add clean up by running `return` function : return () => window.removeEventListener("resize", handleResize);
```

4. MOST IMPORTANT ONE: Async directly in useEffect

```tsx
useEffect(async () => {
  await fetchData();
}, []); // ❌ WRONG !!!!!!!!!!!!!!!!!!!
```

```tsx
useEffect(() => {
  let isMounted = true;
  const fetchDataFn = async () => {
    const res = await fetch(url);
    if (!isMounted) return;

    const json = await res.json();

    if (isMounted) {
      setFetchData(json);
    }
  };

  fetchDataFn();

  return () => {
    isMounted = false;
  }
}, []);
```

5. Infinite loop

```tsx
useEffect(() => {
  setCount(count + 1); // ❌ cause infinite loop
}, [count]);
```

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


## memo

```tsx
// Child level component
import { memo } from "react";

export default function FeedItem = memo(({
  id,
  content,
  imageUrl,
  likes,
  isLiked,
  onLike,
}) => {
  console.log(`Rendering FeedItem ${id}`); // This will log only when props actually change 

  return (
    <div className="feed-item">
      <p>{content}</p>
      <img
        src={imageUrl}
        alt={`Feed item image ${id}`}
        loading="lazy"
        width="100%"
      />

      <button onClick={() => onLike(id)}>{isLiked ? 'Unlike' : 'Like'} {likes} likes</button>
    </div>
  );
});
// In useCallback will write parent component
```

## useCallback

```tsx
import { useCallback } from 'react';

export default function Feed() {
  const [feedItems, setFeedItems] = useState([]);

  const handleLike = useCallback(async (id) => {
    // optimistic update
    setFeedItems(currentItems => currentItems.map(item => item.id === id ? { ..item, likes: item.likes + 1, isLiked: true } : item));
    //  await fetch(`/api/posts/${id}/like`, { method: 'POST' }, []);
    await fetchItems(id);
  }, []);

  return (
    <div className="feed">
      {feedItems.map(item => (
        {/* Now, we can see from this parent component, we call child component, and child component has `memo` which prevent unnecessary re-renders */}
        <FeedItem
          key={item.id}
          id={item.id}
          content={item.content}
          imageUrl={item.imageUrl}
          likes={item.likes}
          isLiked={item.isLiked}
          onLike={handleLike}
        />
      ))}
    </div>
  );
}
```

## useMemo

```tsx
// @TODO
```
