// import BadApproach from "../../components/PreventUnrelatedComponentReRender/Bad";
import GoodApproach from "../../components/PreventUnrelatedComponentReRender/Good";
import QuickTable from "../../components/QuickTable";
import RateLimitFEDemo from "../../components/RateLimiterFE/Demo";

const Settings = () => {
  // return <BadApproach />;
  return <>
    <GoodApproach />
    <QuickTable />
    <RateLimitFEDemo />
  </>;
};

export default Settings;
