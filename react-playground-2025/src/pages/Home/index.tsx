import { lazy, Suspense, useState, useTransition } from "react";
import EventListenerEg from "../../components/AbortControllerEg/EventListenerEg";
import UseStatePassAsFn from "../../components/UseStatePassAsFn";

const Home = () => {
  const [togglePage, setPageToggle] = useState(false);
  const [isTransitioning, setTransition] = useTransition();

  const QAPageView = lazy(() => import('../QA'));
  const AboutPageView = lazy(() => import('../About'));

  return <>
    <UseStatePassAsFn />
    <EventListenerEg />
    <section>
      <button onClick={() => {
        setTransition(() => {
          setPageToggle(!togglePage);
        });
      }}>
        Toggle Page View {isTransitioning && <span style={{ marginLeft: '8px' }}>Transitioning...</span>}
      </button>
      
      <Suspense fallback={<div>Loading...</div>}>
        {togglePage ? <QAPageView /> : <AboutPageView />}
      </Suspense>
      
    </section>
  </>;
};

export default Home;
