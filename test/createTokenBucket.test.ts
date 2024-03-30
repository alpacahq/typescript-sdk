import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { createTokenBucket } from "../src/factory/createTokenBucket.ts";

Deno.test(
  "createTokenBucket should allow taking tokens within capacity",
  () => {
    const tokenBucket = createTokenBucket({
      capacity: 200,
      fillRate: 3,
    });

    assert(tokenBucket.take(50) === true);
  }
);

Deno.test(
  "createTokenBucket should reject taking tokens beyond capacity",
  () => {
    const tokenBucket = createTokenBucket({
      capacity: 200,
      fillRate: 3,
    });

    assert(tokenBucket.take(300) === false);
  }
);

Deno.test(
  "createTokenBucket should refill tokens based on fill rate",
  async () => {
    const tokenBucket = createTokenBucket({
      capacity: 200,
      fillRate: 3,
    });

    tokenBucket.take(50);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    assert(tokenBucket.take(50) === true);
  }
);

Deno.test(
  "createTokenBucket should support 200 requests per 60 seconds",
  () => {
    const tokenBucket = createTokenBucket({ capacity: 200, fillRate: 3 });

    let successfulRequests = 0;

    for (let i = 0; i < 200; i++) {
      if (tokenBucket.take(1)) {
        successfulRequests++;
      }
    }

    assert(successfulRequests === 200);
  }
);
