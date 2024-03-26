export type TokenBucketOptions = {
  capacity: number;
  fillRate: number;
};

export const createTokenBucket = (
  { capacity, fillRate }: TokenBucketOptions = {
    capacity: 200,
    fillRate: 3,
  }
) => {
  // Initialize tokens and last fill time
  let tokens = capacity;

  // Initialize last fill time
  let lastFillTime = Date.now();

  return {
    tokens,
    take: (count: number) => {
      // Calculate time delta
      const now = Date.now();
      const delta = (now - lastFillTime) / 1000;

      // Update last fill time and tokens
      lastFillTime = now;
      tokens = Math.min(capacity, tokens + delta * fillRate);

      // Check if tokens are available and take them if so
      // Otherwise, return false
      return tokens >= count ? ((tokens -= count), true) : false;
    },
  };
};
