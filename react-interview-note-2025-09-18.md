# React Interview Note 2025-09-18

## Why previously always require `import React from 'react'` on the top of React component file, why now no longer needed?

One word: the `JSX transform` has been changed from React v`17`

Previously, we need 

```tsx
// Form:
function MyComponent() {
  return <h1>Hello World</h1>;
}

// To:

// Compilers like Babel would transform it literally into this:

function MyComponent() {
  return React.createElement('h1', null, 'Hello World');
}
// The code needed the React identifier.
```

Now, we have 

```tsx
// From:
function MyComponent() {
  return <h1>Hello World</h1>;
}

// To:

// The new JSX transform doesn't convert JSX into React.createElement. Instead, it automatically imports special functions from the React package's new entry points.

// Inserted by the compiler (you don't do this manually!)
import { jsx as _jsx } from 'react/jsx-runtime';

function MyComponent() {
  return _jsx('h1', { children: 'Hello World' });
}
// The compiler handles importing the necessary functions.
```

## What is `Fiber`?

### Definition

- Shot word: `It's the engine that powers React's rendering process.`

- A bit descriptive: is the powerful new engine that enables `Concurrent` React. It allows React to work on `rendering updates` in an `incremental`, `interruptible` way, prioritizing `urgent updates` to keep your application feeling `smooth and responsive`, no matter how complex the component tree.

### Fiber assigns different priorities to different updates.

- `High` Priority: User interactions (clicks, typing), animations.
- `Low` Priority: Lazy-loaded content, off-screen updates, data fetching.

### Analogy: The Restaurant Kitchen

- `Old Stack Reconciler`: A single chef who must prepare an entire complex meal from start to finish without stopping. If a customer asks for a glass of water, the chef must finish the current complex task first.
  - has to traverse the DOM tree and do the updates (Slower)

- `React Fiber`: A head chef who can prioritize tasks. They can tell a line cook to start simmering a sauce (a low-priority task), immediately pause that to hand a customer a glass of water (a high-priority task), and then check back on the sauce later.
  - via return, child and sibling relationship, which doesn't require the traverse for DOM updates (Faster)

### From code definitions

- Fiber is substentially treated as `data structure`, why:

```js
const FiberNode = {
  tag, // type of fiber node
  key, 
  type, // dom nodes

  // create complex tree nodes
  return, // point to parent node
  child, // point to the first node
  sibling, // point to the brother/sisters node

  // check whether updates which nodes?
  pendingProps,
  memoizedProps,
  updatedQueue,
  memoizedState,

  // side effects
  effectTag,
  nextEffect,
  firstEffect,
  lastEffect,

  // caching nodes
  alternate,

  // state DOM nodes
  stateNode,

  // ... ...
}
```

## React data structures

- `V-DOM`: element
  - `React.createElement` (Class/Functional compoennt returned value)
  - its a big object
- `Current Fiber`: node
  - represent for current states of data structures (with WIP fiber together to call `double cache mechanism`)
- `Working in progress Fiber`
  - when states updated, `Working in progress Fiber` will be created, and then compare with `Current Fiber` to see whether there are any differences
- `Real DOM`: the real dom element

React reconciliation: compared `current fiber` with `v-dom` and generate the `Working in progress Fiber`

## React update workflow

### Begin work

- Using v-dom and current fiber to generate `Working in progress Fiber` for sub-nodes
  - Run class/functional based components
  - add efftecTag for the nodes which required to be updated
    - placement -> binary format: 2 -> 0010
    - deletion -> binary format: 8 -> 1000
    - update -> binary format: 4 -> 0100
    - placement + update -> binary format: 6 -> 0110

### Complete work

- From bottom to top, traverse the `Working in progress Fiber` tree, and check whether each node has `effectTag` or not. If yes, then perform the side effects.
- Create real DOM tree, but not rendering yet

### Commit work

- `commitBeforeMutationEffect`
- `commitMutationEffect`
  - handle effectList
  - update the real DOM tree
- Switch `WIP fiber` to `current fiber`
- `commitLayoutEffect`
  - Run lifecyle functions, eg: `componentWillMount`, `componentDidMount`
- Finally, show the updated state values in the real dom tree

Rendering process for the updates completed !!
