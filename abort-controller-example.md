# AbortController to clean up event listeners before component unmounts

## AbortController

AbortController is a built-in browser API that allows you to abort a fetch request or an event listener.


## Example

```tsx
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
```

## Example 2: for DB TRANSACTIONS - one of nodejs example

```js
// Simulated async DB insert function
function fakeDbInsert(data, { signal }) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      return reject(new Error('Aborted before start'));
    }

    const delay = Math.floor(Math.random() * 1000);

    const timeout = setTimeout(() => {
      // Simulate failure if data is "bad"
      if (data === 'fail') {
        reject(new Error('DB insert failed!'));
      } else {
        resolve(`Inserted: ${data}`);
      }
    }, delay);

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new Error(`Insert aborted for: ${data}`));
    });
  });
}

async function runTransaction() {
  const controller = new AbortController();
  const { signal } = controller;

  try {
    console.log('🚀 Starting transaction');

    const result1 = await fakeDbInsert('goodData', { signal });
    console.log(result1);

    const result2 = await fakeDbInsert('fail', { signal }); // This will fail
    console.log(result2);

    console.log('✅ Transaction complete');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.log('⛔ Aborting transaction...');
    controller.abort();
  }
}

runTransaction();
```

