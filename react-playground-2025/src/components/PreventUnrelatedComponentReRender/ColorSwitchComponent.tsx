import { useState } from "react";

const ColorSwitchComponent = () => {
  const [colorToggle, setColorToggle] = useState('red');

  const handleClick = () => {
    setColorToggle(colorToggle === 'red' ? 'blue' : 'red');
  }
  return (
    <>
      <h3 onClick={handleClick} style={{ color: colorToggle }}>Good Approach</h3>
      <p>This is good, because AnotherComponent is not going to be re-rendered even colorToggle state get changed.</p>
    </>
  );
};

export default ColorSwitchComponent;
