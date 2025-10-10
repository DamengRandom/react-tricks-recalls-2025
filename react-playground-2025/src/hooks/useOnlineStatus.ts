import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const statusTracker = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", statusTracker);
    window.addEventListener("offline", statusTracker);

    return () => {
      window.removeEventListener("online", statusTracker);
      window.removeEventListener("offline", statusTracker);
    }
  }, []);

  return isOnline;
}
