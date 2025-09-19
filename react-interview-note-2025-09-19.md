# # React Interview Note 2025-09-19 - optional (a bit deep)

## What is React stale closure issue?

### One classic example to describe what the issue is?

```tsx
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Current count: ', count); // always 0
      setCount(count + 1); // always be: 0 + 1
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Count: { count }</div>; // awalys display as 1
}

export default Counter;
```

### How to fix: use `prevState` value?

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => { // React guarantee prevCount is the latest count
      console.log('Current count: ', prevCount);
      return prevCount + 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

### `useRef` hook way of fix

- `useRef` is like a `box` which doesn't have stale closure issue and able to save the latest value !!!

```tsx
import { useState, useEffect, useRef } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Current count: ', countRef.current);
      setCount(countRef.current + 1); // able to get the latest value
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Count: { count }</div>;
}
```

### Why in React, we have stale closure issue?

- The substential is related with JavaScript closure concept,

Its the conflict between longer live function and short live function state values are mismatching.


## React render control

Example

```tsx
export default class RenderControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      count: 0,
    };
  }

  render() {
    const { num, count } = this.state;
    return <div>
      <button onClick={() => this.setState({ num: num + 1 })}>Add num{num}</button>
      <button onClick={() => this.setState({ count: count + 1 })}>Add count {count}</button>
      <Child num={num} />
      {/* Right now, if wee click either one of buttons, another button will trigger to re-render !!!! */}
      {/* We need to think about the way avoid another button re-rendered */}
    </div>
  }
}

const Child = ({ num }) => {
  console.log(num);

  return <div>Child component: {num}</div>;
}
```

The fix version:

```tsx
export default class RenderControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      count: 0,
    };

    this.component = <Child num={this.state.num} />
  }

  // class based component useMemo hook ~~
  const renderControl = () => {
    const { props } = this.component;

    if (props.num !== this.state.num) { // compare 2 num values, if same, not re-render, else, re-render triggered
      return this.component = React.cloneElement(this.component, { num: this.state.num });
    }

    return this.component;
  }

  render() {
    const { num, count } = this.state;

    return <div>
      <button onClick={() => this.setState({ num: num + 1 })}>Add num{num}</button>
      <button onClick={() => this.setState({ count: count + 1 })}>Add count {count}</button>
      {this.renderControl()}
    </div>
  }
}

const Child = ({ num }) => {
  console.log(num);

  return <div>Child component: {num}</div>;
}
```

## how to manually write a simple redux (state management tool) ~

- Subtential point: publish / subscribe pattern

```tsx
const createStore = function(reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(handler) {
    listeners.push(handler);
  }

  function dispatch(action) {
    const currentState = reducer(state, action);

    state = currentState;

    listeners.forEach(handler => { handler(); });
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
  }
}

const combineReducer = (reducers) => {
  const keys = Object.keys(reducers);

  return function(state = {}, action) {
    const nextState = {};

    keys.forEach((key) => {
      const reducer = reducers[key];
      const next = reducer(state[key], action);

      nextState[key] = next;
    });

    return nextState;
  }
}
```

## How `useRoutes` works?

- Put all objects as a tree format and based on URL, matching related component for rendering

```tsx
const useROutes = (routes) => {
  let location = useLocation();

  let currentPath = location.pathname || '/';

  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    let match = currentPath.match(new RegExp(`^${path}`));

    if (match) {
      return element;
    }
  }
}

const createRoutesFromChildren = (children) => {
  let routes = [];

  React.Children.forEach(children, (node) => {
    let route = {
      path: node.props.path,
      element: node.element,
    };

    if (node.props.children) {
      route.children = createRoutesFromChildren(node.props.children);
    }

    routes.push(route);
  });

  return routes;
}

const Routes = ({ children }) => useRoutes(createRoutesFromChildren(children));
```
