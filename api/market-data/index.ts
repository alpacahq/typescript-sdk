import { ClientContext } from "../../factory/client.ts";
import {
  CorporateActionsResponse,
  HistoricalForexRatesResponse,
  LatestForexRatesResponse,
} from "./types/corporateActions.ts";

import { CorporateActionsQueryParams } from "./types/corporateActions.ts";
import {
  CryptoHistoricalTradesResponse,
  CryptoSnapshotsResponse,
  HistoricalBarsResponse,
  HistoricalQuotesResponse,
  LatestBarsResponse,
  LatestOrderbooksResponse,
} from "./types/crypto.ts";
import { NewsResponse } from "./types/news.ts";
import {
  HistoricalOptionBarsResponse,
  HistoricalTradesResponse,
  LatestQuotesResponse,
  LatestTradesResponse,
  OptionExchangeMapping,
  SnapshotsResponse,
} from "./types/options.ts";
import { MarketMoversResponse, MostActivesResponse } from "./types/screener.ts";

export const MarketData = (context: ClientContext) => ({
  v1beta1: {
    corporateActions: (queryParams: CorporateActionsQueryParams) =>
      context.request<CorporateActionsResponse>({
        path: "/v1beta1/corporate-actions",
        method: "GET",
        params: queryParams,
      }),
    forex: {
      latestRates: (currencyPairs: string) =>
        context.request<LatestForexRatesResponse>({
          path: "/v1beta1/forex/latest/rates",
          method: "GET",
          params: { currency_pairs: currencyPairs },
        }),
      historicalRates: (
        currencyPairs: string,
        timeframe: string,
        start?: string,
        end?: string,
        limit?: number,
        sort?: string,
        pageToken?: string
      ) =>
        context.request<HistoricalForexRatesResponse>({
          path: "/v1beta1/forex/rates",
          method: "GET",
          params: {
            currency_pairs: currencyPairs,
            timeframe: timeframe,
            start: start,
            end: end,
            limit: limit,
            sort: sort,
            page_token: pageToken,
          },
        }),
    },

    logos: (symbol: string, placeholder?: boolean) =>
      // uhh, not sure yet how to handle this
      context.request<unknown>({
        path: `/v1beta1/logos/${symbol}`,
        method: "GET",
        params: { placeholder: placeholder },
      }),

    news: (
      start?: string,
      end?: string,
      sort?: string,
      symbols?: string,
      limit?: number,
      includeContent?: boolean,
      excludeContentless?: boolean,
      pageToken?: string
    ) =>
      context.request<NewsResponse>({
        path: "/v1beta1/news",
        method: "GET",
        params: {
          start: start,
          end: end,
          sort: sort,
          symbols: symbols,
          limit: limit,
          include_content: includeContent,
          exclude_contentless: excludeContentless,
          page_token: pageToken,
        },
      }),
    options: {
      bars: (
        symbols: string,
        timeframe: string,
        start?: string,
        end?: string,
        limit?: number,
        pageToken?: string,
        sort?: string
      ) =>
        context.request<HistoricalOptionBarsResponse>({
          path: "/v1beta1/options/bars",
          method: "GET",
          params: {
            symbols: symbols,
            timeframe: timeframe,
            start: start,
            end: end,
            limit: limit,
            page_token: pageToken,
            sort: sort,
          },
        }),
      meta: {
        exchanges: () =>
          context.request<OptionExchangeMapping>({
            path: "/v1beta1/options/meta/exchanges",
            method: "GET",
          }),
      },
      quotes: {
        latest: (symbols: string, feed?: string) =>
          context.request<LatestQuotesResponse>({
            path: "/v1beta1/options/quotes/latest",
            method: "GET",
            params: { symbols, feed },
          }),
      },
      trades: {
        latest: (symbols: string, feed?: string) =>
          context.request<LatestTradesResponse>({
            path: "/v1beta1/options/trades/latest",
            method: "GET",
            params: { symbols, feed },
          }),
        historical: (
          symbols: string,
          start?: string,
          end?: string,
          limit?: number,
          pageToken?: string,
          sort?: string
        ) =>
          context.request<HistoricalTradesResponse>({
            path: "/v1beta1/options/trades",
            method: "GET",
            params: { symbols, start, end, limit, pageToken, sort },
          }),
      },
      snapshots: (symbols: string, feed?: string) =>
        context.request<SnapshotsResponse>({
          path: "/v1beta1/options/snapshots",
          method: "GET",
          params: { symbols, feed },
        }),
      snapshotsByUnderlying: (underlyingSymbol: string, feed?: string) =>
        // uhh, not sure yet how to handle this
        context.request<SnapshotsResponse>({
          path: `/v1beta1/options/snapshots/${underlyingSymbol}`,
          method: "GET",
          params: { feed },
        }),
    },
    screener: {
      getMostActives: (by = "volume", top = 10) =>
        context.request<MostActivesResponse>({
          path: "/v1beta1/screener/stocks/most-actives",
          method: "GET",
          params: { by, top },
        }),
      getMarketMovers: (marketType: string, top: number = 10) =>
        context.request<MarketMoversResponse>({
          path: `/v1beta1/screener/${marketType}/movers`,
          method: "GET",
          params: { top },
        }),
    },
  },
  v1beta3: {
    crypto: {
      getHistoricalBars: (
        loc: string,
        symbols: string,
        timeframe: string,
        start?: string,
        end?: string,
        limit: number = 1000,
        page_token?: string,
        sort?: string
      ) =>
        context.request<HistoricalBarsResponse>({
          path: `/v1beta3/crypto/${loc}/bars`,
          method: "GET",
          params: {
            symbols,
            timeframe,
            start,
            end,
            limit,
            page_token,
            sort,
          },
        }),
      getLatestBars: (loc: string, symbols: string) =>
        context.request<LatestBarsResponse>({
          path: `/v1beta3/crypto/${loc}/latest/bars`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestOrderbooks: (loc: string, symbols: string) =>
        context.request<LatestOrderbooksResponse>({
          path: `/v1beta3/crypto/${loc}/latest/orderbooks`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestQuotes: (loc: string, symbols: string) =>
        context.request<LatestQuotesResponse>({
          path: `/v1beta3/crypto/${loc}/latest/quotes`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestTrades: (loc: string, symbols: string) =>
        context.request<LatestTradesResponse>({
          path: `/v1beta3/crypto/${loc}/latest/trades`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getHistoricalQuotes: (
        loc: string,
        symbols: string,
        start?: string,
        end?: string,
        limit?: number,
        pageToken?: string,
        sort?: string
      ) =>
        context.request<HistoricalQuotesResponse>({
          path: `/v1beta3/crypto/${loc}/quotes`,
          method: "GET",
          params: {
            symbols,
            start,
            end,
            limit,
            page_token: pageToken,
            sort,
          },
        }),
      getSnapshots: (loc: string, symbols: string) =>
        context.request<CryptoSnapshotsResponse>({
          path: `/v1beta3/crypto/${loc}/snapshots`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getHistoricalTrades: (
        loc: string,
        symbols: string,
        start?: string,
        end?: string,
        limit?: number,
        page_token?: string,
        sort?: string
      ) =>
        context.request<CryptoHistoricalTradesResponse>({
          path: `/v1beta3/crypto/${loc}/trades`,
          method: "GET",
          params: {
            symbols,
            start,
            end,
            limit,
            page_token,
            sort,
          },
        }),
    },
  },
});
