export default class TokenBucketRateLimiter {
  private capacity: number;
  private refillRate: number;
  private tokensAmount: Map<string, number>;
  private lastRefillTime: Map<string, number>;
  private static instance: TokenBucketRateLimiter;

  constructor(capacity: number, refillRateInSeconds: number) {
    this.capacity = capacity;
    this.refillRate = refillRateInSeconds;
    this.tokensAmount = new Map();
    this.lastRefillTime = new Map();
  }

  static getInstance(capacity: number, refillRateInSeconds: number) {
    if (!TokenBucketRateLimiter.instance) {
      TokenBucketRateLimiter.instance = new TokenBucketRateLimiter(capacity, refillRateInSeconds);
    }

    return TokenBucketRateLimiter.instance;
  }

  private _refill(key: string) {
    const now = Date.now();
    const last = this.lastRefillTime.get(key) || now;
    const elapasedSeconds = (now - last) / 1000;

    const tokensToAdd = elapasedSeconds * this.refillRate;
    const currentTokensAmount = Math.min(this.capacity, (this.tokensAmount.get(key) || this.capacity) + tokensToAdd);

    this.tokensAmount.set(key, currentTokensAmount);
    this.lastRefillTime.set(key, now);
  }

  allowRequest(key: string): boolean {
    this._refill(key);

    const lastTokensAmount = this.tokensAmount.get(key) || 0;

    if (lastTokensAmount < 1) return false;

    this.tokensAmount.set(key, lastTokensAmount - 1);
    
    return true;
  }

  getRemainingTokens(key: string) {
    this._refill(key);

    return this.tokensAmount.get(key) || 0;
  }

  resetLimiter() {
    this.tokensAmount.clear();
    this.lastRefillTime.clear();
  }
}