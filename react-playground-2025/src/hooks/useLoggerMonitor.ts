import { useEffect } from "react";
import logger from "../utils/logger";

export interface LogData {
  eventName: string;
  metadata?: Record<string, unknown>;
}

export function useLoggerMonitor(logData: LogData | string) {
  useEffect(() => {
    const eventName = typeof logData === 'string' ? logData : logData.eventName;
    const metadata = typeof logData === 'string' ? undefined : logData.metadata;
    
    logger.eventLog(eventName, metadata);
    
    return () => {
      if (typeof logData === 'string') {
        logger.eventLog(`${eventName}_unmount`);
      } else {
        logger.eventLog(`${eventName}_unmount`, metadata);
      }
    };
  }, []);
}

export default useLoggerMonitor;
