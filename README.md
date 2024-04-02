> 🚧 **WARNING** 🚧  
> This SDK is currently in development and not yet stable. The API may change. Please report any issues you find. Thank you! 🙏 When the version number loses the `-preview` suffix, the SDK is ready for production use. You can track progress and join the discussion [here](https://github.com/alpacahq/typescript-sdk/issues/1) 😃.

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
  - [Methods](#methods)
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

### Methods

#### Trading API

- [getAccount](#getaccount)
- [createOrder](#createorder)
- [getOrder](#getorder)
- [getOrders](#getorders)
- [replaceOrder](#replaceorder)
- [cancelOrder](#cancelorder)
- [cancelOrders](#cancelorders)
- [getPosition](#getposition)
- [getPositions](#getpositions)
- [closePosition](#closeposition)
- [closePositions](#closepositions)
- [exerciseOption](#exerciseoption)
- [getCalendar](#getcalendar)
- [getClock](#getclock)
- [getAsset](#getasset)
- [getAssets](#getassets)
- [getWatchlist](#getwatchlist)
- [getWatchlists](#getwatchlists)
- [createWatchlist](#createwatchlist)
- [updateWatchlist](#updatewatchlist)
- [deleteWatchlist](#deletewatchlist)
- [getPortfolioHistory](#getportfoliohistory)
- [getConfigurations](#getconfigurations)
- [updateConfigurations](#updateconfigurations)
- [getActivity](#getactivity)
- [getActivities](#getactivities)
- [getOptionsContract](#getoptionscontract)
- [getOptionsContracts](#getoptionscontracts)
- [getCorporateAction](#getcorporateaction)
- [getCorporateActions](#getcorporateactions)
- [getCryptoWallet](#getcryptowallet)
- [getCryptoWallets](#getcryptowallets)
- [getFeeEstimate](#getfeeestimate)
- [getCryptoTransfer](#getcryptotransfer)
- [getCryptoTransfers](#getcryptotransfers)
- [createCryptoTransfer](#createcryptotransfer)
- [getCryptoWhitelistedAddress](#getcryptowhitelistedaddress)
- [getCryptoWhitelistedAddresses](#getcryptowhitelistedaddresses)
- [requestCryptoWhitelistedAddress](#requestcryptowhitelistedaddress)
- [removeCryptoWhitelistedAddress](#removecryptowhitelistedaddress)

#### Market Data API

- [getStocksCorporateActions](#getstockscorporateactions)
- [getLogo](#getlogo)
- [getNews](#getnews)
- [getStocksMostActives](#getstocksmostactives)
- [getStocksMarketMovers](#getstocksmarketmovers)
- [getStocksQuotes](#getstocksquotes)
- [getStocksQuotesLatest](#getstocksquoteslatest)
- [getStocksBars](#getstocksbars)
- [getStocksBarsLatest](#getstocksbarslatest)
- [getForexRates](#getforexrates)
- [getLatestForexRates](#getlatestforexrates)
- [getStocksSnapshots](#getstockssnapshots)
- [getStocksAuctions](#getstocksauctions)
- [getStocksConditions](#getstocksconditions)
- [getStocksExchangeCodes](#getstocksexchangecodes)
- [getStocksTrades](#getstockstrades)
- [getStocksTradesLatest](#getstockstradeslatest)
- [getOptionsBars](#getoptionsbars)
- [getOptionsExchanges](#getoptionsexchanges)
- [getOptionsSnapshots](#getoptionssnapshots)
- [getOptionsTrades](#getoptionstrades)
- [getOptionsTradesLatest](#getoptionstradeslatest)
- [getCryptoBars](#getcryptobars)
- [getLatestCryptoBars](#getlatestcryptobars)
- [getCryptoQuotes](#getcryptoquotes)
- [getCryptoQuotesLatest](#getcryptoquoteslatest)
- [getCryptoSnapshots](#getcryptosnapshots)
- [getCryptoTrades](#getcryptotrades)
- [getCryptoTradesLatest](#getcryptotradeslatest)
- [getLatestCryptoOrderbooks](#getlatestcryptoorderbooks)

#### getAccount

Retrieves the account information.

```typescript
client.getAccount().then(console.log);
```

#### createOrder

Creates a new order.

```typescript
const order: CreateOrderOptions = {
  symbol: "AAPL",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "day",
};

client.createOrder(order).then(console.log);
```

#### getOrder

Retrieves a specific order by its ID.

```typescript
const orderId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client.getOrder({ order_id: orderId }).then(console.log);
```

#### getOrders

Retrieves a list of orders based on the specified parameters.

```typescript
const options: GetOrdersOptions = {
  status: "open",
  limit: 10,
  direction: "desc",
};

client.getOrders(options).then(console.log);
```

#### replaceOrder

Replaces an existing order with updated parameters.

```typescript
const orderId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const replaceOptions: ReplaceOrderOptions = {
  qty: 2,
  limit_price: 150.0,
  order_id: orderId,
};

client.replaceOrder(replaceOptions).then(console.log);
```

#### cancelOrder

Cancels a specific order by its ID.

```typescript
const orderId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client.cancelOrder({ order_id: orderId }).then(console.log);
```

#### cancelOrders

Cancels all open orders.

```typescript
client.cancelOrders().then(console.log);
```

#### getPosition

Retrieves a specific position by symbol or asset ID.

```typescript
const symbolOrAssetId = "AAPL";

client.getPosition({ symbol_or_asset_id: symbolOrAssetId }).then(console.log);
```

#### getPositions

Retrieves all positions.

```typescript
client.getPositions().then(console.log);
```

#### closePosition

Closes a specific position by symbol or asset ID.

```typescript
const symbolOrAssetId = "AAPL";

client.closePosition({ symbol_or_asset_id: symbolOrAssetId }).then(console.log);
```

#### closePositions

Closes all positions.

```typescript
client.closePositions().then(console.log);
```

#### exerciseOption

Exercises an options contract.

```typescript
const contractId = "xxxxxxxx";

client.exerciseOption({ symbol_or_contract_id: contractId }).then(console.log);
```

#### getCalendar

Retrieves the market calendar.

```typescript
const options: GetCalendarOptions = {
  start: "2023-01-01",
  end: "2023-12-31",
};

client.getCalendar(options).then(console.log);
```

#### getClock

Retrieves the current market clock.

```typescript
client.getClock().then(console.log);
```

#### getAsset

Retrieves a specific asset by symbol or asset ID.

```typescript
const symbolOrAssetId = "AAPL";

client.getAsset({ symbol_or_asset_id: symbolOrAssetId }).then(console.log);
```

#### getAssets

Retrieves a list of assets based on the specified parameters.

```typescript
const options: GetAssetsOptions = {
  status: "active",
  asset_class: "us_equity",
};

client.getAssets(options).then(console.log);
```

#### getWatchlist

Retrieves a specific watchlist by ID.

```typescript
const watchlistId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client.getWatchlist({ watchlist_id: watchlistId }).then(console.log);
```

#### getWatchlists

Retrieves all watchlists.

```typescript
client.getWatchlists().then(console.log);
```

#### createWatchlist

Creates a new watchlist.

```typescript
const options: CreateWatchlistOptions = {
  name: "My Watchlist",
  symbols: ["AAPL", "GOOGL", "AMZN"],
};

client.createWatchlist(options).then(console.log);
```

#### updateWatchlist

Updates an existing watchlist.

```typescript
const watchlistId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const options: UpdateWatchlistOptions = {
  name: "Updated Watchlist",
  symbols: ["AAPL", "GOOGL", "MSFT"],
  watchlist_id: watchlistId,
};

client.updateWatchlist(options).then(console.log);
```

#### deleteWatchlist

Deletes a specific watchlist by ID.

```typescript
const watchlistId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client.deleteWatchlist({ watchlist_id: watchlistId }).then(console.log);
```

#### getPortfolioHistory

Retrieves the portfolio history.

```typescript
const options: GetPortfolioHistoryOptions = {
  period: "1M",
  timeframe: "1D",
};

client.getPortfolioHistory(options).then(console.log);
```

#### getConfigurations

Retrieves the account configurations.

```typescript
client.getConfigurations().then(console.log);
```

#### updateConfigurations

Updates the account configurations.

```typescript
const options: UpdateConfigurationsOptions = {
  trade_confirm_email: "all",
  suspend_trade: false,
};

client.updateConfigurations(options).then(console.log);
```

#### getActivity

Retrieves a specific activity type.

```typescript
const options: GetActivityOptions = {
  activity_type: "FILL",
};

client.getActivity(options).then(console.log);
```

#### getActivities

Retrieves all activities.

```typescript
client.getActivities().then(console.log);
```

#### getOptionsContract

Retrieves a specific options contract by symbol or contract ID.

```typescript
const symbolOrContractId = "AAPL230616C00150000";

client
  .getOptionsContract({ symbol_or_contract_id: symbolOrContractId })
  .then(console.log);
```

#### getOptionsContracts

Retrieves a list of options contracts based on the specified parameters.

```typescript
const options: GetOptionsContractsOptions = {
  underlying_symbols: "AAPL",
  expiration_date: "2023-06-16",
};

client.getOptionsContracts(options).then(console.log);
```

#### getCorporateAction

Retrieves a specific corporate action by ID.

```typescript
const corporateActionId = "xxxxxxxx";

client.getCorporateAction({ id: corporateActionId }).then(console.log);
```

#### getCorporateActions

Retrieves a list of corporate actions based on the specified parameters.

```typescript
const options: GetCorporateActionsOptions = {
  ca_types: "MERGER",
  since: "2023-01-01",
  until: "2023-12-31",
};

client.getCorporateActions(options).then(console.log);
```

#### getCryptoWallet

Retrieves a specific crypto wallet by asset.

```typescript
const asset = "BTCUSD";

client.getCryptoWallet({ asset }).then(console.log);
```

#### getCryptoWallets

Retrieves all crypto wallets.

```typescript
client.getCryptoWallets().then(console.log);
```

#### getFeeEstimate

Retrieves the fee estimate for a crypto withdrawal.

```typescript
const options: GetCryptoFeeEstimateOptions = {
  asset: "BTCUSD",
  from_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  to_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  amount: "0.1",
};

client.getFeeEstimate(options).then(console.log);
```

#### getCryptoTransfer

Retrieves a specific crypto transfer by ID.

```typescript
const transferId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client.getCryptoTransfer({ transfer_id: transferId }).then(console.log);
```

#### getCryptoTransfers

Retrieves a list of crypto transfers based on the specified parameters.

```typescript
const options: GetCryptoTransfersOptions = {
  asset: "BTCUSD",
};

client.getCryptoTransfers(options).then(console.log);
```

#### createCryptoTransfer

Creates a new crypto withdrawal.

```typescript
const options: CreateCryptoTransferOptions = {
  amount: "0.1",
  address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  asset: "BTCUSD",
};

client.createCryptoTransfer(options).then(console.log);
```

#### getCryptoWhitelistedAddress

Retrieves a specific whitelisted crypto address.

```typescript
const options: GetCryptoWhitelistedAddressOptions = {
  address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  asset: "BTCUSD",
};

client.getCryptoWhitelistedAddress(options).then(console.log);
```

#### getCryptoWhitelistedAddresses

Retrieves all whitelisted crypto addresses.

```typescript
client.getCryptoWhitelistedAddresses().then(console.log);
```

#### requestCryptoWhitelistedAddress

Requests a new whitelisted crypto address.

```typescript
const options: RequestCryptoWhitelistedAddressOptions = {
  address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  asset: "BTCUSD",
};

client.requestCryptoWhitelistedAddress(options).then(console.log);
```

#### removeCryptoWhitelistedAddress

Removes a specific whitelisted crypto address.

```typescript
const whitelistedAddressId = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

client
  .removeCryptoWhitelistedAddress({
    whitelisted_address_id: whitelistedAddressId,
  })
  .then(console.log);
```

#### getStocksCorporateActions

```typescript
const options = {
  symbols: "AAPL",
  types: "cash_dividends",
};
client.getStocksCorporateActions(options).then(console.log);
```

#### getLogo

```typescript
const options = {
  symbol: "AAPL",
};
client.getLogo(options).then(console.log);
```

#### getNews

```typescript
const options = {
  symbols: "AAPL,TSLA",
  limit: 10,
};
client.getNews(options).then(console.log);
```

#### getStocksMostActives

```typescript
const options = {
  by: "volume",
  top: 10,
};
client.getStocksMostActives(options).then(console.log);
```

#### getStocksMarketMovers

```typescript
const options = {
  by: "change",
  top: 10,
};
client.getStocksMarketMovers(options).then(console.log);
```

#### getStocksQuotes

```typescript
const options = {
  symbols: "AAPL,TSLA",
  limit: 10,
};
client.getStocksQuotes(options).then(console.log);
```

#### getStocksQuotesLatest

```typescript
const options = {
  symbols: "AAPL,TSLA",
};
client.getStocksQuotesLatest(options).then(console.log);
```

#### getStocksBars

```typescript
const options = {
  symbols: "AAPL,TSLA",
  timeframe: "1Day",
  limit: 10,
};
client.getStocksBars(options).then(console.log);
```

#### getStocksBarsLatest

```typescript
const options = {
  symbols: "AAPL,TSLA",
};
client.getStocksBarsLatest(options).then(console.log);
```

#### getForexRates

```typescript
const options = {
  currency_pairs: "EURUSD,GBPUSD",
  timeframe: "1Min",
  limit: 10,
};
client.getForexRates(options).then(console.log);
```

#### getLatestForexRates

```typescript
const options = {
  currency_pairs: "EURUSD,GBPUSD",
};
client.getLatestForexRates(options).then(console.log);
```

#### getStocksSnapshots

```typescript
const options = {
  symbols: "AAPL,TSLA",
};
client.getStocksSnapshots(options).then(console.log);
```

#### getStocksAuctions

```typescript
const options = {
  symbols: "AAPL,TSLA",
  limit: 10,
};
client.getStocksAuctions(options).then(console.log);
```

#### getStocksConditions

```typescript
const options = {
  tickType: "trades",
  tape: "xxx",
};
client.getStocksConditions(options).then(console.log);
```

#### getStocksExchangeCodes

```typescript
client.getStocksExchangeCodes().then(console.log);
```

#### getStocksTrades

```typescript
const options = {
  symbols: "AAPL,TSLA",
  limit: 10,
};
client.getStocksTrades(options).then(console.log);
```

#### getStocksTradesLatest

```typescript
const options = {
  symbols: "AAPL,TSLA",
};
client.getStocksTradesLatest(options).then(console.log);
```

#### getOptionsBars

```typescript
const options = {
  symbols: "AAPL220617C00270000,TSLA220617C01000000",
  timeframe: "1Day",
  limit: 10,
};
client.getOptionsBars(options).then(console.log);
```

#### getOptionsExchanges

```typescript
client.getOptionsExchanges().then(console.log);
```

#### getOptionsSnapshots

```typescript
const options = {
  symbols: "AAPL220617C00270000,TSLA220617C01000000",
};
client.getOptionsSnapshots(options).then(console.log);
```

#### getOptionsTrades

```typescript
const options = {
  symbols: "AAPL220617C00270000,TSLA220617C01000000",
  limit: 10,
};
client.getOptionsTrades(options).then(console.log);
```

#### getOptionsTradesLatest

```typescript
const options = {
  symbols: "AAPL220617C00270000,TSLA220617C01000000",
};
client.getOptionsTradesLatest(options).then(console.log);
```

#### getCryptoBars

```typescript
const options = {
  symbols: "BTCUSD,ETHUSD",
  timeframe: "1Min",
  limit: 10,
};
client.getCryptoBars(options).then(console.log);
```

#### getLatestCryptoBars

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
};
client.getLatestCryptoBars(options).then(console.log);
```

#### getCryptoQuotes

```typescript
const options = {
  symbols: "BTCUSD,ETHUSD",
  limit: 10,
};
client.getCryptoQuotes(options).then(console.log);
```

#### getCryptoQuotesLatest

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
};
client.getCryptoQuotesLatest(options).then(console.log);
```

#### getCryptoSnapshots

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
};
client.getCryptoSnapshots(options).then(console.log);
```

#### getCryptoTrades

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
  limit: 10,
};
client.getCryptoTrades(options).then(console.log);
```

#### getCryptoTradesLatest

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
};
client.getCryptoTradesLatest(options).then(console.log);
```

#### getLatestCryptoOrderbooks

```typescript
const options = {
  loc: "US",
  symbols: "BTCUSD,ETHUSD",
};
client.getLatestCryptoOrderbooks(options).then(console.log);
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
