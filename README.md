# typescript-sdk

![version](https://img.shields.io/github/package-json/v/alpacahq/typescript-sdk?color=ff51bc&style=flat-square)
![size](https://img.shields.io/github/languages/code-size/alpacahq/typescript-sdk?style=flat-square&color=196DFF&label=size)
![test](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test.yaml?style=flat-square&label=test)
![coverage](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test_coverage.yaml?style=flat-square&label=coverage)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams. _Note: This project is still in development and may not be fully stable. Please report any issues you encounter._

- [Features](#features)
- [Install](#install)
- [Usage](#getting-started)
  - [Create a Client](#create-a-client)
    - [Configuration](#configuration)
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

### Configuration

#### Environments

The environment (paper or live) is determined by the API key you use. If you use a paper key, the client will make requests to the paper environment. If you use a live key, the client will make requests to the live environment. You can also specify the environment explicitly by passing the `baseURL` option to the `createClient` function.

```ts
// ...
baseURL: "https://paper-api.alpaca.markets",
```

#### Rate Limiting

You can customize the rate limiting by passing a `tokenBucket` object to the `createClient` function. This object should contain the `capacity` and `fillRate` for the rate limiter.

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

Below is an example of how to use the REST API methods.

```ts
const {
  rest: { trade },
} = createClient({
  // ...
});

await trade.v2.account.get();
await trade.v2.orders.get();
await trade.v2.orders.get("order_id");
await trade.v2.orders.get("order_id", true);
await trade.v2.orders.delete();
```

You may notice a pattern in the method names. This is consistent across all methods and mirrors the docs closely.

```ts
{version}.{resource}.{method}()
```

- `version` is the API version (ex. `v2`)
- `resource` is the REST resource (ex. `account`, `orders`, `assets`, etc.)
- `method` is the HTTP method (ex. `get`, `post`, `put`, `delete`, etc.)

Since the client is fully-typed 😁, you can use your IDE to explore the available methods and their parameters. The methods are also documented in the source code.

### WebSocket

Below is an example of how to use the WebSocket streams.

```ts
const {
  websocket: { account },
} = createClient({
  // ...
});

account.on("trade_updates", "new", (data) => {
  console.log("New Trade:", data);
});

(async () => {
  await account.subscribe([
    { channel: "trade_updates", symbols: ["AAPL", "MSFT"] },
  ]);

  console.log("Subscribed to trade updates.");
})();
```

Authentication is handled for you by the client on first subscription. The client will automatically reconnect if the connection is lost. If you want to manually reconnect, you can access the WebSocket instance directly.

## Need Help?

The primary maintainer of this project is (myself) [@117](https://github.com/117) 🫡. Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
