import { Injectable } from '@angular/core';

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitState {
  count: number;
  resetTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class RateLimiterService {
  private limits = new Map<string, RateLimitState>();

  /**
   * Check if action is allowed under rate limit
   */
  isAllowed(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const state = this.limits.get(key);

    // No previous requests or window expired
    if (!state || now > state.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return true;
    }

    // Within window, check count
    if (state.count >= config.maxRequests) {
      return false;
    }

    // Increment count
    state.count++;
    return true;
  }

  /**
   * Get time remaining until rate limit resets (in seconds)
   */
  getTimeUntilReset(key: string): number {
    const state = this.limits.get(key);
    if (!state) return 0;

    const now = Date.now();
    if (now > state.resetTime) return 0;

    return Math.ceil((state.resetTime - now) / 1000);
  }

  /**
   * Get remaining requests in current window
   */
  getRemainingRequests(key: string, config: RateLimitConfig): number {
    const state = this.limits.get(key);
    if (!state) return config.maxRequests;

    const now = Date.now();
    if (now > state.resetTime) return config.maxRequests;

    return Math.max(0, config.maxRequests - state.count);
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.limits.delete(key);
  }
}
