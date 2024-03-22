# typescript-sdk
[![Deno Test](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml/badge.svg?branch=main)](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Install](#install)
- [Getting Started](#getting-started)
  - [REST](#rest)
    - [Rate Limiting](#rate-limiting)
  - [WebSocket](#websocket)
- [APIs and Streams](#apis-and-streams)
- [Methods](#methods)
  - [Account](#account)
  - [Asset](#asset)
  - [Calendar](#calendar)
  - [Clock](#clock)
  - [Order](#order)
  - [Position](#position)
  - [Watchlist](#watchlist)
- [Subscriptions](#subscriptions)
  - [Account](#account-1)
  - [Trade](#trade)
- [Need Help?](#need-help)

## Install

While this project is written in Deno/Typescript, it can be used in Node.js as well. This is the most common way to use it.

```sh
> npm install @alpacahq/typescript-sdk
```

If however, you are using Deno, you can do the following:

```sh
> deno install https://deno.land/x/typescript_sdk/mod.ts
```

## Getting Started

There are two ways to use this SDK, REST and WebSocket. Both are created using the `createClient` and `createStream` functions. These functions take an API class and an options object. The options object should contain the `keyId` and `secretKey` for the API. The client or stream will then have methods for each endpoint in the API.

### APIs and Streams

The SDK is split into two parts, APIs and Streams. The APIs are for making REST requests and the Streams are for subscribing to WebSocket events. Each API and Stream is a class that has methods for each endpoint in the API. The methods return a promise for the response of the request or a subscription to the event.

| API/Stream       | Reference                   |
| ---------------- | --------------------------- |
| `API.Trade`      | https://docs.alpaca.markets |
| `API.MarketData` | https://docs.alpaca.markets |
| `Stream.Trade`   | https://docs.alpaca.markets |
| `Stream.Account` | https://docs.alpaca.markets |

### REST

For REST, you can use the `createClient` function. This function takes an API class and an options object. The options object should contain the `keyId` and `secretKey` for the API. The client will then have methods for each endpoint in the API.

```ts
import { API, createClient } from "@alpacahq/typescript-sdk";

// Create a client
const client = createClient(API.Trade, {
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
});

// Use the client to make requests
// https://paper-api.alpaca.markets/v2/account GET
client.v2.account.get().then(console.log);
```

#### Rate Limiting

The client will automatically handle rate limiting. If you exceed the rate limit, the client will wait for the rate limit to reset and then make the request.

To customize the rate limiting, you can pass a `rateLimiterOptions` object to the `createClient` function. This object should contain the `tokensPerInterval` and `interval` for the rate limiter.

```ts
rateLimiterOptions: {
  tokensPerInterval: 1,
  interval: 1000,
}
```

### WebSocket

For streaming, you can use the `createStream` function. This function takes a stream class and an options object. The options object should contain the `keyId` and `secretKey` for the API. The stream will then have methods for each endpoint in the API.

```ts
import { createStream } from "@alpacahq/typescript-sdk";

// Create a stream
const stream = createStream(Stream.Trade, {
  keyId: "YOUR_API_KEY_ID",
  secretKey,
});

// Use the stream to subscribe to events
stream.v2.account().subscribe(console.log);
```

## Methods

Each API and Stream has methods for each endpoint in the API. The methods return a promise for the response of the request or a subscription to the event.

### Account

| Method                  | Reference                   |
| ----------------------- | --------------------------- |
| `get`                   | https://docs.alpaca.markets |
| `update`                | https://docs.alpaca.markets |
| `activities`            | https://docs.alpaca.markets |
| `portfolio`             | https://docs.alpaca.markets |
| `positions`             | https://docs.alpaca.markets |
| `orders`                | https://docs.alpaca.markets |
| `order`                 | https://docs.alpaca.markets |
| `cancelOrder`           | https://docs.alpaca.markets |
| `cancelOrders`          | https://docs.alpaca.markets |
| `closePosition`         | https://docs.alpaca.markets |
| `closePositions`        | https://docs.alpaca.markets |
| `watchlist`             | https://docs.alpaca.markets |
| `watchlists`            | https://docs.alpaca.markets |
| `watchlistAdd`          | https://docs.alpaca.markets |
| `watchlistRemove`       | https://docs.alpaca.markets |
| `watchlistUpdate`       | https://docs.alpaca.markets |
| `watchlistDelete`       | https://docs.alpaca.markets |
| `watchlistSymbols`      | https://docs.alpaca.markets |
| `watchlistSymbol`       | https://docs.alpaca.markets |
| `watchlistSymbolAdd`    | https://docs.alpaca.markets |
| `watchlistSymbolRemove` | https://docs.alpaca.markets |
| `watchlistSymbolUpdate` | https://docs.alpaca.markets |
| `watchlistSymbolDelete` | https://docs.alpaca.markets |

### Asset

| Method        | Reference                   |
| ------------- | --------------------------- |
| `get`         | https://docs.alpaca.markets |
| `getBySymbol` | https://docs.alpaca.markets |

## Subscriptions

Each Stream has methods for subscribing to events. The methods return a subscription to the event.

## Need Help?

meow
