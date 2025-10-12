import DogTable from "../../components/DogTable";
import DoubleDropdown from "../../components/DoubleDropdown";
import RecursiveListDemo from "../../components/RecursiveListDemo";

const useTransitionHookNote = `
  useTransition is a hook that allows you to manage the transition state of a component.
  
  - Filtering large lists while typing
  - Switching tabs or routes where the new content is heavy
  - Rendering large components after a user action (but not immediately needed)
  - Search-as-you-type interfaces
`;

const QA = () => {
  return <>
    <p>{useTransitionHookNote}</p>
    <p>############################################################################</p>
    <DogTable />
    <p>############################################################################</p>
    <DoubleDropdown />
    <p>############################################################################</p>
    <RecursiveListDemo />
    <p>############################################################################</p>
  </>;
};

export default QA;
