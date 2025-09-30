# Patterns & Practices

## Custom hooks for reusbability

### Example of `debounce` a search value hook

```tsx
// Hook function: debounce
import { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(time);
    }
  }, [value, delay]);

  return debounceValue;
}
```

```tsx
// Component which uses debounce hook function
import useDebounce from './useDebounce';
import { useState } from 'react';

export default function App() {
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 500);

  return (
    <div>
      <input type="text" placeholder="Search .." value={search} onChange={(e) => setSearch(e.target.value)} />
      <p>Immediate search result: {search}</p>
      <p>Debounced search result: {debounceSearch}</p>
    </div>
  );
};
```

### For Data Fetching exmaple, highly recommand using `TanStack Query`

```tsx
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

function UserList() {
  const [selectedUserId, setSelecteduserId] = useState(null);
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const usersMap = React.useMemo(() => { // get the users data as map format 
    if (!users) return new Map();

    const usersMapper = new Map();
    users.forEach(user => {
      usersMapper.set(user.id, user);
    });

    return usersMapper;
  }, [users]);

  const selectedUser = selectedUserId ? usersMap.get(selectedUserId) : null; // get the selected user by id

  if (isLoading) return <div>Loading ..</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {Array.from(usersMap.values()).map((user) => (
          <li key={user.id} onClick={() => setSelecteduserId(user.id)}>{user.name}</li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h3>Selected User</h3>
          <p>ID: {selectedUser.id}</p>
          <p>Name: {selectedUser.name}</p>
        </div>
      )}
    </div>
  );
}
```

### Lazy Loading Images & Video Implemnetations

```tsx
import { useRef, useState } from 'react';

const lazyMedia = ({ src, type = 'image', alt, width, height }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (type === 'image') {
    return (
      <img
        ref={ref}
        src={isVisible ? src : ''}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="feed-media"
      />
    )
  }

  if (type === 'video') {
    return (
      <div ref={ref} className="video-container">
        {
          !isVisible ? (
            <img
              src={`${src}?thumbnail=true`}
              alt={`Video: ${alt}`}
              width={width}
              height={height}
              className="video-poster"
            />
          ) : (
            <video
              width={width}
              height={height}
              controls
              preload="none" // don't load video until user interacts
              className="feed-video"
            >
              <source src={src} ytpe="video/mp4" />
            </video>
          )
        }
      </div>
    );
  }

  return <p>Only support Image, Video media type for now ..</p>
};
```

```tsx
import React from 'react';
import LazyMedia from './LazyMedia';

// enhanced feed item component
const EnhancedFeedItem = React.memo(({ // prevent re-renders when parents update but item props haven't changed
  id,
  content,
  imageUrl,
  likes,
  isLiked,
  onLike
}) => {
  return (
    <div className="feed-item">
      <p>{ content }</p>
      <LazyMedia
        src={imageUrl}
        type="image"
        alt={`Feed Image: ${id}`}
        width={400}
        height={300}
      />
    </div>
  );
});

export default EnhancedFeedItem;
```
