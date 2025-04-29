import { useRef } from "react";
import AnotherUseRefHookFnExample from "./AnotherExample";
import ButtonForDemoWithLogging from "../HocEg/ButtonForDemo";
import QueryEg from "../QueryEg";

const UseRefHookFnEg = () => {
  const ref = useRef<HTMLParagraphElement>(null);

  const handleScrollDown = () => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: 'end', inline: 'nearest' });
  };

  return <div>
    <button onClick={handleScrollDown}>Scroll Down To Bottom</button>
    <div style={{ height: '300px', width: '100%' }}>
      <AnotherUseRefHookFnExample />
    </div>
    <div style={{ height: '300px', width: '100%' }}>
      <ButtonForDemoWithLogging />
    </div>
    <div style={{ height: '300px', width: '100%', overflow: 'scroll' }}><QueryEg /></div>
    <div style={{ height: '300px', width: '100%' }} ref={ref}>mock text content 6</div>
  </div>;
};

export default UseRefHookFnEg;
