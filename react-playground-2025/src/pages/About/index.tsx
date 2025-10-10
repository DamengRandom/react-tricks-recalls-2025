import UseRefHookFnEg from "../../components/UseRefHookFnEg";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

const About = () => {
  const isOnline = useOnlineStatus();
  return <>
    <p>App is: {isOnline ? "Online 🟢" : "Offline 🔴"}</p>
    <UseRefHookFnEg />
  </>;
};

export default About;
