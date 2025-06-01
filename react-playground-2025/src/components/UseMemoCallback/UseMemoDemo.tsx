import { useMemo } from "react";

const UseMemoDemo = () => {
  const complexCalculationResult = useMemo(() => {
    console.log('complexCalculation');
    let result = 0;
    // complex calculation
    for (let i = 0; i < 1000000000; i++) { // just an example of when facing complex calculation, we need to use useMemo hook
      result += i;
    }

    return result;
  }, []);
  
  return <div>
    <p>useMemo - Value (computed result) Avoid recalculating expensive values</p>
    <p>{complexCalculationResult}</p>
  </div>
};

export default UseMemoDemo;
