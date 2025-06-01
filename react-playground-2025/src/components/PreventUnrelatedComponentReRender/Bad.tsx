import { useState } from "react";
import AnotherComponent from "./AnotherComponent";

const BadApproach = () => {
  const [colorToggle, setColorToggle] = useState('red');

  const handleClick = () => {
    setColorToggle(colorToggle === 'red' ? 'blue' : 'red');
  }
  return (
    <>
      <h3 onClick={handleClick} style={{ color: colorToggle }}>Bad Approach</h3>
      <AnotherComponent />
      <p>This is bad, because AnotherComponent is not related to the colorToggle state. It will get re-rendered when colorToggle state get changed.</p>
    </>
  );
};

export default BadApproach;
