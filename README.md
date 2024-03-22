# typescript-sdk

[![Deno Test](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml/badge.svg)](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml)
[![Deno Test Coverage](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test_coverage.yaml/badge.svg)](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test_coverage.yaml)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Features](#features)
- [Install](#install)
- [Usage](#getting-started)
  - [Create a Client](#create-a-client)
  - [Environments](#environments)
  - [Rate Limiting](#rate-limiting)
  - [REST](#rest)
  - [WebSocket](#websocket)
- [Need Help?](#need-help)

## Features

- [x] REST API
- [x] WebSocket Streams
- [x] Built-in Rate Limiting
- [x] TypeScript
- [x] Deno
- [x] Node
- [x] > 50% Test Coverage
- [x] Tree-shakable
- [x] ESM and CJS
- [x] Zero Dependencies 🤯 (you read that right)
- [x] Community Supported

Feel free to contribute and PR to your 💖's content.

## Install

From NPM:

```sh
> npm install @alpacahq/typescript-sdk
```

From Skypack (or any CDN that supports ESM):

```ts
import { createClient } from "https://cdn.skypack.dev/@alpacahq/typescript-sdk";
```

## Usage

### Create a Client

First, you'll need to create an API key on the Alpaca website. You can do that [here](https://app.alpaca.markets). Once you have an API key, you can use it to create a client.

```ts
import { createClient } from "@alpacahq/typescript-sdk";

const client = createClient({
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
});
```

### Environments

The environment (paper or live) is determined by the API key you use. If you use a paper key, the client will make requests to the paper environment. If you use a live key, the client will make requests to the live environment. You can also specify the environment explicitly by passing the `baseURL` option to the `createClient` function.

```ts
// ...
baseURL: "https://paper-api.alpaca.markets",
```

### Rate Limiting

You can also customize the rate limiting by passing a `tokenBucket` object to the `createClient` function. This object should contain the `capacity` and `fillRate` for the rate limiter.

```ts
// ...
tokenBucket: {
  // Maximum number of tokens that can be stored
  capacity: 200,
  // Number of tokens refilled per second
  fillRate: 60,
}
```

Bursting is allowed, but the client will block requests if the token bucket is empty. The token bucket is shared across all requests. If you have multiple clients they will not share the same token bucket.

### REST

Below are some examples of how to use the REST API methods.

```ts
const {
  REST: { trade, marketData },
} = createClient({
  // ...
});

// Trade API
await trade.v2.account.get();
await trade.v2.orders.get();
await trade.v2.orders.get("order_id");
await trade.v2.orders.get("order_id", true);
await trade.v2.orders.delete();

// Market Data API
await marketData.v2.assets.get();
await marketData.v2.assets.get("symbol_or_asset_id");
await marketData.v2.bars.get("symbol", { start: new Date(), end: new Date() });
await marketData.v2.lastTrade.get("symbol");
await marketData.v2.lastQuote.get("symbol");
```

You may notice a pattern in the method names. This pattern is consistent across all REST API methods and mirrors the docs closely.

```ts
{version}.{resource}.{method}()
```

- `version` is the API version (e.g. `v2`)
- `resource` is the REST resource (e.g. `account`, `orders`, `assets`, etc.)
- `method` is the HTTP method (e.g. `get`, `post`, `put`, `delete`)

Since the client is fully-typed 😁, you can use your IDE to explore the available methods and their parameters. The methods are also documented in the source code.

### WebSocket

## Need Help?

The primary maintainer of this project is (myself) [@117](https://github.com/117) 🫡. Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
