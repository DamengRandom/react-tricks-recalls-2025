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
  return <div>
    <p>{useTransitionHookNote}</p>
    <DoubleDropdown />
    <RecursiveListDemo />
  </div>;
};

export default QA;
