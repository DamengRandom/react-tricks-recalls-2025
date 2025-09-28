# React Lazy Loading


## Basic Concept

Lazy loading is a technique that allows you to `load a component only when it is needed`. This can help improve the performance of your application by reducing the initial load time and the amount of code that needs to be downloaded.


## How to use

```tsx
import { lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

Sometimes could use useTransition hook to handle the large component switching & rendering.

```tsx
import { lazy, Suspense, useState, useTransition } from "react";
import EventListenerEg from "../../components/AbortControllerEg/EventListenerEg";
import UseStatePassAsFn from "../../components/UseStatePassAsFn";

const Home = () => {
  const [togglePage, setPageToggle] = useState(false);
  const [isTransitioning, setTransition] = useTransition();

  const QAPageView = lazy(() => import('../QA'));
  const AboutPageView = lazy(() => import('../About'));
  const handlePageToggle = () => {
    setTransition(() => {
      setPageToggle(!togglePage);
    });
  };

  return <>
    <UseStatePassAsFn />
    <EventListenerEg />
    <section>
      <button onClick={handlePageToggle}>
        Toggle Page View
        {isTransitioning && <span className="transition-state">Transitioning...</span>}
      </button>
      
      <Suspense fallback={<div>Loading...</div>}>
        {togglePage ? <QAPageView /> : <AboutPageView />}
      </Suspense> 
    </section>
  </>;
};

export default Home;
```

useTransition is a hook that allows you to manage the transition state of a component.
  
  - Filtering large lists while typing
  - Switching tabs or routes where the new content is heavy
  - Rendering large components after a user action (but not immediately needed)
  - Search-as-you-type interfaces