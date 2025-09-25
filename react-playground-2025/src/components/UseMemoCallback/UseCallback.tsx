// assuming an api call

import { useCallback, useEffect } from "react";

const UseCallbackDemo = () => {
  const fetchUser = useCallback(async(userId: string) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.json();
  }, [])

  useEffect(() => {
    fetchUser('1').then(user => {
      console.log(user);
    });
  }, [fetchUser]);

  return <div>
    <p>useCallback - Function (reference)	Avoid recreating the same function every render</p>
  </div>
};

export default UseCallbackDemo;