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

// ✅ Optimized with React.memo (only re-renders if props change)
const TodoItem = React.memo(({ id, text, onDelete }) => {
  console.log(`TodoItem ${id} re-rendered!`); // Now only logs when necessary
  return (
    <div>
      <span>{text}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Master Hooks" },
  ]);
  const [counter, setCounter] = useState(0);

  // ✅ Better: useCallback ensures `handleDelete` is memoized
  const handleDelete = useCallback((id) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  }, []); // No dependencies (stable reference)

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>
        Increment Counter ({counter})
      </button>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          onDelete={handleDelete} // ✅ Now stable (no re-renders)
        />
      ))}
    </div>
  );
}
```

## memo

- When a component re-renders with the same props (shallow comparison).
- Example: Pure presentational components (buttons, lists).

```jsx
import { memo, useState } from "react";

// Without `memo`, this re-renders every time `Parent` updates
const ExpensiveComponent = memo(({ text }) => {
  console.log("ExpensiveComponent re-rendered");
  return <div>{text}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Re-render Parent</button>
      <ExpensiveComponent text="Static Text" />
    </div>
  );
}
```
