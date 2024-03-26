⚠️ **WORK IN PROGRESS: DO NOT USE; THIS IS NOT READY; THIS IS NOT PUBLISHED ON NPM; WILL BE READY BEFORE END OF MARCH**

# typescript-sdk

![version](https://img.shields.io/badge/dynamic/json?label=version&query=$[0].name&url=https://api.github.com/repos/alpacahq/typescript-sdk/tags&style=flat&color=FF33A0)
![code](https://img.shields.io/github/languages/code-size/alpacahq/typescript-sdk?style=flat&color=196DFF&label=code)
![test](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test.yaml?style=flat&label=test)
![coverage](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test_coverage.yaml?style=flat&label=coverage)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Features](#features)
- [Install](#install)
- [Usage](#getting-started)
  - [Create a Client](#create-a-client)
    - [Configuration](#configuration)
      - [Environments](#environments)
      - [Rate Limiting](#rate-limiting)
  - [REST](#rest)
    - [Example](#example)
    - [Convention](#convention)
  - [WebSocket](#websocket)
- [Need Help?](#need-help)

## Features

- [x] REST API
- [x] WebSocket Streams
- [x] Built-in Rate Limiting (Token Bucket)
- [x] TypeScript
- [x] Deno
- [x] Node (ESM)
- [x] > 25% Test Coverage (and growing)
- [x] Tree-shakable
- [x] Both ESM and CJS Support
- [x] Zero Dependencies 🤯 (you read that right)
- [x] Community Driven 🚀

Feel free to contribute and PR to your 💖's content.

## Install

While the SDK is developed with Deno, it can be used in Node as well. The SDK is published as an ESM package on NPM and Skypack.

From NPM:

```terminal
npm install @alpacahq/typescript-sdk
```

From Skypack (or any CDN that supports ESM):

```ts
import { createClient } from "https://cdn.skypack.dev/@alpacahq/typescript-sdk";
```

## Usage

### Create a Client

First, you'll need to create an API key on the Alpaca website. You can do that [here](https://app.alpaca.markets). Once you have an API key, you can use it to create a client. Using OAuth? Simply pass an `access_token` in the credentials object.

```ts
import { createClient } from "@alpacahq/typescript-sdk";

const client = createClient({
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
  // accessToken: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

### Configuration

#### Environments

The environment (paper or live) is determined by the API key you use. If you use a paper key, the client will make requests to the paper environment. If you use a live key, the client will make requests to the live environment. You can also specify the environment explicitly by passing the `baseURL` option to the `createClient` function.

```ts
baseURL: "https://paper-api.alpaca.markets",
```

#### Rate Limiting

You can customize the rate limiting by passing a `tokenBucket` object to the `createClient` function. This object should contain the `capacity` and `fillRate` for the rate limiter.

```ts
tokenBucket: {
  // Maximum number of tokens that can be stored
  capacity: 200,
  // Number of tokens refilled per second
  fillRate: 60,
}
```

Bursting is allowed, but the client will block requests if the token bucket is empty. The token bucket is shared across all requests. If you have multiple clients they will not share the same bucket.

### REST

#### Example

Below is an example of how to use the REST API.

```ts
const client = createClient({
  // ...
});

// not ready

// {
//   "id": "e6f8f4f3-3b6b-4b2f-8b2e-4b0e3b3d3e3e",
//   "account_number": "XXXXXXXXX",
//   "status": "ACTIVE",
//   "currency": "USD",
//   "cash": "1000000",
//   "cash_withdrawable": "1000000",
//   ...
// }
```

#### Convention

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

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
