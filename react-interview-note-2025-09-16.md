# React Interview Note 2025-09-16

## how to use hooks to access data via API

- better not call hook function inside loop, if, or other functions

```ts
if (condition) { // This is wrong ❌
  useEffect(() => { ... ... }, [])
}
```

- only call hook function inside react function, cannot call in JS function

```ts
function getData() {
  useData(); // This is wrong ❌
}

function useData(cb, deps) {
  useData(cb, deps); // This is correct ✅
}
```

## Why hooks?

- allow to wrap up stateful code logic into a single function and make it re-usable
- to shorten code, especially target for class based components
  - avoid using `this.handleClick.bind(this)`

  ```tsx
  export default class ThisBindExample extends Component {
    state = { num: 0 };

    handleClick = () => { // this works ✅: because In your React component, the class structure provides the correct lexical context for the arrow function to inherit the right this value
      this.setState({ num: this.state.num + 1 });
    }

    handleClickBind function() { // has to use bind(this)
      this.setState({ num: this.state.num + 1 });
    }

    render() {
      return (
        <div>
          <h5>Current number value: {this.state.num}</h5>
          <button onClick={this.handleClick}>++++</button>
          <button onClick={this.handleClickBind.bind(this)}>++++</button>
        </div>
      )
    }
  }
  ```

  - provided some life cycle functions replacement, such as `useEffect`, a good code example to explain:

  <!-- class based component, logics are longer and hard to maintain compared with using hook functions -->
  ```tsx
  class MyComponent extends React.Component {
    componentDidMount() {
      // 1. Setup subscription here
      document.addEventListener('click', this.handleClick);
      // 2. Fetch data here
      this.fetchData(this.props.userId);
    }

    componentDidUpdate(prevProps) {
      // 2. Also fetch data here if props changed
      if (prevProps.userId !== this.props.userId) {
        this.fetchData(this.props.userId);
      }
    }

    componentWillUnmount() {
      // 1. Cleanup subscription here
      document.removeEventListener('click', this.handleClick);
    }

    // ... fetchData and handleClick methods
  }
  ```

  <!-- By using hook: useEffect -->
  ```tsx
  function MyComponent({ userId }) {
    // 1. Group subscription logic together
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => { // Cleanup for subscription
        document.removeEventListener('click', handleClick);
      };
    }, []);

    // 2. Group data fetching logic together
    useEffect(() => {
      fetchData(userId);
    }, [userId]); // Only re-run if userId changes
    // ... other logic
  }
  ```

## React way of getting DOM element

- Inside class component, using `createRef()`
- Inside functional component, using `useRef()`

Using `.current` to get values

## React version

- Before 16.8 -> stack reconciler -> class based components (more) -> no fiber reconciler
- React `16.8` -> hook created -> functional components (more)
- React `17.x` -> fiber reconciler -> concurrent mode (experiment)
- React `18.x` -> concurrent mode features

## setState is sync or async?

- React 18+ is `async` 
- React 18- (eg: `17.x`) is `sync` only for the `setState()` code inside `setTimeout`, because `batchedUpdating` does not cover `setTimeout` code logics

## useLayoutEffect vs useEffect

- `useLayoutEffect` run before `useEffect`
- `useLayoutEffect` callback is sync run, `useEffect` callback is async run
- `useLayoutEffect` is used for DOM manipulation, `useEffect` is used for side effects

## React HOC (High Order Component)

- Common use cases:
  - props proxy

  ```tsx
    // Hoc example 1:
    const withCard = (color) => (Component) => {
      return (props) => (
        const hocStyle = {
          margin: '8px',
          padding: '8px',
          border: `1px solid ${color}`,
          background: color,
        }

        const name = "hoc provided name prop";

        return (
          <div style={hocStyle}>
            <Component {...props} name={name} />
          </div>
        )
      )
    }

    // base component for example 1
    const PropProxy = ({ name }) => {
      return (
        <div>
          <h2>This is the title</h2>
          <p>Aloha, I am {name}</p>
        </div>
      )
    }

    // add Hoc for example 1
    const RedPropCard = withCard('red')(PropProxy);

    // base compoennt for example 2
    class BaseComponent extends Component {
      componentDidMount() {
        console.log("render componentDidMount");
      }

      render() {
        return (
          <div>
            <h2>This is another example</h2>
          </div>
        )
      }
    }

    // Another Hoc example 2
    const withLog = (props) => (WrappedComponent) => {
      const didMountInstance = WrappedComponent.prototype.componentDidMount;

      return class A extends WrappedComponent {
        componentDidMount() {
          if (didMountInstance) didMountInstance.apply(this);

          console.log("withLog componentDidMount");
          console.log("Adding extra logics", props);
        }

        render() {
          return super.render();
        }
      }
    }

    // add Hoc for example 2
    const LogComponent = withLog("log props json")(BaseComponent);

    // call exmaple 1 & 2
    export default function HocExample() {
      return (
        <div>
          Prop Proxy <PropProxy />
          With Hoc Props <RedPropCard />
          Reverse Inherit <LogComponent />
        </div>
      )
    }
  ```
