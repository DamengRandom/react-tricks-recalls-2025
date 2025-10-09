import { useCallback, useEffect, useRef } from "react";
import TokenBucketRateLimiter from "../utils/rateLimiter";

export const useRateLimiter = (capacity: number, refillRateInSeconds: number) => {
  const rateLimiterRef = useRef<TokenBucketRateLimiter>(null);

  useEffect(() => {
    rateLimiterRef.current = TokenBucketRateLimiter.getInstance(capacity, refillRateInSeconds);

    return () => {
      rateLimiterRef.current = null;
    }
  }, [capacity, refillRateInSeconds]);

  const allowRequest = useCallback((key: string) => {
    if (!rateLimiterRef.current) return false;

    return rateLimiterRef.current.allowRequest(key);
  }, []);

  const getRemainingTokens = useCallback((key: string) => {
    if (!rateLimiterRef.current) return 0;

    return rateLimiterRef.current.getRemainingTokens(key);
  }, []);

  const resetLimiter = useCallback(() => {
    if (!rateLimiterRef.current) return false;

    return rateLimiterRef.current.resetLimiter();
  }, []);

  return {
    allowRequest,
    getRemainingTokens,
    resetLimiter
  }
}