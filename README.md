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
    - [Base URLs](#base-urls)
    - [Rate Limiting](#rate-limiting)
  - [REST](#rest)
    - [Methods](#methods)
      - [Trading](#trading)
      - [Market Data](#market-data)
    - [Tutorial](#tutorial)
  - [WebSocket](#websocket)
    - [How It Works](#how-it-works)
    - [Channels](#channels)
    - [Methods](#methods)
      - [Subscribe](#subscribe)
      - [Unsubscribe](#unsubscribe)
      - [Handle Messages](#handle-messages)
    - [Examples](#examples)
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

#### Methods

You may notice a pattern in the method names. This is consistent across all methods and mirrors the docs closely.

```ts
{version}.{resource}.{method}()
```

- `version` is the API version (ex. `v2`)
- `resource` is the REST resource (ex. `account`, `orders`, `assets`, etc.)
- `method` is the HTTP method (ex. `get`, `post`, `put`, `delete`, etc.)

Since the client is fully-typed 😁, you can use your IDE to explore the available methods and their parameters. The methods are also documented in the source code.

##### Trading

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

##### Market Data

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

#### Tutorial

Ready to start building 😁? Let's walk through creating a simple bot.

##### Requirements

- API key/secret or OAuth token from Alpaca
- Node.js (v14+) or Deno (v1.8+)
- TypeScript (v4+)

##### Step 1: Create a Client

First, create a client with your API key and secret. We'll use the paper trading environment for safety.

```ts
import { createClient } from "@alpacahq/typescript-sdk";

const client = createClient({
  key: "MY_API_KEY",
  secret: "MY_API_SECRET",
  baseURL: "https://paper-api.alpaca.markets",
});
```

##### Step 2: Get Account Information

Next, let's get some account information. This will tell us how much cash we have available to trade.

```ts
const account = await client.v2.account.get();
console.log(account);
```

You should see a response like this:

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "status": "ACTIVE",
  "currency": "USD",
  "cash": "100000",
  "buying_power": "100000",
  "cash_withdrawable": "100000",
  "portfolio_value": "0",
  "pattern_day_trader": false,
  "trading_blocked": false,
  "transfers_blocked": false
  // ...
}
```

##### Step 3: Place an Order

Now that we know how much cash we have, let's place an order. We'll buy 1 share of Apple (AAPL) at market price.

```ts
const order = await client.v2.orders.post({
  symbol: "AAPL",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "gtc",
});
console.log(order);
```

You should see a response like this:

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "client_order_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "created_at": "2021-06-01T00:00:00Z",
  "updated_at": "2021-06-01T00:00:00Z",
  "submitted_at": "2021-06-01T00:00:00Z",
  "filled_at": null,
  "expired_at": null,
  "canceled_at": null,
  "failed_at": null,
  "replaced_at": null,
  "replaced_by": null,
  "replaces": null,
  "asset_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "symbol": "AAPL",
  "asset_class": "us_equity",
  "qty": "1",
  "filled_qty": "0",
  "filled_avg_price": null,
  "order_class": "",
  "order_type": "market",
  "type": "market",
  "side": "buy",
  "time_in_force": "gtc",
  "limit_price": null,
  "stop_price": null,
  "status": "accepted",
  "extended_hours": false,
  "legs": null,
  "trail_price": null,
  "trail_percent": null,
  "hwm": null
}
```

##### Step 4: Check Order Status

Let's check the status of our order to see if it was filled.

```ts
const order = await client.v2.orders.get(
  "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
);

if (order.status === "filled") {
  console.log("Order filled!");
} else {
  console.log("Order pending...");
}
```

You should see a response like this:

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "client_order_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "created_at": "2021-06-01T00:00:00Z",
  "updated_at": "2021-06-01T00:00:00Z",
  "submitted_at": "2021-06-01T00:00:00Z",
  "filled_at": "2021-06-01T00:00:00Z",
  "expired_at": null,
  "canceled_at": null,
  "failed_at": null,
  "replaced_at": null,
  "replaced_by": null,
  "replaces": null,
  "asset_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "symbol": "AAPL",
  "asset_class": "us_equity",
  "qty": "1",
  "filled_qty": "1",
  "filled_avg_price": "100.00",
  "order_class": "",
  "order_type": "market",
  "type": "market",
  "side": "buy",
  "time_in_force": "gtc",
  "limit_price": null,
  "stop_price": null,
  "status": "filled",
  "extended_hours": false,
  "legs": null,
  "trail_price": null,
  "trail_percent": null,
  "hwm": null
}
```

##### Step 5: Sell the Stock

Finally, let's sell the stock we just bought. We'll sell 1 share of Apple (AAPL) at market price.

```ts
const order = await client.v2.orders.post({
  symbol: "AAPL",
  qty: 1,
  side: "sell",
  type: "market",
  time_in_force: "gtc",
});
console.log(order);
```

You should see a response like this:

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "client_order_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "created_at": "2021-06-01T00:00:00Z",
  "updated_at": "2021-06-01T00:00:00Z",
  "submitted_at": "2021-06-01T00:00:00Z",
  "filled_at": null,
  "expired_at": null,
  "canceled_at": null,
  "failed_at": null,
  "replaced_at": null,
  "replaced_by": null,
  "replaces": null,
  "asset_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "symbol": "AAPL",
  "asset_class": "us_equity",
  "qty": "1",
  "filled_qty": "0",
  "filled_avg_price": null,
  "order_class": "",
  "order_type": "market",
  "type": "market",
  "side": "sell",
  "time_in_force": "gtc",
  "limit_price": null,
  "stop_price": null,
  "status": "accepted",
  "extended_hours": false,
  "legs": null,
  "trail_price": null,
  "trail_percent": null,
  "hwm": null
}
```

##### Step 6: You're Done!

That's it! You've successfully created a simple bot that buys and sells a stock. You can expand on this by adding more complex logic, like technical indicators or machine learning models.

### WebSocket

#### How It Works

When you create a client with a WebSocket `baseURL` (`wss://`), a connection is automatically established. The SDK provides typed methods on the client for subscribing, unsubscribing, and handling messages. For advanced use cases, you can access the WebSocket client directly through the `_context.websocket` property.

#### Channels

todo

#### Methods

todo

#### Examples

todo

## Need Help?

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.

```

```
