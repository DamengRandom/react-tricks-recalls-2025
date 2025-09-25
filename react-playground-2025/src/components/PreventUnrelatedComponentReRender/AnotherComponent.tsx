import React from "react";

const AnotherComponent = React.memo(() => {
  console.log("AnotherComponent get re-rendered");
  return <div>AnotherComponent</div>;
});

export default AnotherComponent;
