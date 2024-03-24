// @todo fix type conflicts with crypto and stocks

import {
  ConditionCodesResponse,
  CorporateActionsQueryParams,
  CorporateActionsResponse,
  CryptoHistoricalTradesResponse,
  CryptoSnapshotsResponse,
  ExchangeCodesResponse,
  HistoricalAuctionsResponse,
  HistoricalBarsResponse,
  HistoricalForexRatesResponse,
  HistoricalOptionBarsResponse,
  HistoricalQuotesParams,
  HistoricalQuotesResponse,
  HistoricalTradesResponse,
  LatestBarsResponse,
  LatestForexRatesResponse,
  LatestOrderbooksResponse,
  LatestQuotesParams,
  LatestQuotesResponse,
  LatestTradeParams,
  LatestTradeResponse,
  LatestTradesResponse,
  MarketMoversResponse,
  MostActivesResponse,
  NewsResponse,
  OptionExchangeMapping,
  SnapshotParams,
  SnapshotResponse,
  SnapshotsResponse,
  TradeParams,
  TradeResponse,
} from "./types.ts";

import { ClientContext } from "../../factory/createClient.ts";

export default ({ request }: ClientContext) => ({
  v1beta1: {
    corporateActions: (queryParams: CorporateActionsQueryParams) =>
      request<CorporateActionsResponse>({
        path: "/v1beta1/corporate-actions",
        method: "GET",
        params: queryParams,
      }),
    forex: {
      latestRates: (currencyPairs: string) =>
        request<LatestForexRatesResponse>({
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
        request<HistoricalForexRatesResponse>({
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
      request<unknown>({
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
      request<NewsResponse>({
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
        request<HistoricalOptionBarsResponse>({
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
          request<OptionExchangeMapping>({
            path: "/v1beta1/options/meta/exchanges",
            method: "GET",
          }),
      },
      quotes: {
        latest: (symbols: string, feed?: string) =>
          request<LatestQuotesResponse>({
            path: "/v1beta1/options/quotes/latest",
            method: "GET",
            params: { symbols, feed },
          }),
      },
      trades: {
        latest: (symbols: string, feed?: string) =>
          request<LatestTradesResponse>({
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
          request<HistoricalTradesResponse>({
            path: "/v1beta1/options/trades",
            method: "GET",
            params: { symbols, start, end, limit, pageToken, sort },
          }),
      },
      snapshots: (symbols: string, feed?: string) =>
        request<SnapshotsResponse>({
          path: "/v1beta1/options/snapshots",
          method: "GET",
          params: { symbols, feed },
        }),
      snapshotsByUnderlying: (underlyingSymbol: string, feed?: string) =>
        // uhh, not sure yet how to handle this
        request<SnapshotsResponse>({
          path: `/v1beta1/options/snapshots/${underlyingSymbol}`,
          method: "GET",
          params: { feed },
        }),
    },
    screener: {
      getMostActives: (by = "volume", top = 10) =>
        request<MostActivesResponse>({
          path: "/v1beta1/screener/stocks/most-actives",
          method: "GET",
          params: { by, top },
        }),
      getMarketMovers: (marketType: string, top: number = 10) =>
        request<MarketMoversResponse>({
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
        request<HistoricalBarsResponse>({
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
        request<LatestBarsResponse>({
          path: `/v1beta3/crypto/${loc}/latest/bars`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestOrderbooks: (loc: string, symbols: string) =>
        request<LatestOrderbooksResponse>({
          path: `/v1beta3/crypto/${loc}/latest/orderbooks`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestQuotes: (loc: string, symbols: string) =>
        request<LatestQuotesResponse>({
          path: `/v1beta3/crypto/${loc}/latest/quotes`,
          method: "GET",
          params: {
            symbols,
          },
        }),
      getLatestTrades: (loc: string, symbols: string) =>
        request<LatestTradesResponse>({
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
        request<HistoricalQuotesResponse>({
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
        request<CryptoSnapshotsResponse>({
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
        request<CryptoHistoricalTradesResponse>({
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
  v2: {
    stocks: {
      getHistoricalAuctions: (
        symbols: string,
        start?: string,
        end?: string,
        limit?: number,
        asof?: string,
        feed?: string,
        page_token?: string,
        sort?: string
      ) =>
        request<HistoricalAuctionsResponse>({
          path: `/v2/stocks/auctions`,
          method: "GET",
          params: {
            symbols,
            start,
            end,
            limit,
            asof,
            feed,
            page_token,
            sort,
          },
        }),
      getHistoricalBars: (
        symbols: string,
        timeframe: string,
        start?: string,
        end?: string,
        limit?: number,
        adjustment?: string,
        asof?: string,
        feed?: string,
        page_token?: string,
        sort?: string
      ) =>
        request<HistoricalBarsResponse>({
          path: `/v2/stocks/bars`,
          method: "GET",
          params: {
            symbols,
            timeframe,
            start,
            end,
            limit,
            adjustment,
            asof,
            feed,
            page_token,
            sort,
          },
        }),
      getLatestBars: (symbols: string, feed?: string, currency?: string) =>
        request<LatestBarsResponse>({
          path: `/v2/stocks/bars/latest`,
          method: "GET",
          params: { symbols, feed, currency },
        }),
      getConditionCodes: (tickType: string, tape: string) =>
        request<ConditionCodesResponse>({
          path: `/v2/stocks/meta/conditions/${tickType}`,
          method: "GET",
          params: { tape },
        }),
      getExchangeCodes: () =>
        request<ExchangeCodesResponse>({
          path: "/v2/stocks/meta/exchanges",
          method: "GET",
        }),
      getHistoricalQuotes: (params: HistoricalQuotesParams) =>
        request<HistoricalQuotesResponse>({
          path: "/v2/stocks/quotes",
          method: "GET",
          params,
        }),
      getLatestQuotes: (params: LatestQuotesParams) =>
        request<LatestQuotesResponse>({
          path: "/v2/stocks/quotes/latest",
          method: "GET",
          params,
        }),
      getSnapshots: (params: SnapshotParams) =>
        request<SnapshotResponse>({
          path: "/v2/stocks/snapshots",
          method: "GET",
          params,
        }),
      getTrades: (params: TradeParams) =>
        request<TradeResponse>({
          path: "/v2/stocks/trades",
          method: "GET",
          params,
        }),
      getLatestTrades: (params: LatestTradeParams) =>
        request<LatestTradeResponse>({
          path: "/v2/stocks/trades/latest",
          method: "GET",
          params,
        }),
    },
  },
});
