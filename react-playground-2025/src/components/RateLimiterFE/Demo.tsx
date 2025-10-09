import { useEffect, useState } from "react";
import { useRateLimiter } from "../../hooks/useRateLimiter";

const mockUserKey = "mockUserTest";

const RateLimitFEDemo = () => {
  const [allowedCount, setAllowedCount] = useState(0);
  const [deniedCount, setDeniedCount] = useState(0);
  const [remainingTokens, setRemainingTokens] = useState(0);

  const { allowRequest, getRemainingTokens, resetLimiter } = useRateLimiter(2, 0.5);

  const isDisabled = remainingTokens < 1;

  useEffect(() => {
    setRemainingTokens(getRemainingTokens(mockUserKey));
    
    const triggers = setInterval(() => {
      setRemainingTokens(getRemainingTokens(mockUserKey));
    }, 100);

    return () => {
      clearInterval(triggers);
      resetLimiter();
    }
  }, [getRemainingTokens, resetLimiter]);

  const handleClick = () => {
    if (allowRequest(mockUserKey)) {
      setAllowedCount(prev => prev + 1);
      console.log("Succeeded to make a request");
    } else {
      setDeniedCount(prev => prev + 1);
      console.log("Failed to make a request ..");
    }
  }

  return (
    <div style={{
      padding: "20px"
    }}>
      <button
        onClick={handleClick}
        style={{
          background: isDisabled ? "red" : "green",
          cursor: isDisabled ? "now-allowed" : "pointer",
          border: "none",
          color: "white",
          padding: "20px"
        }}
      >
        {isDisabled ? "Disallow to request" : "Allow to request" }
      </button>
      {/* Statistic: Rate Limiter */}
      <div>
        <h3>Statistics: Rate Limiter</h3>
        <p style={{ color: "green" }}>Success Request Counter: {allowedCount}</p>
        <p style={{ color: "red" }}>Rate Limited Counter: {deniedCount}</p>
        <p style={{ color: "orange" }}>Remaining Tokens: {remainingTokens}</p>
      </div>
    </div>
  );
};

export default RateLimitFEDemo;
