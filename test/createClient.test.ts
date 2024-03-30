import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { assertEquals } from "https://deno.land/std@0.220.0/assert/assert_equals.ts";
import { assertThrows } from "https://deno.land/std@0.220.0/assert/assert_throws.ts";
import { createClient } from "../src/factory/createClient.ts";
import { mockFetch } from "../src/util/mockFetch.ts";

Deno.test(
  "createClient should create a trade client with valid options",
  () => {
    const client = createClient({
      baseURL: "https://paper-api.alpaca.markets",
      key: "EXAMPLE_KEY_ID",
      secret: "EXAMPLE_KEY_SECRET",
    });

    assert(client.v2.account !== undefined);
    assert(typeof client.v2.account.get === "function");
  }
);

Deno.test(
  "createClient should create a market data client with valid options",
  () => {
    const client = createClient({
      baseURL: "https://data.alpaca.markets",
      key: "EXAMPLE_KEY_ID",
      secret: "EXAMPLE_KEY_SECRET",
    });

    assert(client.v2.stocks !== undefined);
    assert(typeof client.v2.stocks.bars.get === "function");
  }
);

Deno.test("createClient should throw an error with an invalid base URL", () => {
  assertThrows(
    () =>
      createClient({
        // deno-lint-ignore ban-ts-comment
        // @ts-expect-error
        baseURL: "https://invalid-url.com",
        key: "EXAMPLE_KEY_ID",
        secret: "EXAMPLE_KEY_SECRET",
      }),
    Error,
    "Invalid base URL"
  );
});

Deno.test("createClient should use the provided token bucket options", () => {
  const tokenBucketOptions = {
    capacity: 100,
    fillRate: 2,
  };

  const client = createClient({
    baseURL: "https://paper-api.alpaca.markets",
    key: "EXAMPLE_KEY_ID",
    secret: "EXAMPLE_KEY_SECRET",
    tokenBucket: tokenBucketOptions,
  });

  assert(client._context.options.tokenBucket === tokenBucketOptions);
});

Deno.test(
  "createClient should use default token bucket options if not provided",
  () => {
    const client = createClient({
      baseURL: "https://paper-api.alpaca.markets",
      key: "EXAMPLE_KEY_ID",
      secret: "EXAMPLE_KEY_SECRET",
    });

    assert(client._context.options.tokenBucket === undefined);
  }
);

Deno.test(
  "createClient should make a request with the correct options",
  async () => {
    const mockResponse = { mock: "data" };
    const originalFetch = globalThis.fetch;

    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    globalThis.fetch = mockFetch(mockResponse);

    const client = createClient({
      baseURL: "https://paper-api.alpaca.markets",
      key: "EXAMPLE_KEY_ID",
      secret: "EXAMPLE_KEY_SECRET",
    });

    const response = await client._context.request<typeof mockResponse>({
      path: "/v2/account",
    });

    assertEquals(response, mockResponse);
    globalThis.fetch = originalFetch;
  }
);

Deno.test(
  "createClient should throttle requests based on token bucket",
  async () => {
    const mockResponse = { mock: "data" };
    const originalFetch = globalThis.fetch;

    // deno-lint-ignore ban-ts-comment
    // @ts-expect-error
    globalThis.fetch = mockFetch(mockResponse);

    const client = createClient({
      baseURL: "https://paper-api.alpaca.markets",
      key: "EXAMPLE_KEY_ID",
      secret: "EXAMPLE_KEY_SECRET",
      tokenBucket: {
        capacity: 2,
        fillRate: 1,
      },
    });

    const startTime = Date.now();

    await Promise.all([
      client._context.request({ path: "/v2/account" }),
      client._context.request({ path: "/v2/account" }),
      client._context.request({ path: "/v2/account" }),
    ]);

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    assert(elapsedTime >= 2000, "Requests should be throttled");
    globalThis.fetch = originalFetch;
  }
);
