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
    - [Environment Variables](#environment-variables)
    - [Rate Limiting](#rate-limiting)
  - [Methods](#methods)
    - [Trading API](#trading-api)
    - [Market Data API](#market-data-api)
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
  // accessToken: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
});
```

By default, the client will make requests to the paper trading environment (`https://paper-api.alpaca.markets`). This is a safety measure to prevent accidental trades.

### Configuration

#### Environment Variables

You can set the following environment variables to configure the client:

- `APCA_KEY_ID`: Your API key.
- `APCA_KEY_SECRET`: Your API secret.
- `APCA_ACCESS_TOKEN`: Your access token (if using OAuth).
- `APCA_DEBUG`: Enables debug logging.

The client will automatically use these values if they are set. They will not override any credentials explicitly passed to `createClient`.

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

- [`getAccount`](#getaccount)
- [`createOrder`](#createorder)
- [`getOrder`](#getorder)
- [`getOrders`](#getorders)
- [`replaceOrder`](#replaceorder)
- [`cancelOrder`](#cancelorder)
- [`cancelOrders`](#cancelorders)
- [`getPosition`](#getposition)
- [`getPositions`](#getpositions)
- [`closePosition`](#closeposition)
- [`closePositions`](#closepositions)
- [`exerciseOption`](#exerciseoption)
- [`getCalendar`](#getcalendar)
- [`getClock`](#getclock)
- [`getAsset`](#getasset)
- [`getAssets`](#getassets)
- [`getWatchlist`](#getwatchlist)
- [`getWatchlists`](#getwatchlists)
- [`createWatchlist`](#createwatchlist)
- [`updateWatchlist`](#updatewatchlist)
- [`deleteWatchlist`](#deletewatchlist)
- [`getPortfolioHistory`](#getportfoliohistory)
- [`getConfigurations`](#getconfigurations)
- [`updateConfigurations`](#updateconfigurations)
- [`getActivity`](#getactivity)
- [`getActivities`](#getactivities)
- [`getOptionsContract`](#getoptionscontract)
- [`getOptionsContracts`](#getoptionscontracts)
- [`getCorporateAction`](#getcorporateaction)
- [`getCorporateActions`](#getcorporateactions)
- [`getCryptoWallet`](#getcryptowallet)
- [`getCryptoWallets`](#getcryptowallets)
- [`getFeeEstimate`](#getfeeestimate)
- [`getCryptoTransfer`](#getcryptotransfer)
- [`getCryptoTransfers`](#getcryptotransfers)
- [`createCryptoTransfer`](#createcryptotransfer)
- [`getCryptoWhitelistedAddress`](#getcryptowhitelistedaddress)
- [`getCryptoWhitelistedAddresses`](#getcryptowhitelistedaddresses)
- [`requestCryptoWhitelistedAddress`](#requestcryptowhitelistedaddress)
- [`removeCryptoWhitelistedAddress`](#removecryptowhitelistedaddress)

#### Market Data API

- [`getStocksCorporateActions`](#getstockscorporateactions)
- [`getLogo`](#getlogo)
- [`getNews`](#getnews)
- [`getStocksMostActives`](#getstocksmostactives)
- [`getStocksMarketMovers`](#getstocksmarketmovers)
- [`getStocksQuotes`](#getstocksquotes)
- [`getStocksQuotesLatest`](#getstocksquoteslatest)
- [`getStocksBars`](#getstocksbars)
- [`getStocksBarsLatest`](#getstocksbarslatest)
- [`getForexRates`](#getforexrates)
- [`getLatestForexRates`](#getlatestforexrates)
- [`getStocksSnapshots`](#getstockssnapshots)
- [`getStocksAuctions`](#getstocksauctions)
- [`getStocksConditions`](#getstocksconditions)
- [`getStocksExchangeCodes`](#getstocksexchangecodes)
- [`getStocksTrades`](#getstockstrades)
- [`getStocksTradesLatest`](#getstockstradeslatest)
- [`getOptionsBars`](#getoptionsbars)
- [`getOptionsExchanges`](#getoptionsexchanges)
- [`getOptionsSnapshots`](#getoptionssnapshots)
- [`getOptionsTrades`](#getoptionstrades)
- [`getOptionsTradesLatest`](#getoptionstradeslatest)
- [`getCryptoBars`](#getcryptobars)
- [`getLatestCryptoBars`](#getlatestcryptobars)
- [`getCryptoQuotes`](#getcryptoquotes)
- [`getCryptoQuotesLatest`](#getcryptoquoteslatest)
- [`getCryptoSnapshots`](#getcryptosnapshots)
- [`getCryptoTrades`](#getcryptotrades)
- [`getCryptoTradesLatest`](#getcryptotradeslatest)
- [`getLatestCryptoOrderbooks`](#getlatestcryptoorderbooks)

#### `getAccount`

Retrieves the account information.

```typescript
client.getAccount().then(console.log);
```

#### `createOrder`

Creates a new order.

```typescript
client
  .createOrder({
    symbol: "AAPL",
    qty: 1,
    side: "buy",
    type: "market",
    time_in_force: "day",
  })
  .then(console.log);
```

#### `getOrder`

Retrieves a specific order by its ID.

```typescript
client
  .getOrder({ order_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" })
  .then(console.log);
```

#### `getOrders`

Retrieves a list of orders based on the specified parameters.

```typescript
client
  .getOrders({
    status: "open",
    limit: 10,
    direction: "desc",
  })
  .then(console.log);
```

#### `replaceOrder`

Replaces an existing order with updated parameters.

```typescript
client
  .replaceOrder({
    qty: 2,
    limit_price: 150.0,
    order_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `cancelOrder`

Cancels a specific order by its ID.

```typescript
client
  .cancelOrder({ order_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" })
  .then(console.log);
```

#### `cancelOrders`

Cancels all open orders.

```typescript
client.cancelOrders().then(console.log);
```

#### `getPosition`

Retrieves a specific position by symbol or asset ID.

```typescript
client
  .getPosition({
    symbol_or_asset_id: "AAPL",
  })
  .then(console.log);
```

#### `getPositions`

Retrieves all positions.

```typescript
client.getPositions().then(console.log);
```

#### `closePosition`

Closes a specific position by symbol or asset ID.

```typescript
client
  .closePosition({
    symbol_or_asset_id: "AAPL",
  })
  .then(console.log);
```

#### `closePositions`

Closes all positions.

```typescript
client.closePositions().then(console.log);
```

#### `exerciseOption`

Exercises an options contract.

```typescript
client
  .exerciseOption({
    symbol_or_contract_id: "xxxxxxxx",
  })
  .then(console.log);
```

#### `getCalendar`

Retrieves the market calendar.

```typescript
client
  .getCalendar({
    start: "2023-01-01",
    end: "2023-12-31",
  })
  .then(console.log);
```

#### `getClock`

Retrieves the current market clock.

```typescript
client.getClock().then(console.log);
```

#### `getAsset`

Retrieves a specific asset by symbol or asset ID.

```typescript
client
  .getAsset({
    symbol_or_asset_id: "AAPL",
  })
  .then(console.log);
```

#### `getAssets`

Retrieves a list of assets based on the specified parameters.

```typescript
client
  .getAssets({
    status: "active",
    asset_class: "us_equity",
  })
  .then(console.log);
```

#### `getWatchlist`

Retrieves a specific watchlist by ID.

```typescript
client
  .getWatchlist({
    watchlist_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `getWatchlists`

Retrieves all watchlists.

```typescript
client.getWatchlists().then(console.log);
```

#### `createWatchlist`

Creates a new watchlist.

```typescript
client
  .createWatchlist({
    name: "My Watchlist",
    symbols: ["AAPL", "GOOGL", "AMZN"],
  })
  .then(console.log);
```

#### `updateWatchlist`

Updates an existing watchlist.

```typescript
client
  .updateWatchlist({
    name: "Updated Watchlist",
    symbols: ["AAPL", "GOOGL", "MSFT"],
    watchlist_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `deleteWatchlist`

Deletes a specific watchlist by ID.

```typescript
client
  .deleteWatchlist({
    watchlist_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `getPortfolioHistory`

Retrieves the portfolio history.

```typescript
client
  .getPortfolioHistory({
    period: "1M",
    timeframe: "1D",
  })
  .then(console.log);
```

#### `getConfigurations`

Retrieves the account configurations.

```typescript
client.getConfigurations().then(console.log);
```

#### `updateConfigurations`

Updates the account configurations.

```typescript
client
  .updateConfigurations({
    trade_confirm_email: "all",
    suspend_trade: false,
  })
  .then(console.log);
```

#### `getActivity`

Retrieves a specific activity type.

```typescript
client
  .getActivity({
    activity_type: "FILL",
  })
  .then(console.log);
```

#### `getActivities`

Retrieves all activities.

```typescript
client.getActivities().then(console.log);
```

#### `getOptionsContract`

Retrieves a specific options contract by symbol or contract ID.

```typescript
client
  .getOptionsContract({
    symbol_or_contract_id: "AAPL230616C00150000",
  })
  .then(console.log);
```

#### `getOptionsContracts`

Retrieves a list of options contracts based on the specified parameters.

```typescript
client
  .getOptionsContracts({
    underlying_symbols: "AAPL",
    expiration_date: "2023-06-16",
  })
  .then(console.log);
```

#### `getCorporateAction`

Retrieves a specific corporate action by ID.

```typescript
client
  .getCorporateAction({
    id: "xxxxxxxx",
  })
  .then(console.log);
```

#### `getCorporateActions`

Retrieves a list of corporate actions based on the specified parameters.

```typescript
client
  .getCorporateActions({
    ca_types: "MERGER",
    since: "2023-01-01",
    until: "2023-12-31",
  })
  .then(console.log);
```

#### `getCryptoWallet`

Retrieves a specific crypto wallet by asset.

```typescript
client
  .getCryptoWallet({
    asset: "BTCUSD",
  })
  .then(console.log);
```

#### `getCryptoWallets`

Retrieves all crypto wallets.

```typescript
client.getCryptoWallets().then(console.log);
```

#### `getFeeEstimate`

Retrieves the fee estimate for a crypto withdrawal.

```typescript
client
  .getFeeEstimate({
    asset: "BTCUSD",
    from_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    to_address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    amount: "0.1",
  })
  .then(console.log);
```

#### `getCryptoTransfer`

Retrieves a specific crypto transfer by ID.

```typescript
client
  .getCryptoTransfer({
    transfer_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `getCryptoTransfers`

Retrieves a list of crypto transfers based on the specified parameters.

```typescript
client
  .getCryptoTransfers({
    asset: "BTCUSD",
  })
  .then(console.log);
```

#### `createCryptoTransfer`

Creates a new crypto withdrawal.

```typescript
client
  .createCryptoTransfer({
    amount: "0.1",
    address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    asset: "BTCUSD",
  })
  .then(console.log);
```

#### `getCryptoWhitelistedAddress`

Retrieves a specific whitelisted crypto address.

```typescript
client
  .getCryptoWhitelistedAddress({
    address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    asset: "BTCUSD",
  })
  .then(console.log);
```

#### `getCryptoWhitelistedAddresses`

Retrieves all whitelisted crypto addresses.

```typescript
client.getCryptoWhitelistedAddresses().then(console.log);
```

#### `requestCryptoWhitelistedAddress`

Requests a new whitelisted crypto address.

```typescript
client
  .requestCryptoWhitelistedAddress({
    address: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    asset: "BTCUSD",
  })
  .then(console.log);
```

#### `removeCryptoWhitelistedAddress`

Removes a specific whitelisted crypto address.

```typescript
client
  .removeCryptoWhitelistedAddress({
    whitelisted_address_id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
  .then(console.log);
```

#### `getStocksCorporateActions`

Retrieves a list of corporate actions based on the specified parameters.

```typescript
client
  .getStocksCorporateActions({
    symbols: "AAPL",
    types: "cash_dividends",
  })
  .then(console.log);
```

#### `getLogo`

Retrieves the logo for a specific symbol.

```typescript
client
  .getLogo({
    symbol: "AAPL",
  })
  .then(console.log);
```

#### `getNews`

Retrieves the latest news.

```typescript
client
  .getNews({
    symbols: "AAPL,TSLA",
    limit: 10,
  })
  .then(console.log);
```

#### `getStocksMostActives`

Retrieves a list of the most active stocks.

```typescript
client
  .getStocksMostActives({
    by: "volume",
    top: 10,
  })
  .then(console.log);
```

#### `getStocksMarketMovers`

Retrieves a list of the top market movers.

```typescript
client
  .getStocksMarketMovers({
    by: "change",
    top: 10,
  })
  .then(console.log);
```

#### `getStocksQuotes`

Retrieves a list of stock quotes.

```typescript
client
  .getStocksQuotes({
    symbols: "AAPL,TSLA",
    limit: 10,
  })
  .then(console.log);
```

#### `getStocksQuotesLatest`

Retrieves the latest stock quotes.

```typescript
client
  .getStocksQuotesLatest({
    symbols: "AAPL,TSLA",
  })
  .then(console.log);
```

#### `getStocksBars`

Retrieves a list of stock bars.

```typescript
client
  .getStocksBars({
    symbols: "AAPL,TSLA",
    timeframe: "1Day",
    limit: 10,
  })
  .then(console.log);
```

#### `getStocksBarsLatest`

Retrieves the latest stock bars.

```typescript
client
  .getStocksBarsLatest({
    symbols: "AAPL,TSLA",
  })
  .then(console.log);
```

#### `getForexRates`

Retrieves a list of forex rates.

```typescript
client
  .getForexRates({
    currency_pairs: "EURUSD,GBPUSD",
    timeframe: "1Min",
    limit: 10,
  })
  .then(console.log);
```

#### `getLatestForexRates`

Retrieves the latest forex rates.

```typescript
client
  .getLatestForexRates({
    currency_pairs: "EURUSD,GBPUSD",
  })
  .then(console.log);
```

#### `getStocksSnapshots`

Retrieves a list of stock snapshots.

```typescript
client
  .getStocksSnapshots({
    symbols: "AAPL,TSLA",
  })
  .then(console.log);
```

#### `getStocksAuctions`

Retrieves a list of stock auctions.

```typescript
client
  .getStocksAuctions({
    symbols: "AAPL,TSLA",
    limit: 10,
  })
  .then(console.log);
```

#### `getStocksConditions`

Retrieves a list of stock conditions.

```typescript
client
  .getStocksConditions({
    tickType: "trades",
    tape: "xxx",
  })
  .then(console.log);
```

#### `getStocksExchangeCodes`

Retrieves a list of stock exchange codes.

```typescript
client.getStocksExchangeCodes().then(console.log);
```

#### `getStocksTrades`

Retrieves a list of stock trades.

```typescript
client
  .getStocksTrades({
    symbols: "AAPL,TSLA",
    limit: 10,
  })
  .then(console.log);
```

#### `getStocksTradesLatest`

Retrieves the latest stock trades.

```typescript
client
  .getStocksTradesLatest({
    symbols: "AAPL,TSLA",
  })
  .then(console.log);
```

#### `getOptionsBars`

Retrieves a list of options bars.

```typescript
client
  .getOptionsBars({
    symbols: "AAPL220617C00270000,TSLA220617C01000000",
    timeframe: "1Day",
    limit: 10,
  })
  .then(console.log);
```

#### `getOptionsExchanges`

Retrieves a list of options exchanges.

```typescript
client.getOptionsExchanges().then(console.log);
```

#### `getOptionsSnapshots`

Retrieves a list of options snapshots.

```typescript
client
  .getOptionsSnapshots({
    symbols: "AAPL220617C00270000,TSLA220617C01000000",
  })
  .then(console.log);
```

#### `getOptionsTrades`

Retrieves a list of options trades.

```typescript
client
  .getOptionsTrades({
    symbols: "AAPL220617C00270000,TSLA220617C01000000",
    limit: 10,
  })
  .then(console.log);
```

#### `getOptionsTradesLatest`

Retrieves the latest options trades.

```typescript
client
  .getOptionsTradesLatest({
    symbols: "AAPL220617C00270000,TSLA220617C01000000",
  })
  .then(console.log);
```

#### `getCryptoBars`

Retrieves a list of crypto bars.

```typescript
client
  .getCryptoBars({
    symbols: "BTCUSD,ETHUSD",
    timeframe: "1Min",
    limit: 10,
  })
  .then(console.log);
```

#### `getLatestCryptoBars`

Retrieves the latest crypto bars.

```typescript
client
  .getLatestCryptoBars({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
  })
  .then(console.log);
```

#### `getCryptoQuotes`

Retrieves a list of crypto quotes.

```typescript
client
  .getCryptoQuotes({
    symbols: "BTCUSD,ETHUSD",
    limit: 10,
  })
  .then(console.log);
```

#### `getCryptoQuotesLatest`

Retrieves the latest crypto quotes.

```typescript
client
  .getCryptoQuotesLatest({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
  })
  .then(console.log);
```

#### `getCryptoSnapshots`

Retrieves a list of crypto snapshots.

```typescript
client
  .getCryptoSnapshots({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
  })
  .then(console.log);
```

#### `getCryptoTrades`

Retrieves a list of crypto trades.

```typescript
client
  .getCryptoTrades({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
    limit: 10,
  })
  .then(console.log);
```

#### `getCryptoTradesLatest`

Retrieves the latest crypto trades.

```typescript
client
  .getCryptoTradesLatest({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
  })
  .then(console.log);
```

#### `getLatestCryptoOrderbooks`

Retrieves the latest crypto orderbooks.

```typescript
client
  .getLatestCryptoOrderbooks({
    loc: "US",
    symbols: "BTCUSD,ETHUSD",
  })
  .then(console.log);
```

### WebSocket

#### How It Works

todo

#### Channels

todo

#### Examples

todo

## Need Help?

The primary maintainer of this project is [@117](https://github.com/117). Feel free to reach out on [Slack](https://alpaca-community.slack.com/join/shared_invite/zt-2ebgo7i1f-HbNoBjPWZ_bX72IVQTkcwg) 👋 or by opening an issue on this repo. I'm happy to help with any questions or issues you may have.
