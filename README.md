# typescript-sdk

![version](https://img.shields.io/github/package-json/v/alpacahq/typescript-sdk?color=196DFF&style=flat-square)
![code](https://img.shields.io/github/languages/code-size/alpacahq/typescript-sdk?color=F1A42E&style=flat-square&label=size)
![build](https://img.shields.io/github/workflow/status/alpacahq/typescript-sdk/test?style=flat-square)
![prettier](https://img.shields.io/static/v1?label=style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Install](#install)
- [Getting Started](#getting-started)
  - [REST](#rest)
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

### REST

For REST, you can use the `createClient` function. This function takes an API class and an options object. The options object should contain the `keyId` and `secretKey` for the API. The client will then have methods for each endpoint in the API.

```ts
import { API, createClient } from "@alpacahq/typescript-sdk";

// Create a client
const client = createClient(API.TRADE, {
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
});

// Use the client to make requests
// https://paper-api.alpaca.markets/v2/account GET
client.v2.account.get().then(console.log);
```

### WebSocket

For streaming, you can use the `createStream` function. This function takes a stream class and an options object. The options object should contain the `keyId` and `secretKey` for the API. The stream will then have methods for each endpoint in the API.

```ts
import { createStream } from "@alpacahq/typescript-sdk";

// Create a stream
const stream = createStream(TradeStream, {
  keyId: "YOUR_API_KEY_ID",
  secretKey,
});

// Use the stream to subscribe to events
stream.v2.account().subscribe(console.log);
```

### APIs and Streams

The SDK is split into two parts, APIs and Streams. The APIs are for making REST requests and the Streams are for subscribing to WebSocket events. Each API and Stream is a class that has methods for each endpoint in the API. The methods return a promise for the response of the request or a subscription to the event.

| API/Stream        | Reference                   |
| ----------------- | --------------------------- |
| `API.TRADE`       | https://docs.alpaca.markets |
| `API.MARKET_DATA` | https://docs.alpaca.markets |
