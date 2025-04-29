import useLoggerMonitor, { LogData } from "../../hooks/useLoggerMonitor";

// This is a higher-order component that logs events when an attached component is clicked.

const withLoggingHoc = <Props extends object, Params extends LogData | string>(Component: React.ComponentType<Props>, params: Params) => {
  return (props: Props) => {
    const logEvent = useLoggerMonitor(params);

    return <Component {...props} onClick={logEvent} />;
  }
};

export default withLoggingHoc;
