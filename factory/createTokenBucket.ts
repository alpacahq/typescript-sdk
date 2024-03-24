/**
 * Token Bucket
 * @see https://en.wikipedia.org/wiki/Token_bucket
 * @param {Object} options - token bucket options
 * @param {number} options.capacity - maximum number of tokens
 * @param {number} options.fillRate - tokens per second
 */
export type TokenBucketOptions = {
  capacity: number;
  fillRate: number;
};

/**
 * Create a token bucket
 * @param {TokenBucketOptions} options - token bucket options
 * @returns {Object} token bucket
 * @returns {number} token bucket.tokens - current number of tokens
 * @returns {Function} token bucket.take - take tokens from the bucket
 * @example
 * const tokenBucket = createTokenBucket({ capacity: 200, fillRate: 3 });
 *
 * tokenBucket.take(10); // true
 * tokenBucket.take(200); // false
 *
 * console.log(tokenBucket.tokens); // 190
 */
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
