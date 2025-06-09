# Performance related hooks

This post is just focus on when to use these hooks, and how to use them. Nothing more ...

## useMemo: memo for the function result!!

- When you have a heavy computation that doesn’t need to re-run on every render.
-Example: Filtering a large list, complex calculations.

```jsx
import { useMemo, useState } from "react";

function UserList({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]); // Only re-run when `users` or `searchTerm` changes

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Usage:
<UserList users={bigList} searchTerm="John" />
```

## useCallback: memo for the function itself!!

- When passing a function as a prop to child components (to prevent unnecessary re-renders).
- Example: Event handlers, callbacks in useEffect.

```jsx
import React, { useState, useCallback } from 'react';

// Child component that relies on function reference stability
const ExpensiveChildComponent = React.memo(({ onClick }: { onClick: (id: number) => void }) => {
  console.log('Child component rendered'); // Only logs when props actually change
  
  return (
    <div>
      <button onClick={() => onClick(1)}>Action 1</button>
      <button onClick={() => onClick(2)}>Action 2</button>
    </div>
  );
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  // With useCallback - stable function reference
  const handleClick = useCallback((id: number) => {
    console.log(`Action ${id} clicked`);
    setItems(prev => [...prev, `Action ${id} at ${new Date().toISOString()}`]);
  }, []); // Empty dependencies = never recreates

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Increment: {count}
      </button>
      
      <ExpensiveChildComponent onClick={handleClick} />
      
      <ul>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## memo

- When a component re-renders with the same props (shallow comparison).
- Pure functional components that always render the same output for the same props
- Components that render often with the same props
- Medium-to-large components where re-rendering is expensive
- Components that cause child component re-renders unnecessarily
- Example: Pure presentational components (buttons, lists).

```jsx
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartProps {
  data: {
    name: string;
    value: number;
  }[];
  dimensions: { width: number; height: number };
  color?: string;
}

const DataChart = memo(({ data, dimensions, color = '#8884d8' }: ChartProps) => {
  console.log('Chart rendering'); // Only when props change
  
  return (
    <BarChart
      width={dimensions.width}
      height={dimensions.height}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill={color} />
    </BarChart>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if data or dimensions change
  return (
    prevProps.data === nextProps.data &&
    prevProps.dimensions.width === nextProps.dimensions.width &&
    prevProps.dimensions.height === nextProps.dimensions.height &&
    prevProps.color === nextProps.color
  );
});

export default DataChart;
```
