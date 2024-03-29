import { ClientContext } from "../factory/createClient.ts";

export interface CorporateActionsQueryParams {
  symbols: string;
  types?: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: "asc" | "desc";
}

export interface CorporateActionsResponse {
  corporate_actions: {
    reverse_splits?: ReverseSplit[];
    forward_splits?: ForwardSplit[];
    unit_splits?: UnitSplit[];
    stock_dividends?: StockDividend[];
    cash_dividends?: CashDividend[];
    spin_offs?: SpinOff[];
    cash_mergers?: CashMerger[];
    stock_mergers?: StockMerger[];
    stock_and_cash_mergers?: StockAndCashMerger[];
    redemptions?: Redemption[];
    name_changes?: NameChange[];
    worthless_removals?: WorthlessRemoval[];
    next_page_token: string | null;
  };
}

export interface ReverseSplit {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
}

export interface ForwardSplit {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
}

export interface UnitSplit {
  old_symbol: string;
  old_rate: number;
  new_symbol: string;
  new_rate: number;
  alternate_symbol: string;
  alternate_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
}

export interface StockDividend {
  symbol: string;
  rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
}

export interface CashDividend {
  symbol: string;
  rate: number;
  special: boolean;
  foreign: boolean;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_on_date?: string;
  due_bill_off_date?: string;
}

export interface SpinOff {
  source_symbol: string;
  source_rate: number;
  new_symbol: string;
  new_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
}

export interface CashMerger {
  acquirer_symbol: string;
  acquiree_symbol: string;
  rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
}

export interface StockMerger {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
}

export interface StockAndCashMerger {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  cash_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
}

export interface Redemption {
  symbol: string;
  rate: number;
  process_date: string;
  payable_date?: string;
}

export interface NameChange {
  old_symbol: string;
  new_symbol: string;
  process_date: string;
}

export interface WorthlessRemoval {
  symbol: string;
  process_date: string;
}

export interface LatestForexRatesResponse {
  rates: {
    [currencyPair: string]: ForexRate;
  };
}

export interface ForexRate {
  bp: number;
  mp: number;
  ap: number;
  t: string;
}

export interface HistoricalForexRatesResponse {
  next_page_token: string;
  rates: {
    [currencyPair: string]: HistoricalForexRate[];
  };
}

export interface HistoricalForexRate {
  bp: number;
  mp: number;
  ap: number;
  t: string;
}
export interface HistoricalBarsResponse {
  bars: { [symbol: string]: CryptoBar[] };
  next_page_token: string | null;
}

export interface CryptoBar {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
}

export interface LatestBarsResponse {
  bars: { [symbol: string]: CryptoBar };
}

export interface LatestOrderbooksResponse {
  orderbooks: { [symbol: string]: CryptoOrderbook };
}

export interface CryptoOrderbook {
  t: string;
  b: OrderbookEntry[];
  a: OrderbookEntry[];
}

export interface OrderbookEntry {
  p: number;
  s: number;
}

export interface LatestQuotesResponse {
  quotes: { [symbol: string]: CryptoQuote };
}

export interface CryptoQuote {
  t: string;
  bp: number;
  bs: number;
  ap: number;
  as: number;
}

export interface LatestTradesResponse {
  trades: { [symbol: string]: CryptoTrade };
}

export interface CryptoTrade {
  t: string;
  p: number;
  s: number;
  tks: string;
  i: number;
}

export interface HistoricalQuotesResponse {
  quotes: { [symbol: string]: CryptoQuote[] };
  next_page_token: string | null;
}

export interface CryptoSnapshotsResponse {
  snapshots: { [symbol: string]: CryptoSnapshot };
}

interface CryptoSnapshot {
  dailyBar: BarData;
  latestQuote: QuoteData;
  latestTrade: TradeData;
  minuteBar: BarData;
  prevDailyBar: BarData;
}

interface BarData {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  vw: number;
  n: number;
}

interface QuoteData {
  t: string;
  bp: number;
  bs: number;
  ap: number;
  as: number;
}

interface TradeData {
  t: string;
  p: number;
  s: number;
  tks: string;
}

export interface CryptoHistoricalTradesResponse {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: string | null;
}
export interface NewsResponse {
  news: NewsArticle[];
  next_page_token: string | null;
}

export interface NewsArticle {
  id: number;
  headline: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary: string;
  content: string;
  url: string | null;
  images: NewsImage[];
  symbols: string[];
  source: string;
}

export interface NewsImage {
  size: "thumb" | "small" | "large";
  url: string;
}
export interface HistoricalOptionBarsResponse {
  bars: OptionBar[];
  next_page_token: string | null;
}

export interface OptionBar {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
}

export interface OptionExchangeMapping {
  [exchangeCode: string]: string;
}

export interface LatestQuotesResponse {}

export interface LatestTradesResponse {}

export interface HistoricalTradesResponse {
  trades: {
    [symbol: string]: {
      t: string;
      x: string;
      p: number;
      s: number;
      c: string;
    }[];
  };
  next_page_token: string | null;
}

export interface SnapshotsResponse {
  snapshots: {
    [symbol: string]: {
      latest_trade: TradeSnapshot;
      latest_quote: QuoteSnapshot;
    };
  };
}

interface TradeSnapshot {
  t: string;
  x: string;
  p: number;
  s: number;
  c: string;
}

interface QuoteSnapshot {
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string;
}
export interface MostActivesResponse {
  most_actives: MostActiveStock[];
  last_updated: string;
}

export interface MostActiveStock {
  symbol: string;
  volume: number;
  trade_count: number;
}

export interface MarketMoversResponse {
  gainers: MarketMover[];
  losers: MarketMover[];
  market_type: string;
  last_updated: string;
}

export interface MarketMover {
  symbol: string;
  percent_change: number;
  change: number;
  price: number;
}
export interface HistoricalAuctionsResponse {
  auctions: { [symbol: string]: AuctionData[] };
  next_page_token: string | null;
}

interface AuctionData {
  d: string;
  o: AuctionPrice[];
  c: AuctionPrice[];
}

interface AuctionPrice {
  c: string;
  p: number;
  t: string;
  x: string;
}

export interface HistoricalBarsResponse {
  bars: { [symbol: string]: Bar[] };
  next_page_token: string | null;
}

interface Bar {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
}

export interface LatestBarsResponse {
  bars: { [symbol: string]: Bar };
}

interface Bar {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
}

export interface ConditionCodesResponse {
  [code: string]: string;
}

export interface ExchangeCodesResponse {
  [code: string]: string;
}

export interface HistoricalQuotesParams {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
  page_token?: string;
  sort?: "asc" | "desc";
}

export interface LatestQuotesParams {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
}

export interface LatestQuotesResponse {}

export interface LatestQuote {
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string[];
  z: string;
}

export interface SnapshotParams {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
}

export interface SnapshotResponse {
  snapshots: {
    [symbol: string]: SnapshotData;
  };
}

export interface SnapshotData {
  latestTrade: {
    t: string;
    x: string;
    p: number;
    s: number;
    c: string[];
    i: number;
    z: string;
  };
  latestQuote: {
    t: string;
    ax: string;
    ap: number;
    as: number;
    bx: string;
    bp: number;
    bs: number;
    c: string[];
    z: string;
  };
  minuteBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    n: number;
    vw: number;
  };
  dailyBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    n: number;
    vw: number;
  };
  prevDailyBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    n: number;
    vw: number;
  };
}

export interface TradeParams {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
  page_token?: string;
  sort?: "asc" | "desc";
}

export interface TradeResponse {
  trades: {
    [symbol: string]: Trade[];
  };
  next_page_token?: string;
}

export interface Trade {
  t: string;
  x: string;
  p: number;
  s: number;
  c: string[];
  i: number;
  z: string;
}

export interface LatestTradeParams {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
}

export interface LatestTradeResponse {
  trades: {
    [symbol: string]: Trade;
  };
}

export interface HistoricalAuctionsParams {
  symbol?: string;
  symbols?: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  page_token?: string;
  sort?: string;
}

export type MarketDataEventMap = any;

export default {
  rest: ({ request }: ClientContext) => ({
    v1beta1: {
      corporate_actions: {
        get: (queryParams: CorporateActionsQueryParams) =>
          request<CorporateActionsResponse>({
            path: "/v1beta1/corporate-actions",
            method: "GET",
            params: queryParams,
          }),
      },
      forex: {
        latest: {
          rates: {
            get: (currencyPairs: string) =>
              request<LatestForexRatesResponse>({
                path: "/v1beta1/forex/latest/rates",
                method: "GET",
                params: { currency_pairs: currencyPairs },
              }),
          },
        },
        rates: {
          get: (
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
      },
      logos: {
        get: (symbol: string, placeholder?: boolean) =>
          request<unknown>({
            path: `/v1beta1/logos/${symbol}`,
            method: "GET",
            params: { placeholder: placeholder },
          }),
      },
      news: {
        get: (
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
      },
      options: {
        bars: {
          get: (
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
        },
        meta: {
          exchanges: {
            get: () =>
              request<OptionExchangeMapping>({
                path: "/v1beta1/options/meta/exchanges",
                method: "GET",
              }),
          },
        },
        quotes: {
          latest: {
            get: (symbols: string, feed?: string) =>
              request<LatestQuotesResponse>({
                path: "/v1beta1/options/quotes/latest",
                method: "GET",
                params: { symbols, feed },
              }),
          },
        },
        trades: {
          latest: {
            get: (symbols: string, feed?: string) =>
              request<LatestTradesResponse>({
                path: "/v1beta1/options/trades/latest",
                method: "GET",
                params: { symbols, feed },
              }),
          },
          get: (
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
        snapshots: {
          get: (symbols: string, feed?: string) =>
            request<SnapshotsResponse>({
              path: "/v1beta1/options/snapshots",
              method: "GET",
              params: { symbols, feed },
            }),
        },
      },
      screener: {
        most_actives: {
          get: (by = "volume", top = 10) =>
            request<MostActivesResponse>({
              path: "/v1beta1/screener/stocks/most-actives",
              method: "GET",
              params: { by, top },
            }),
        },
        movers: {
          get: (marketType: string, top: number = 10) =>
            request<MarketMoversResponse>({
              path: `/v1beta1/screener/${marketType}/movers`,
              method: "GET",
              params: { top },
            }),
        },
      },
    },
    v1beta3: {
      crypto: {
        bars: {
          get: (
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
        },
        latest: {
          bars: {
            get: (loc: string, symbols: string) =>
              request<LatestBarsResponse>({
                path: `/v1beta3/crypto/${loc}/latest/bars`,
                method: "GET",
                params: {
                  symbols,
                },
              }),
          },
          orderbooks: {
            get: (loc: string, symbols: string) =>
              request<LatestOrderbooksResponse>({
                path: `/v1beta3/crypto/${loc}/latest/orderbooks`,
                method: "GET",
                params: {
                  symbols,
                },
              }),
          },
          quotes: {
            get: (loc: string, symbols: string) =>
              request<LatestQuotesResponse>({
                path: `/v1beta3/crypto/${loc}/latest/quotes`,
                method: "GET",
                params: {
                  symbols,
                },
              }),
          },
          trades: {
            get: (loc: string, symbols: string) =>
              request<LatestTradesResponse>({
                path: `/v1beta3/crypto/${loc}/latest/trades`,
                method: "GET",
                params: {
                  symbols,
                },
              }),
          },
        },
        quotes: {
          get: (
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
        },

        snapshots: {
          get: (loc: string, symbols: string) =>
            request<CryptoSnapshotsResponse>({
              path: `/v1beta3/crypto/${loc}/snapshots`,
              method: "GET",
              params: {
                symbols,
              },
            }),
        },
        trades: {
          get: (
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
    },
    v2: {
      stocks: {
        auctions: {
          get: (
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
        },
        bars: {
          get: (
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
          latest: {
            get: (symbols: string, feed?: string, currency?: string) =>
              request<LatestBarsResponse>({
                path: `/v2/stocks/bars/latest`,
                method: "GET",
                params: { symbols, feed, currency },
              }),
          },
        },
        meta: {
          conditions: {
            get: (tickType: string, tape: string) =>
              request<ConditionCodesResponse>({
                path: `/v2/stocks/meta/conditions/${tickType}`,
                method: "GET",
                params: { tape },
              }),
          },
          exchanges: {
            get: () =>
              request<ExchangeCodesResponse>({
                path: "/v2/stocks/meta/exchanges",
                method: "GET",
              }),
          },
          quotes: {
            get: (params: HistoricalQuotesParams) =>
              request<HistoricalQuotesResponse>({
                path: "/v2/stocks/quotes",
                method: "GET",
                params,
              }),
            latest: {
              get: (params: LatestQuotesParams) =>
                request<LatestQuotesResponse>({
                  path: "/v2/stocks/quotes/latest",
                  method: "GET",
                  params,
                }),
            },
          },
        },
        snapshots: {
          get: (params: SnapshotParams) =>
            request<SnapshotResponse>({
              path: "/v2/stocks/snapshots",
              method: "GET",
              params,
            }),
        },
        trades: {
          get: (params: TradeParams) =>
            request<TradeResponse>({
              path: "/v2/stocks/trades",
              method: "GET",
              params,
            }),
          latest: {
            get: (params: LatestTradeParams) =>
              request<LatestTradeResponse>({
                path: "/v2/stocks/trades/latest",
                method: "GET",
                params,
              }),
          },
        },
      },
    },
  }),
  websocket: ({ websocket }: ClientContext) => {
    return {
      on: (
        event: WebSocketEvent,
        callback: (data: WebSocketMessage) => void
      ) => {
        const handleMessage = (message: MessageEvent) => {
          const data = JSON.parse(message.data) as WebSocketMessage[];
          data.forEach((detail) => {
            if (detail.T === event) {
              callback(detail);
            }
          });
        };
        websocket.addEventListener("message", handleMessage);
        return () => {
          websocket.removeEventListener("message", handleMessage);
        };
      },
      subscribe: (channels: SubscribeMessage["channels"]) => {
        const subscribeMessage: SubscribeMessage = {
          action: "subscribe",
          channels,
        };
        websocket.send(JSON.stringify(subscribeMessage));
      },
      unsubscribe: (channels: UnsubscribeMessage["channels"]) => {
        const unsubscribeMessage: UnsubscribeMessage = {
          action: "unsubscribe",
          channels,
        };
        websocket.send(JSON.stringify(unsubscribeMessage));
      },
    };
  },
};

type WebSocketEvent =
  | "trade_updates"
  | "account_updates"
  | "subscription"
  | "error"
  | "success"
  | "authorization";

type WebSocketMessage = {
  T: WebSocketEvent;
  [key: string]: any;
};

type SubscribeMessage = {
  action: "subscribe";
  channels: {
    [key: string]: string[];
  };
};

type UnsubscribeMessage = {
  action: "unsubscribe";
  channels: {
    [key: string]: string[];
  };
};
