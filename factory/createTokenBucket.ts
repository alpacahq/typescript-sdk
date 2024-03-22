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
  let tokens = capacity;
  let lastFillTime = Date.now();

  return {
    take: (count: number) => {
      const now = Date.now();
      const delta = (now - lastFillTime) / 1000;
      lastFillTime = now;
      tokens = Math.min(capacity, tokens + delta * fillRate);
      if (tokens < count) {
        return false;
      }
      tokens -= count;
      return true;
    },
  };
};
