# typescript-sdk

[![Deno Test](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml/badge.svg)](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test.yaml)
[![Deno Test Coverage](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test_coverage.yaml/badge.svg)](https://github.com/alpacahq/typescript-sdk/actions/workflows/deno_test_coverage.yaml)

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

- [Features](#features)
- [Install](#install)
- [Usage](#getting-started)
  - [Create a Client](#create-a-client)
  - [Environments](#environments)
  - [Rate Limiting](#rate-limiting)
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

### Environments

The environment (paper or live) is determined by the API key you use. If you use a paper key, the client will make requests to the paper environment. If you use a live key, the client will make requests to the live environment. You can also specify the environment explicitly by passing the `baseURL` option to the `createClient` function.

```ts
// ...
baseURL: "https://paper-api.alpaca.markets",
```

### Rate Limiting

You can also customize the rate limiting by passing a `tokenBucket` object to the `createClient` function. This object should contain the `capacity` and `fillRate` for the rate limiter.

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

| Method Path                       | Return Type                  |
|-----------------------------------|------------------------------|
| `client.trade.v2.account.get()`                        | `Account`                    |
| `client.trade.v2.orders.post(options: CreateOrderOptions)` | `Order`                      |
| `client.trade.v2.orders.get(options?: PatchOrderOptions | string, nested?: boolean)` | `Order | Order[]`            |
| `client.trade.v2.orders.delete(orderId?: string)`        | `{ id?: string; status?: string }[] | void` |
| `client.trade.v2.orders.patch(orderId: string, options: PatchOrderOptions)` | `Order`  |
| `client.trade.v2.positions.get(symbol_or_asset_id?: string)` | `Position | Position[]` |
| `client.trade.v2.positions.delete(params: ClosePositionOptions)` | `Order[]` |
| `client.trade.v2.positions.post(symbol_or_contract_id: string)` | `void` |
| `client.trade.v2.portfolioHistory.get(params?: PortfolioHistoryParams)` | `PortfolioHistoryResponse` |
| `client.trade.v2.watchlists.get(watchlist_id?: string)` | `Watchlist | Watchlist[]` |
| `client.trade.v2.watchlists.post({ name, symbols }: CreateWatchlistParams)` | `Watchlist` |
| `client.trade.v2.watchlists.put({ watchlist_id, name, symbols }: { watchlist_id: string } & UpdateWatchlistParams)` | `Watchlist` |
| `client.trade.v2.watchlists.deleteById({ watchlist_id }: { watchlist_id: string })` | `void` |
| `client.trade.v2.watchlists.addAsset({ watchlist_id, symbol }: { watchlist_id: string; symbol: string; })` | `Watchlist` |
| `client.trade.v2.watchlists.getByName({ name }: GetWatchlistByNameParams)` | `Watchlist` |
| `client.trade.v2.watchlists.updateByName({ name, newName, symbols }: UpdateWatchlistByNameParams)` | `Watchlist` |
| `client.trade.v2.watchlists.addAssetByName({ name, symbol }: AddAssetToWatchlistParams)` | `void` |
| `client.trade.v2.watchlists.deleteByName({ name }: DeleteWatchlistByNameParams)` | `void` |
| `client.trade.v2.watchlists.deleteSymbol({ watchlistId, symbol }: DeleteSymbolFromWatchlistParams)` | `Watchlist` |
| `client.trade.v2.accountConfigurations.get()` | `AccountConfigurations` |
| `client.trade.v2.accountConfigurations.patch(updatedConfig: UpdatedAccountConfigurations)` | `void` |
| `client.trade.v2.activities.get(activityType?: string, options?: { date?: string; until?: string; after?: string; direction?: string; pageSize?: number; pageToken?: string; category?: string; })` | `AccountActivity[]` |
| `client.trade.v2.calendar.get(options?: { start?: string; end?: string; dateType?: "TRADING" | "SETTLEMENT"; })` | `MarketCalendar[]` |
| `client.trade.v2.clock.get()` | `MarketClock` |
| `client.trade.v2.assets.getAll(options?: { status?: string; asset_class?: string; exchange?: string; attributes?: string[]; })` | `Asset[]` |
| `client.trade.v2.assets.getAsset(symbolOrAssetId: string)` | `Asset` |
| `client.trade.v2.options.get(queryParams: OptionContractsQueryParams, symbolOrId?: string)` | `OptionContract | OptionContract[]` |
| `client.trade.v2.corporateActions.announcements.get(queryParams?: AnnouncementsQueryParams, announcementId?: string)` | `CorporateActionAnnouncement | CorporateActionAnnouncement[]` |
| `client.trade.v2.cryptoFunding.getWallets(asset?: string)` | `CryptoFundingWallet | CryptoFundingWallet[]` |
| `client.trade.v2.cryptoFunding.requestWithdrawal(withdrawalParams: WithdrawalParams)` | `CryptoFundingTransfer` |
| `client.trade.v2.cryptoFunding.getTransfers(transferId?: string)` | `CryptoFundingTransfer | CryptoFundingTransfer[]` |
| `client.trade.v2.cryptoFunding.getWhitelistedAddresses()` | `WhitelistedAddress[]` |
| `client.trade.v2.cryptoFunding.requestWhitelistedAddress(whitelistedAddressParams: WhitelistedAddressParams)` | `WhitelistedAddress` |
| `client.trade.v2.cryptoFunding.deleteWhitelistedAddress(whitelistedAddressId: string)` | `void` |
| `client.trade.v2.cryptoFunding.estimateTransactionFee(transactionParams: TransactionParams)` | `TransactionFeeResponse` |

### WebSocket

## Methods

### Account

### Asset

## Subscriptions

## Need Help?

meow
