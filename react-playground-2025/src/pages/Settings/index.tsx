// import BadApproach from "../../components/PreventUnrelatedComponentReRender/Bad";
import GoodApproach from "../../components/PreventUnrelatedComponentReRender/Good";
import QuickTable from "../../components/QuickTable";

const Settings = () => {
  // return <BadApproach />;
  return <>
    <GoodApproach />
    <QuickTable />
  </>;
};

export default Settings;
