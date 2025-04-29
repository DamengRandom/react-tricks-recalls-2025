import { useEffect, useState } from "react";

const EventListenerEg = () => {
  const [eventTracker, setEventTracker] = useState('None');

  const handleClick = () => {
    setEventTracker('clicked');
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    window.addEventListener('load', () => {
      setEventTracker('loaded');
      console.log('Cutomized load code logic gets triggered ~');
    }, { signal });
    window.addEventListener('click', () => {
      setEventTracker('clicked');
      console.log('Cutomized click event code logic gets triggered ~');
    }, { signal });
    window.addEventListener('copy', () => {
      setEventTracker('copied');
      console.log('Cutomized copy code logic gets triggered ~');
    }, { signal });

    // As you can see from this code, the multiple event listeners can be aborted by just one line of code: controller.abort(); (How cool is that !!!!!!!!!!!!!)

    return () => {
      controller.abort();
    };
  }, [eventTracker]);

  return (
    <div>
      <button type="button" onClick={handleClick}>Start from click here ~</button>
      <p>
        We can load page, copy content, click any where on the page, and the related event listeners will get triggered. How cool is that !!!!!!!!!!!!!
      </p>
      <p>
        Current event tracker: <span style={{ color: 'green' }}>{eventTracker}</span>
      </p>
    </div>
  );
};

export default EventListenerEg;
