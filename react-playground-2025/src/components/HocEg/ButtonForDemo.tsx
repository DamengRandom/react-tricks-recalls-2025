import withLoggingHoc from ".";

export const ButtonForDemo = () => {
  return <button>Trigger event log</button>;
};

const ButtonForDemoWithLogging = withLoggingHoc(ButtonForDemo, "ButtonEvent");

export default ButtonForDemoWithLogging;
