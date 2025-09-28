# React Interview Note 2025-09-15

## React how to create an app?

### React app creation commands

```bash
npx create-react-app demo-app # a common way ~
npx create-react-app demo-ts-app --template typescript # ts project creation command
```

### Whats `eject` for?

- One word: a `customised` configuration mode for your React app by `eject` some default configurations

- `eject` is a command that allows you to "eject" from the default configuration of a React project.
- When you run `eject`, it will expose the underlying configuration files (like Webpack, Babel, and ESLint) so you can customize them as needed.
- This is useful if you need `more control` over the `build process` or if you want to use a specific feature that isn't available in the default configuration.
- However, it's important to note that ejecting is a one-way operation, and once you eject, you `can't` go back.
- So, it's generally recommended to only eject if you have a specific reason to do so, and to do it early in the development process.

## How many ways to create React component?

### Class-based Component - less common

```tsx
// Example of class based component with life cycle function implemented
class MyComponent extends React.Component {
  constructor(props) { // becasue its class, so contructor function is necessary
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() { // life cycle function - check details with diagram ~
    console.log('Component mounted');
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() { // render function 
    return (
      <>
        <div>Hello, world!</div>;
        {/* 
          when calling function, please put `this.functionName` instead of `functionName`
        */}
        <button onClick={this.handleClick}>Click me</button>
        <div>Count: {this.state.count}</div>
      </>
    );
  }
}
```

### Functional Component - common

```tsx
// Example of functional component with hooks implemented
function MyFunctionalComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => { // hook function - classic ~
    console.log('Component mounted');
  }, []);
  
  return <div>Hello, world!</div>;
}
```

## Common React Hooks

### useEffect

- simulate life cycle functions
- handle side effects

### useState

- manage state in functional components

### useLayoutEffect

- run before useEffect

### useMemo

- return a cacheable value - optimize for expensive calculation purpose (performance)

### useCallback

- return a cachable function - optimize for caching the function for preventing re-render purpose (performance)

### useRef

- locate a specific DOM element

### useReducer

- to update multiple states, likie object, provide actions and update the states, make whole process more predictable ~

### useContext

- create a global state context, used for prevent props drilling issue, but if use too much under nested level, could cause children level components keep re-rendered (unexpected) ....

Thats why this hook need to be very careful when using it ~, SPA could be a good use case

## React life-cycle functions (Followed the order ~) - not very common to use, since functional components are more pop

### Initialization stage

- `constructor`: 
  - called when an instance of the component is created
  - used for initializing state and binding methods
  - not called when the component is updated

- `getDerivedStateFromProps`: 
  - called before `render` method, used for updating state based on props
  - not called on initial render
  - should return an object to update state, or `null` to indicate no update
  - deprecated in React `16.3`, replaced by `componentDidMount` and `componentDidUpdate`

- `componentWillMount`:
  - If component already have `getDerivedStateFromProps`, `componentWillMount` will not be executed ~

- `render`: 
  - called to render the component
  - should be `pure`, meaning it does not modify component state
  - can be called multiple times, including on initial render and subsequent updates

- `componentDidMount`: 
  - called after the component is mounted (rendered for the first time)
  - used for `performing side effects`, such as fetching data or setting up subscriptions
  - `not` called on subsequent updates

### Update Stage:

- `componentWillReceiveProps`:
  - when props changed, this function get called
  - when component already have `getDerivedStateFromProps`, `componentWillReceiveProps` will not be executed ~
  - when component updated, `setState` won't trigger second time

- `shouldComponentUpdate`:
  - its like an interceptor which returns a boolean value to determine whether state get updated / component get rendered or not
  - when `shouldComponentUpdate` return `false`, component won't be updated
  - when `shouldComponentUpdate` return `true`, component will be updated

- `componentWillUpdate`:
  - Run before `render` function to determine whether state should be updated or not
  - then call `getSnapshotBeforeUpdate(prevProps, prevState)` function to get the snapshot of the DOM before update
  - then call `componentDidUpdate` function to perform side effects based on previous props or state

- `componentDidUpdate`: 
  - never call setState inside this function
  - can be used for updating/fetching/setting/cleaning up state based on previous props or state

### Unmount Stage

- `componentWillUnmount`:
  - React calls this function before leave the current component, use cases:
    - `clear the timer/interval/immediate` before unmount the component
    - `remove event listeners` before unmount the component
    - `cancel network requests` before unmount the component
    - `close database connections` before unmount the component
    - `clean up any other resources` before unmount the component


## Functional component simulate life cycle functions

### Example code

```tsx
// Example of using functional component to simulate the life-cycle function
export default function LifeCycle() {
  const [state, setState] = useState(() => {
    console.log('getDerivedFromProps');
    return ;
  });

  useEffect(() => {
    console.log('componentDidMount');
    new Promise((resolve, reject) => {
      resolve('success');
    }).then((res) => {
      console.log(res);
    });

    return () => {
      console.log('componentWillUnmount');
    }
  } , []);

  useEffect(() => {
    console.log("componentWillReceiveProps");
  }, [props]);


  useLayoutEffect(() => {
    console.log("componentDidUpdate - layout effect");
  });

  return <div>
    <h3>Life Cycle Function represented by functional component ~</h3>
    <p>Show console log for the ordering based life cycle function running sequence</p>
    <button onClick={() => setState(b => `${Math.random()}`)}>Show console</button>
  </div>
}
```
