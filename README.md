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

### Methods

- [getAccount](#getaccount)
- [createOrder](#createorder)
- [getOrders](#getorders)
- [getOrder](#getorder)
- [replaceOrder](#replaceorder)
- [cancelOrders](#cancelorders)
- [cancelOrder](#cancelorder)
- [getPositions](#getpositions)
- [getPosition](#getposition)
- [closePositions](#closepositions)
- [closePosition](#closeposition)
- [exerciseOption](#exerciseoption)
- [getMarketCalendar](#getmarketcalendar)
- [getMarketClock](#getmarketclock)
- [getAssets](#getassets)
- [getAsset](#getasset)
- [getOptionsContracts](#getoptionscontracts)
- [getOptionsContract](#getoptionscontract)
- [getCorporateActionsAnnouncements](#getcorporateactionsannouncements)
- [getCorporateActionsAnnouncement](#getcorporateactionsannouncement)
- [getWatchlists](#getwatchlists)
- [getWatchlist](#getwatchlist)
- [createWatchlist](#createwatchlist)
- [updateWatchlist](#updatewatchlist)
- [deleteWatchlist](#deletewatchlist)
- [getPortfolioHistory](#getportfoliohistory)
- [getAccountConfigurations](#getaccountconfigurations)
- [updateAccountConfigurations](#updateaccountconfigurations)
- [getAccountActivities](#getaccountactivities)
- [getAccountActivity](#getaccountactivity)
- [getWallets](#getwallets)
- [getWallet](#getwallet)
- [getFeeEstimate](#getfeeestimate)
- [getTransfers](#gettransfers)
- [getTransfer](#gettransfer)
- [createTransfer](#createtransfer)
- [getWhitelists](#getwhitelists)
- [createWhitelist](#createwhitelist)
- [removeWhitelist](#removewhitelist)

##### Get Account

```typescript
client.getAccount().then(console.log);
```

##### Create Order

```typescript
const options: CreateOrderOptions = {
  symbol: "AAPL",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "day",
};

client.createOrder(options).then(console.log);
```

##### Get Orders

```typescript
const options: GetOrdersOptions = {
  status: "open",
  limit: 10,
};

client.getOrders(options).then(console.log);
```

##### Get Order

```typescript
const options: GetOrderOptions = {
  order_id: "123abc",
};

client.getOrder(options).then(console.log);
```

##### Replace Order

```typescript
const options: ReplaceOrderOptions = {
  order_id: "123abc",
  qty: 2,
  limit_price: 150,
};

client.replaceOrder(options).then(console.log);
```

##### Cancel Orders

```typescript
client.cancelOrders().then(console.log);
```

##### Cancel Order

```typescript
const options: CancelOrderOptions = {
  order_id: "123abc",
};

client.cancelOrder(options).then(console.log);
```

##### Get Positions

```typescript
client.getPositions().then(console.log);
```

##### Get Position

```typescript
const options: GetPositionOptions = {
  symbol_or_asset_id: "AAPL",
};

client.getPosition(options).then(console.log);
```

##### Close Positions

```typescript
client.closePositions().then(console.log);
```

##### Close Position

```typescript
const options: ClosePositionOptions = {
  symbol_or_asset_id: "AAPL",
};

client.closePosition(options).then(console.log);
```

##### Exercise Option

```typescript
const option: ExerciseOption = {
  symbol_or_contract_id: "AAPL230623C00130000",
};

client.exerciseOption(option).then(console.log);
```

##### Get Market Calendar

```typescript
const options: GetCalendarOptions = {
  start: "2023-01-01",
  end: "2023-12-31",
};

client.getMarketCalendar(options).then(console.log);
```

##### Get Market Clock

```typescript
client.getMarketClock().then(console.log);
```

##### Get Assets

```typescript
const options: GetAssetsOptions = {
  status: "active",
  asset_class: "us_equity",
};

client.getAssets(options).then(console.log);
```

##### Get Asset

```typescript
const options: GetAssetOptions = {
  symbol_or_asset_id: "AAPL",
};

client.getAsset(options).then(console.log);
```

##### Get Options Contracts

```typescript
const options: GetOptionsContractsOptions = {
  underlying_symbols: "AAPL",
  expiration_date_gte: "2023-06-01",
  expiration_date_lte: "2023-06-30",
};

client.getOptionsContracts(options).then(console.log);
```

##### Get Options Contract

```typescript
const options: GetOptionsContractOptions = {
  symbol_or_contract_id: "AAPL230623C00130000",
};

client.getOptionsContract(options).then(console.log);
```

##### Get Corporate Actions Announcements

```typescript
const options: GetCorporateActionsAnnouncementsOptions = {
  ca_types: "dividend",
  since: "2023-01-01",
  until: "2023-12-31",
};

client.getCorporateActionsAnnouncements(options).then(console.log);
```

##### Get Corporate Actions Announcement

```typescript
const options: GetCorporateActionsAnnouncementOptions = {
  id: "123abc",
};

client.getCorporateActionsAnnouncement(options).then(console.log);
```

##### Get Watchlists

```typescript
client.getWatchlists().then(console.log);
```

##### Get Watchlist

```typescript
const options: GetWatchlistOptions = {
  watchlist_id: "123abc",
};

client.getWatchlist(options).then(console.log);
```

##### Create Watchlist

```typescript
const options: CreateWatchlistOptions = {
  name: "My Watchlist",
  symbols: ["AAPL", "AMZN", "GOOG"],
};

client.createWatchlist(options).then(console.log);
```

##### Update Watchlist

```typescript
const options: UpdateWatchlistOptions = {
  watchlist_id: "123abc",
  name: "Updated Watchlist",
  symbols: ["AAPL", "MSFT"],
};

client.updateWatchlist(options).then(console.log);
```

##### Delete Watchlist

```typescript
const options: DeleteWatchlistOptions = {
  watchlist_id: "123abc",
};

client.deleteWatchlist(options).then(console.log);
```

##### Get Portfolio History

```typescript
const options: GetPortfolioHistoryOptions = {
  period: "1M",
  timeframe: "1D",
};

client.getPortfolioHistory(options).then(console.log);
```

##### Get Account Configurations

```typescript
client.getAccountConfigurations().then(console.log);
```

##### Update Account Configurations

```typescript
const options: UpdateAccountConfigurationsOptions = {
  dtbp_check: "both",
  no_shorting: true,
};

client.updateAccountConfigurations(options).then(console.log);
```

##### Get Account Activities

```typescript
client.getAccountActivities().then(console.log);
```

##### Get Account Activity

```typescript
const options: GetAccountActivityOptions = {
  activity_type: "FILL",
};

client.getAccountActivity(options).then(console.log);
```

##### Get Wallets

```typescript
client.getWallets().then(console.log);
```

##### Get Wallet

```typescript
const options: GetWalletOptions = {
  asset: "BTC",
};

client.getWallet(options).then(console.log);
```

##### Get Fee Estimate

```typescript
const options: GetFeeEstimateOptions = {
  asset: "BTC",
  from_address: "abc123",
  to_address: "def456",
  amount: "0.1",
};

client.getFeeEstimate(options).then(console.log);
```

##### Get Transfers

```typescript
const options: GetTransfersOptions = {
  asset: "BTC",
};

client.getTransfers(options).then(console.log);
```

##### Get Transfer

```typescript
const options: GetTransferOptions = {
  transfer_id: "123abc",
};

client.getTransfer(options).then(console.log);
```

##### Create Transfer

```typescript
const options: CreateTransferOptions = {
  asset: "BTC",
  amount: "0.1",
  address: "abc123",
};

client.createTransfer(options).then(console.log);
```

##### Get Whitelists

```typescript
const options: GetWhitelistsOptions = {
  asset: "BTC",
  address: "abc123",
};

client.getWhitelists(options).then(console.log);
```

##### Create Whitelist

```typescript
const options: CreateWhitelistOptions = {
  asset: "BTC",
  address: "abc123",
};

client.createWhitelist(options).then(console.log);
```

##### Remove Whitelist

```typescript
const options: RemoveWhitelistOptions = {
  whitelisted_address_id: "123abc",
};

client.removeWhitelist(options).then(console.log);
```

### WebSocket

#### How It Works

When you create a client with a WebSocket `baseURL` (`wss://`), a connection is automatically established. The SDK provides typed methods on the client for subscribing, unsubscribing, and handling messages. For advanced use cases, you can access the WebSocket client directly through the `_context.websocket` property.

#### Channels

todo

#### Examples

todo

## Need Help?

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
