import AnotherComponent from "./AnotherComponent";
import ColorSwitchComponent from "./ColorSwitchComponent";

const GoodApproach = () => {
  return (
    <>
      <ColorSwitchComponent />
      <AnotherComponent />
      <p>Please always separate the code logic for related components, keep it inside its own component scope, specially for state value change handling.</p>
    </>
  );
};

export default GoodApproach;
