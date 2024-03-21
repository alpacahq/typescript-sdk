export type CreateBottleneckOptions = {
  tokensPerInterval: number;
  interval: number;
};

export function createBottleneck({
  tokensPerInterval,
  interval,
}: CreateBottleneckOptions) {
  let lastCheck = Date.now();
  let tokens = tokensPerInterval;

  function refill() {
    const now = Date.now();
    const delta = (now - lastCheck) / 1000;
    const refillTokens = delta * (tokensPerInterval / interval);

    tokens = Math.min(tokens + refillTokens, tokensPerInterval);
    lastCheck = now;
  }

  function consume(): boolean {
    refill();

    if (tokens >= 1) {
      tokens -= 1;
      return true;
    } else {
      return false;
    }
  }

  return { consume };
}
