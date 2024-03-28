⚠️ **ALMOST READY; RELEASES THIS WEEK** ⚠️

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

First, you'll need to create an API key on the Alpaca website. You can do that [here](https://app.alpaca.markets). Once you have an API key, you can use it to create a client.

```ts
import { createClient } from "@alpacahq/typescript-sdk";

const client = createClient({
  key: "YOUR_API_KEY_ID",
  secret: "YOUR_API_SECRET_KEY",
  // Or, provide an access token if you're using OAuth.
  // token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

You can also use the `ALPACA_KEY` and `ALPACA_SECRET` environment variables to set your API key and secret. The client will automatically use these values if they are set. They will not override any credentials explicitly passed to `createClient`.

### Configuration

#### Base URLs

By default, the client will make requests to the paper trading environment (`https://paper-api.alpaca.markets`). This is a safety measure to prevent accidental trades.

You can change this by passing the `baseURL` option to the `createClient` function. Depending on the environment, you may need to use a different API key. Types will be inferred based on the base URL you provide.

```ts
{
  // ...
  baseURL: "https://paper-api.alpaca.markets",
}
```

The possible values for `baseURL` are:

| URL                                        | Environment | Type               |
| :----------------------------------------- | :---------- | :----------------- |
| `https://api.alpaca.markets`               | Live        | REST               |
| `https://paper-api.alpaca.markets`         | Paper       | REST               |
| `https://data.alpaca.markets`              | Data        | REST               |
| `wss://api.alpaca.markets/stream`          | Live        | WebSocket (binary) |
| `wss://paper-api.alpaca.markets/stream`    | Paper       | WebSocket (binary) |
| `wss://data.alpaca.markets/stream`         | Data        | WebSocket (JSON)   |
| `wss://stream.data.alpaca.markets/v2/test` | Data        | WebSocket (JSON)   |

> Note: When you create a client with a WebSocket URL (`wss://`), a connection is automatically established. The SDK provides typed methods on the client for subscribing, unsubscribing, and handling messages. For advanced use cases, you can access the WebSocket client directly through the `_context.websocket` property.

#### Rate Limiting

You can customize the rate limiting by passing a `tokenBucket` object to the `createClient` function. This object should contain the `capacity` and `fillRate` for the rate limiter.

```ts
{
  // ...
  tokenBucket: {
    // Maximum number of tokens that can be stored
    capacity: 200,
    // Number of tokens refilled per second
    fillRate: 60,
  },
}
```

Bursting is allowed, but the client will block requests if the token bucket is empty. The token bucket is shared across all requests. If you have multiple clients they will not share the same bucket.

### REST

#### Convention

You may notice a pattern in the method names. This is consistent across all methods and mirrors the docs closely.

```ts
{version}.{resource}.{method}()
```

- `version` is the API version (ex. `v2`)
- `resource` is the REST resource (ex. `account`, `orders`, `assets`, etc.)
- `method` is the HTTP method (ex. `get`, `post`, `put`, `delete`, etc.)

Since the client is fully-typed 😁, you can use your IDE to explore the available methods and their parameters. The methods are also documented in the source code.

#### Examples

todo

### WebSocket

#### Examples

todo

## Need Help?

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
