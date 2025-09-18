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