# React Interview Note 2025-09-17

## how to write own `useRouter`

- Knowledge points
  - `useContext`
  - `HOC`

- combination of `useContext` + `HOC` to make it work together

```tsx
import React, { useContext } from "react";

const NavContext = React.createContext<History | null>(null);
const navHistory = window.history;

const withRouter = <P extends object>(
  Component: React.ComponentType<P & { history: History | null }>
) => {
  const WithRouterComponent: React.FC<P> = (props) => {
    const history = useContext(NavContext);
    return <Component {...props} history={history} />;
  };

  return WithRouterComponent;
};

type ChildProps = { history: History | null };

const Child: React.FC<ChildProps> = ({ history }) => {
  return (
    <div>
      <button onClick={() => history?.pushState({}, "", "/hello")}>
        Go to hello
      </button>
    </div>
  );
};

const ChildRouter = withRouter(Child);

export default function OwnUseRouter() {
  return (
    <NavContext.Provider value={navHistory}>
      <ChildRouter />
    </NavContext.Provider>
  );
}
```

## React Router -> react-router-dom v6 APIs

- `Outlet`: render route related components code logics
- hook APIs:
  - `useNavigate()`: navigate to a new URL
  - `useLocation()`: get current location
  - `useParams()`: get route params
  - `useRoutes()`: get current route -> for dynamic route rendering

```tsx
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const News = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  console.log(id, pathname);
  return <h1>News {id}, path is {pathname}</h1>;
};

const User = () => {
  const nav = useNavigate();
  return <h1 onClick={() => nav("/news/1")}>Go to news 1</h1>;
};

const DynamicList = React.lazy(() => import('./list'));

const Menu = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/news">News</Link>
    <Link to="/user">User</Link>
  </div>
);

const MenuWithOutLet = () => (
  <div>
    <Menu />
    <Outlet />
    {/* Outlet is where we render the routes components ~ */}
  </div>
);

const routes = [
  {
    path: '/',
    element: <MenuWithOutLet />,
    children: [
      {
        path: '/news',
        element: <News />
      },
      {
        path: '/user',
        element: <User />
      },
      {
        path: '/list',
        element: <Suspense fallback={<div>loading...</div>}><DynamicList /></Suspense>
        // lazy loading for routes ~
      }
    ]
  }
];

const AppRoutes = () => useRoutes(routes);

export default function AppRouterDemo {
  
  return {
    <BrowserRouter>
      // <Routes>
      //   <Route path="/" element={<MenuWithOutLet />} />
      //   <Route path="/news/:id" element={<News />} />
      //   <Route path="/user" element={<User />} />
      // </Routes>
      <AppRoutes />
    </BrowserRouter>
  }
}
```

## Redux Middlware (eg: `redux-thunk` & `redux-saga`), how it works?

You could imagine there is an algorithm which call to run a function and pass result to next function, until all functions finished run

```js
// we have 3 functions: fn1, fn2, fn3
compose([fn1, fn2, fn3])(args);

fn1(fn2(fn3(args)))
```

Real code example:

```js
function compose(...funcs) {
  if (funcs.length === 0) return (arg) => arg;
  
  if (funcs.length === 1) return funcs[0];

  return funcs.reduce((acc, cur) => (...args) => acc(cur(...args)));
}

const fn1 = (...args) => {
  console.log('fn1 args', ...args);
  return 6;
}
const fn2 = (...args) => {
  console.log('fn2 args', ...args);
  return 5;
}
const fn3 = (...args) => {
  console.log('fn3 args', ...args);
  return 4;
}

compose(fn1, fn2, fn3)(1,2,3);
// The substential point: call functions one by one, one funciton pass result to next function until done ~
```
