import { baseURLs, ClientContext } from "../factory/createClient.ts";
import { Nullable } from "./trade.ts";

export type ReverseSplit = {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
};

export type ForwardSplit = {
  symbol: string;
  new_rate: number;
  old_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
};

export type UnitSplit = {
  old_symbol: string;
  old_rate: number;
  new_symbol: string;
  new_rate: number;
  alternate_symbol: string;
  alternate_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockDividend = {
  symbol: string;
  rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
};

export type CashDividend = {
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
};

export type SpinOff = {
  source_symbol: string;
  source_rate: number;
  new_symbol: string;
  new_rate: number;
  process_date: string;
  ex_date: string;
  record_date: string;
  payable_date?: string;
  due_bill_redemption_date?: string;
};

export type CashMerger = {
  acquirer_symbol: string;
  acquiree_symbol: string;
  rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockMerger = {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type StockAndCashMerger = {
  acquirer_symbol: string;
  acquirer_rate: number;
  acquiree_symbol: string;
  acquiree_rate: number;
  cash_rate: number;
  process_date: string;
  effective_date: string;
  payable_date?: string;
};

export type Redemption = {
  symbol: string;
  rate: number;
  process_date: string;
  payable_date?: string;
};

export type NameChange = {
  old_symbol: string;
  new_symbol: string;
  process_date: string;
};

export type WorthlessRemoval = {
  symbol: string;
  process_date: string;
};

export type Sort = "asc" | "desc";

export type CorporateActions = {
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
    next_page_token: Nullable<string>;
  };
};

export type GetStocksCorporateActionsOptions = {
  symbols: string;
  types?: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export const getStocksCorporateActions =
  (context: ClientContext) => (params: GetStocksCorporateActionsOptions) =>
    context.request<CorporateActions>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/corporate-actions",
      method: "GET",
      params,
    });

export type Logo = string;

export type GetLogoOptions = {
  symbol: string;
  placeholder?: boolean;
};

export const getLogo = (context: ClientContext) => (params: GetLogoOptions) =>
  context.request<Logo>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/logos/:symbol",
    method: "GET",
    params,
  });

export interface News {
  news: NewsArticle[];
  next_page_token: Nullable<string>;
}

export interface NewsArticleImage {
  size: "thumb" | "small" | "large";
  url: string;
}

export interface NewsArticle {
  id: number;
  headline: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary: string;
  content: string;
  url: Nullable<string>;
  images: NewsArticleImage[];
  symbols: string[];
  source: string;
}

export type GetNewsOptions = {
  start?: string;
  end?: string;
  sort?: string;
  symbols?: string;
  limit?: number;
  include_content?: boolean;
  exclude_contentless?: boolean;
  page_token?: string;
};

export const getNews = (context: ClientContext) => (params: GetNewsOptions) =>
  context.request<News>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/news",
    method: "GET",
    params,
  });

export type MostActive = {
  symbol: string;
  volume: number;
  trade_count: number;
};

export type MostActives = {
  most_actives: MostActive[];
  last_updated: string;
};

export type MarketMovers = {
  gainers: MarketMover[];
  losers: MarketMover[];
  market_type: string;
  last_updated: string;
};

export type MarketMover = {
  symbol: string;
  percent_change: number;
  change: number;
  price: number;
};

export type GetStocksMostActivesOptions = {
  by?: string;
  top?: number;
};

export const getStocksMostActives =
  (context: ClientContext) => (params: GetStocksMostActivesOptions) =>
    context.request<MostActives>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/screener/stocks/most-actives",
      method: "GET",
      params,
    });

export type GetStocksMarketMoversOptions = {
  top?: number;
};

export const getStocksMarketMovers =
  (context: ClientContext) => (params: GetStocksMarketMoversOptions) =>
    context.request<MarketMovers>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/screener/stocks/movers",
      method: "GET",
      params,
    });

export type GetStocksQuotesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  sip?: string;
  page_token?: string;
  sort?: Sort;
};

export type StocksQuotes = {
  quotes: { [symbol: string]: StockQuote[] };
  next_page_token: Nullable<string>;
};

export const getStocksQuotes =
  (context: ClientContext) => (params: GetStocksQuotesOptions) =>
    context.request<StocksQuotes>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/quotes",
      method: "GET",
      params,
    });

export type GetStocksQuotesLatestOptions = {
  symbols: string;
  feed?: string;
};

export type StocksQuotesLatest = {
  quotes: { [symbol: string]: StockQuote };
};

export const getStocksQuotesLatest =
  (context: ClientContext) => (params: GetStocksQuotesLatestOptions) =>
    context.request<StocksQuotesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/quotes/latest",
      method: "GET",
      params,
    });

export type GetStocksBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  adjustment?: string;
  asof?: string;
  feed?: string;
  page_token?: string;
  sort?: string;
};

export type StocksBars = {
  bars: { [symbol: string]: StocksBar[] };
  next_page_token: Nullable<string>;
};

export type StocksBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export const getStocksBars =
  (context: ClientContext) => (params: GetStocksBarsOptions) =>
    context.request<StocksBars>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/bars",
      method: "GET",
      params,
    });

export type GetStocksBarsLatestOptions = {
  symbols: string;
  feed?: string;
  currency?: string;
};

export type StocksBarsLatest = {
  bars: { [symbol: string]: StocksBar };
};

export const getStocksBarsLatest =
  (context: ClientContext) => (params: GetStocksBarsLatestOptions) =>
    context.request<StocksBarsLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/bars/latest",
      method: "GET",
      params,
    });

export type GetForexRatesOptions = {
  currency_pairs: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  sort?: Sort;
  page_token?: string;
};

export type ForexRate = {
  bp: number;
  mp: number;
  ap: number;
  t: string;
};

export type ForexRates = {
  next_page_token: string;
  rates: {
    [currencyPair: string]: ForexRate[];
  };
};

export const getForexRates =
  (context: ClientContext) => (params: GetForexRatesOptions) =>
    context.request<ForexRates>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/forex/rates",
      method: "GET",
      params,
    });

export type ForexRatesLatest = {
  rates: {
    [currencyPair: string]: ForexRate;
  };
};

export type GetForexRatesLatestOptions = {
  currency_pairs: string;
};

export const getLatestForexRates =
  (context: ClientContext) => (params: GetForexRatesLatestOptions) =>
    context.request<ForexRatesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/forex/latest/rates",
      method: "GET",
      params,
    });

export type GetStocksSnapshotsOptions = {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
};

export type StockTrade = {
  t: string;
  p: number;
  s: number;
  c: string[];
  i: number;
  z: string;
};

export type StockQuote = {
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

export type StockBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export type StockSnapshots = {
  snapshots: {
    [symbol: string]: {
      latest_trade: StockTrade;
      latest_quote: StockQuote;
      minute_bar: StockBar;
      daily_bar: StockBar;
      prev_daily_bar: StockBar;
    };
  };
};

export const getStocksSnapshots =
  (context: ClientContext) => (params: GetStocksSnapshotsOptions) =>
    context.request<StockSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/stocks/snapshots",
      method: "GET",
      params,
    });

export type StocksAuctions = {
  auctions: { [symbol: string]: StocksAuction[] };
  next_page_token: Nullable<string>;
};

export type StocksAuction = {
  d: string;
  o: StocksAuctionPrice[];
  c: StocksAuctionPrice[];
};

export type StocksAuctionPrice = {
  c: string;
  p: number;
  t: string;
  x: string;
};

export type GetStocksAuctionsOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  page_token?: string;
  sort?: string;
};

export const getStocksAuctions =
  (context: ClientContext) => (params: GetStocksAuctionsOptions) =>
    context.request<StocksAuctions>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/auctions",
      method: "GET",
      params,
    });

export type GetStocksConditionsOptions = {
  tickType: string;
  tape: string;
};

export type StocksConditions = {
  conditions: { [code: string]: string };
};

export const getStocksConditions =
  (context: ClientContext) => (params: GetStocksConditionsOptions) =>
    context.request<StocksConditions>({
      baseURL: baseURLs.marketData,
      path: `/v2/stocks/meta/conditions/${params.tickType}`,
      method: "GET",
      params: { tape: params.tape },
    });

export type StocksExchangeCodes = {
  exchanges: { [code: string]: string };
};

export const getStocksExchangeCodes = (context: ClientContext) => () =>
  context.request<StocksExchangeCodes>({
    baseURL: baseURLs.marketData,
    path: "/v2/stocks/meta/exchanges",
    method: "GET",
  });

export type GetStocksTradesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  asof?: string;
  feed?: string;
  sip?: string;
  page_token?: string;
  sort?: Sort;
};

export type StocksTrades = {
  trades: { [symbol: string]: StockTrade[] };
  next_page_token: Nullable<string>;
};

export const getStocksTrades =
  (context: ClientContext) => (params: GetStocksTradesOptions) =>
    context.request<StocksTrades>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/trades",
      method: "GET",
      params,
    });

export type GetStocksTradesLatestOptions = {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
};

export type StocksTradesLatest = {
  trades: { [symbol: string]: StockTrade };
};

export const getStocksTradesLatest =
  (context: ClientContext) => (params: GetStocksTradesLatestOptions) =>
    context.request<StocksTradesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v2/stocks/trades/latest",
      method: "GET",
      params,
    });

export type OptionsBars = {
  bars: OptionBar[];
  next_page_token: Nullable<string>;
};

export type OptionBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export type GetOptionsBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export const getOptionsBars =
  (context: ClientContext) => (params: GetOptionsBarsOptions) =>
    context.request<OptionsBars>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/bars",
      method: "GET",
      params,
    });

export type OptionsExchanges = {
  [exchangeCode: string]: string;
};

export const getOptionsExchanges = (context: ClientContext) => () =>
  context.request<OptionsExchanges>({
    baseURL: baseURLs.marketData,
    path: "/v1beta1/options/meta/exchanges",
    method: "GET",
  });

export type OptionsSnapshotsTrade = {
  t: string;
  x: string;
  p: number;
  s: number;
  c: string;
};

export type OptionsSnapshotsQuote = {
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string;
};

export type OptionsSnapshots = {
  snapshots: {
    [symbol: string]: {
      latest_trade: OptionsSnapshotsTrade;
      latest_quote: OptionsSnapshotsQuote;
    };
  };
};

export type GetOptionsSnapshotsOptions = {
  symbols: string;
  feed?: string;
};

export const getOptionsSnapshots =
  (context: ClientContext) => (params: GetOptionsSnapshotsOptions) =>
    context.request<OptionsSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/snapshots",
      method: "GET",
      params,
    });

export type GetOptionsTradesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type OptionsTrades = {
  trades: {
    [symbol: string]: OptionsSnapshotsTrade[];
  };
  next_page_token: Nullable<string>;
};

export const getOptionsTrades =
  (context: ClientContext) => (params: GetOptionsTradesOptions) =>
    context.request<OptionsTrades>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/trades",
      method: "GET",
      params,
    });

export type OptionsTradesLatest = {
  trades: {
    [symbol: string]: OptionsSnapshotsTrade[];
  };
  next_page_token: Nullable<string>;
};

export type GetOptionsTradesLatestOptions = {
  symbols: string;
  feed?: string;
};

export const getOptionsTradesLatest =
  (context: ClientContext) => (params: GetOptionsTradesLatestOptions) =>
    context.request<OptionsTradesLatest>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/options/trades/latest",
      method: "GET",
      params,
    });

export type GetCryptoBarsOptions = {
  symbols: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type CryptoBars = {
  bars: {
    [symbol: string]: CryptoBar[];
  };
  next_page_token: Nullable<string>;
};

export type CryptoBar = {
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n: number;
  vw: number;
};

export const getCryptoBars =
  (context: ClientContext) => (params: GetCryptoBarsOptions) =>
    context.request<CryptoBars>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/bars",
      method: "GET",
      params,
    });

export type GetCryptoBarsLatestOptions = {
  loc: string;
  symbols: string;
};

export type CryptoBarsLatest = {
  bars: { [symbol: string]: CryptoBar };
};

export const getLatestCryptoBars =
  (context: ClientContext) => (params: GetCryptoBarsLatestOptions) =>
    context.request<CryptoBarsLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/bars`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type GetCryptoQuotesOptions = {
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export type CryptoQuote = {
  t: string;
  bp: number;
  bs: number;
  ap: number;
  as: number;
};

export type CryptoQuotes = {
  quotes: {
    [symbol: string]: CryptoQuote[];
  };
  next_page_token: Nullable<string>;
};

export const getCryptoQuotes =
  (context: ClientContext) => (params: GetCryptoQuotesOptions) =>
    context.request<CryptoQuotes>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/quotes",
      method: "GET",
      params,
    });

export type CryptoQuotesLatest = {
  quotes: { [symbol: string]: CryptoQuote };
};

export type GetCryptoQuotesLatestOptions = {
  loc: string;
  symbols: string;
};

export const getCryptoQuotesLatest =
  (context: ClientContext) => (params: GetCryptoQuotesLatestOptions) =>
    context.request<CryptoQuotesLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/quotes`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type CryptoTrade = {
  t: string;
  p: number;
  s: number;
  tks: string;
  i: number;
};

export type CryptoSnapshots = {
  snapshots: {
    [symbol: string]: {
      daily_bar: CryptoBar;
      latest_quote: CryptoQuote;
      latest_trade: CryptoTrade;
      minute_bar: CryptoBar;
      prev_daily_bar: CryptoBar;
    };
  };
};

export type GetCryptoSnapshotsOptions = {
  loc: string;
  symbols: string;
};

export const getCryptoSnapshots =
  (context: ClientContext) => (params: GetCryptoSnapshotsOptions) =>
    context.request<CryptoSnapshots>({
      baseURL: baseURLs.marketData,
      path: "/v1beta1/crypto/snapshots",
      method: "GET",
      params,
    });

export type GetCryptoTradesOptions = {
  loc: string;
  symbols: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: string;
};

export type CryptoTrades = {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: Nullable<string>;
};

export const getCryptoTrades =
  (context: ClientContext) => (params: GetCryptoTradesOptions) =>
    context.request<CryptoTrades>({
      baseURL: baseURLs.marketData,
      path: "/v1beta3/crypto/:loc/trades",
      method: "GET",
      params,
    });

export type CryptoTradesLatest = {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: Nullable<string>;
};

export type GetCryptoTradesLatestOptions = {
  loc: string;
  symbols: string;
};

export const getCryptoTradesLatest =
  (context: ClientContext) => (params: GetCryptoTradesLatestOptions) =>
    context.request<CryptoTradesLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/trades`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type CryptoOrderbooksLatest = {
  orderbooks: { [symbol: string]: CryptoOrderbook };
};

export type CryptoOrderbook = {
  t: string;
  b: CryptoOrderbookEntry[];
  a: CryptoOrderbookEntry[];
};

export type CryptoOrderbookEntry = {
  p: number;
  s: number;
};

export type GetCryptoOrderbooksLatestOptions = {
  loc: string;
  symbols: string;
};

export const getLatestCryptoOrderbooks =
  (context: ClientContext) => (params: GetCryptoOrderbooksLatestOptions) =>
    context.request<CryptoOrderbooksLatest>({
      baseURL: baseURLs.marketData,
      path: `/v1beta3/crypto/${params.loc}/latest/orderbooks`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });
