# typescript-sdk

![version](https://img.shields.io/badge/dynamic/json?label=version&query=$[0].name&url=https://api.github.com/repos/alpacahq/typescript-sdk/tags&style=flat&color=FF33A0)
![code](https://img.shields.io/github/languages/code-size/alpacahq/typescript-sdk?style=flat&color=196DFF&label=code)
![test](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test.yml?style=flat&label=test)
![coverage](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_test_coverage.yml?style=flat&label=coverage)
![build](https://img.shields.io/github/actions/workflow/status/alpacahq/typescript-sdk/deno_deploy.yml?style=flat&label=deploy)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Features](#features)
- [Install](#install)
- [Usage](#getting-started)
  - [Create a Client](#create-a-client)
  - [Configuration](#configuration)
    - [Base URLs](#base-urls)
    - [Rate Limiting](#rate-limiting)
  - [REST](#rest)
    - [How It Works](#how-it-works)
    - [Methods](#methods)
    - [Examples](#example)
      - [Account](#account)
      - [Orders](#orders)
      - [Assets](#assets)
      - [Market Data](#market-data)
  - [WebSocket](#websocket)
    - [How It Works](#how-it-works)
    - [Channels](#channels)
    - [Examples](#examples)
      - [Subscribe](#subscribe)
      - [Unsubscribe](#unsubscribe)
      - [Handle Messages](#handle-messages)
  - [Need Help?](#need-help)

## Features

- [x] REST API
- [x] WebSocket Streams
- [x] Built-in Rate Limiting (Token Bucket)
- [x] TypeScript
- [x] Deno
- [x] Node (ESM)
- [x] > 35% Test Coverage (and growing)
- [x] Tree-shakable
- [x] Both ESM and CJS Support
- [x] Zero Dependencies 🤯 (you read that right)
- [x] Community Driven 🚀

Feel free to contribute and PR to your 💖's content.

## Install

> 🚧 **WARNING** 🚧  
> This SDK is currently in development and not yet stable. The API may change. Please report any issues you find. Thank you! 🙏 When the version number loses the `-preview` suffix, the SDK is ready for production use.

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
baseURL: "https://paper-api.alpaca.markets",
```

Here are the possible `baseURL` values:

| URL                                        | Type               |
| :----------------------------------------- | :----------------- |
| `https://api.alpaca.markets`               | REST               |
| `https://paper-api.alpaca.markets`         | REST               |
| `https://data.alpaca.markets`              | REST               |
| `wss://api.alpaca.markets/stream`          | WebSocket (binary) |
| `wss://paper-api.alpaca.markets/stream`    | WebSocket (binary) |
| `wss://data.alpaca.markets/stream`         | WebSocket (JSON)   |
| `wss://stream.data.alpaca.markets/v2/test` | WebSocket (JSON)   |

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

#### How It Works

The methods are named to reflect the structure of their API paths.

```ts
{version}.{resource}.{method}()
```

- `version` is the API version (ex. `v2`)
- `resource` is the REST resource (ex. `account`, `orders`, `assets`, etc.)
- `method` is the HTTP method (ex. `get`, `post`, `put`, `delete`, etc.)

Since the client is fully-typed 😁, you can use your IDE to explore the available methods and their parameters. They are also documented below.

#### Methods

These are available on `api` and `paper-api` `baseURL`'s:

| Path                                 | Method(s)                        |
| :----------------------------------- | :------------------------------- |
| `v2.account`                         | `get`                            |
| `v2.account.portfolio.history`       | `get`                            |
| `v2.account.configurations`          | `get`, `patch`                   |
| `v2.account.activities`              | `get`                            |
| `v2.orders`                          | `get`, `post`, `patch`, `delete` |
| `v2.positions`                       | `get`, `delete`                  |
| `v2.positions.exercise`              | `post`                           |
| `v2.watchlists`                      | `get`, `post`, `patch`, `delete` |
| `v2.calendar`                        | `get`                            |
| `v2.clock`                           | `get`                            |
| `v2.assets`                          | `get`                            |
| `v2.options.contracts`               | `get`                            |
| `v2.corporate_actions.announcements` | `get`                            |
| `v2.wallets`                         | `get`                            |
| `v2.wallets.whitelists`              | `get`, `post`, `delete`          |
| `v2.wallets.fees.estimate`           | `get`                            |
| `v2.wallets.transfers`               | `get`, `post`, `delete`          |

These are available on the `https://data.alpaca.markets` `baseURL`:

| Path                                   | Method(s) |
| :------------------------------------- | :-------- |
| `v1beta1.corporate_actions`            | `get`     |
| `v1beta1.forex.latest.rates`           | `get`     |
| `v1beta1.forex.rates`                  | `get`     |
| `v1beta1.logos`                        | `get`     |
| `v1beta1.news`                         | `get`     |
| `v1beta1.options.bars`                 | `get`     |
| `v1beta1.options.meta.exchanges`       | `get`     |
| `v1beta1.options.quotes.latest`        | `get`     |
| `v1beta1.options.trades.latest`        | `get`     |
| `v1beta1.options.trades`               | `get`     |
| `v1beta1.options.snapshots`            | `get`     |
| `v1beta1.screener.stocks.most_actives` | `get`     |
| `v1beta1.screener.movers`              | `get`     |
| `v1beta3.crypto.bars`                  | `get`     |
| `v1beta3.crypto.latest.bars`           | `get`     |
| `v1beta3.crypto.latest.orderbooks`     | `get`     |
| `v1beta3.crypto.latest.quotes`         | `get`     |
| `v1beta3.crypto.latest.trades`         | `get`     |
| `v1beta3.crypto.quotes`                | `get`     |
| `v1beta3.crypto.snapshots`             | `get`     |
| `v1beta3.crypto.trades`                | `get`     |
| `v2.stocks.auctions`                   | `get`     |
| `v2.stocks.bars`                       | `get`     |
| `v2.stocks.bars.latest`                | `get`     |
| `v2.stocks.meta.conditions`            | `get`     |
| `v2.stocks.meta.exchanges`             | `get`     |
| `v2.stocks.meta.quotes`                | `get`     |
| `v2.stocks.snapshots`                  | `get`     |
| `v2.stocks.trades`                     | `get`     |
| `v2.stocks.trades.latest`              | `get`     |

### WebSocket

#### How It Works

When you create a client with a WebSocket `baseURL` (`wss://`), a connection is automatically established. The SDK provides typed methods on the client for subscribing, unsubscribing, and handling messages. For advanced use cases, you can access the WebSocket client directly through the `_context.websocket` property.

#### Channels

todo

#### Examples

todo

## Need Help?

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
