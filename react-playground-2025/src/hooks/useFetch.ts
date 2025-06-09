// create my own react query just for some code level understanding purpose
import { useState, useEffect, useRef, useLayoutEffect } from "react";

export interface FetchOptions {
  url: string;
  onSuccess: (data: unknown) => void;
}

function useFetch(options: FetchOptions) {
  const [data, setData] = useState(null);
  const onSuccessRef = useRef(options.onSuccess); // add function to useRef hook to keep the function always use same memory address, which is immutable now.

  useLayoutEffect(() => { // Also, we can introduce useLayoutEffect hook and assign the options.onSuccess to onSuccessRef.current, which is immutable now.
    onSuccessRef.current = options.onSuccess;
  }, [options.onSuccess]);

  useEffect(() => {
    if (options?.url) {
      let isCancelled = false;
      fetch(options.url).then(res => res.json()).then((data) => {
        if (!isCancelled) {
          if(onSuccessRef.current) onSuccessRef.current(data);
          setData(data);
        }
      });

      return () => {
        isCancelled = true; // set the isCancelled to true to avoid the data to be set when the component is unmounted ...
      }
    }
  } , [options.url]); // The value inside dependency array better be permitive type values which are immutable !!!!
  
  // }, [getOptions.url, getOptions.onSuccess]); // (❌) because of onSuccess is a function which is also mutable, and everytime will generate as a new function, which uses different memory address, which causes re-rendering everytime ...
  // How to fix this issue? We introduce useRef hook to store keep that function always use same memory address, which is immutable now.

// } , [options]); 
// Tricky part explanation:
// (❌) Sometimes, if we don't use `useMemo` hook inside UserEffect index component `const { data } = useFetch(memoedOptions as { url: string });`, it causes infinite loop because options is reference type, which is mutable, which means it triggers the data to run every singel time ...
// precisely speaking, it compares the reference of options, not options contents, which always different memeory address, which means it will always trigger useEffect hook to run, never stopped...

// Thats why we need the deep compare, so we can deeply compare each element inside the options object ...

// Quick example:
// const deepCompare = (oldData: any, newData: any) => {
//   return oldData.length === newData.length && oldData.every((item: any, index: number) => item === newData[index]);
// }

// deepCompare(options, options); // deepCompare(['a', 1], ['a', 1]) // true

// const newObj = { a: 1, b: 2 };
// deepCompare([newObj], [newObj]); // true because of same memory address

// const newObjCopy = newObj;
// deepCompare([newObj], [newObjCopy]); // true because of same memory address

// But, if we do this:

// deepCompare([newObj], [{ a: 1, b: 2 }]); // false because of different memory address

// this is why useEffect better to use specific dependency, not object reference, because it will use different memeory address, which causes rendering infinite loop ...

  return {
    data,
  };
}

export default useFetch;
