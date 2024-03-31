import { ClientContext } from "../factory/createClient.ts";

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
    next_page_token: string | null;
  };
};

export type CorporateActionsOptions = {
  symbols: string;
  types?: string;
  start?: string;
  end?: string;
  limit?: number;
  page_token?: string;
  sort?: Sort;
};

export const getCorporateActions =
  (context: ClientContext) => (params: CorporateActionsOptions) =>
    context.request<CorporateActions>({
      path: "/v1beta1/corporate-actions",
      method: "GET",
      params,
    });

export type ForexRate = {
  bp: number;
  mp: number;
  ap: number;
  t: string;
};

export type LatestForexRates = {
  rates: {
    [currencyPair: string]: ForexRate;
  };
};

export type GetLatestForexRatesOptions = {
  currency_pairs: string;
};

export const getLatestForexRates =
  (context: ClientContext) => (params: GetLatestForexRatesOptions) =>
    context.request<LatestForexRates>({
      path: "/v1beta1/forex/latest/rates",
      method: "GET",
      params,
    });

export type GetHistoricalForexRatesOptions = {
  currency_pairs: string;
  timeframe: string;
  start?: string;
  end?: string;
  limit?: number;
  sort?: Sort;
  page_token?: string;
};

export type HistoricalForexRate = {
  bp: number;
  mp: number;
  ap: number;
  t: string;
};

export type HistoricalForexRates = {
  next_page_token: string;
  rates: {
    [currencyPair: string]: HistoricalForexRate[];
  };
};

export const getHistoricalForexRates =
  (context: ClientContext) => (params: GetHistoricalForexRatesOptions) =>
    context.request<HistoricalForexRates>({
      path: "/v1beta1/forex/rates",
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
    path: "/v1beta1/logos/:symbol",
    method: "GET",
    params,
  });

export interface News {
  news: NewsArticle[];
  next_page_token: string | null;
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
  url: string | null;
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
    path: "/v1beta1/news",
    method: "GET",
    params,
  });

export type MostActives = {
  most_actives: MostActiveStock[];
  last_updated: string;
};

export type MostActiveStock = {
  symbol: string;
  volume: number;
  trade_count: number;
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

export type GetMostActivesOptions = {
  by?: string;
  top?: number;
};

export const getMostActives =
  (context: ClientContext) => (params: GetMostActivesOptions) =>
    context.request<MostActives>({
      path: "/v1beta1/screener/stocks/most-actives",
      method: "GET",
      params,
    });

export type GetMarketMoversOptions = {
  by?: string;
  top?: number;
};

export const getMarketMovers =
  (context: ClientContext) => (params: GetMarketMoversOptions) =>
    context.request<MarketMovers>({
      path: "/v1beta1/screener/stocks/market-movers",
      method: "GET",
      params,
    });

export type OptionsBars = {
  bars: OptionBar[];
  next_page_token: string | null;
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
      path: "/v1beta1/options/bars",
      method: "GET",
      params,
    });

export type OptionsExchanges = {
  [exchangeCode: string]: string;
};

export const getOptionsExchanges = (context: ClientContext) => () =>
  context.request<OptionsExchanges>({
    path: "/v1beta1/options/meta/exchanges",
    method: "GET",
  });

export type OptionsTradeSnapshot = {
  t: string;
  x: string;
  p: number;
  s: number;
  c: string;
};

export type OptionsQuoteSnapshot = {
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
      latest_trade: OptionsTradeSnapshot;
      latest_quote: OptionsQuoteSnapshot;
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
    [symbol: string]: OptionsTradeSnapshot[];
  };
  next_page_token: string | null;
};

export const getOptionsTrades =
  (context: ClientContext) => (params: GetOptionsTradesOptions) =>
    context.request<OptionsTrades>({
      path: "/v1beta1/options/trades",
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
  next_page_token: string | null;
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
      path: "/v1beta1/crypto/bars",
      method: "GET",
      params,
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
  next_page_token: string | null;
};

export const getCryptoQuotes =
  (context: ClientContext) => (params: GetCryptoQuotesOptions) =>
    context.request<CryptoQuotes>({
      path: "/v1beta1/crypto/quotes",
      method: "GET",
      params,
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
      path: "/v1beta1/crypto/snapshots",
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
      path: "/v1beta1/stocks/snapshots",
      method: "GET",
      params,
    });

export type StocksAuctions = {
  auctions: { [symbol: string]: StocksAuction[] };
  next_page_token: string | null;
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
      path: "/v2/stocks/auctions",
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
  next_page_token: string | null;
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

export const getHistoricalBars =
  (context: ClientContext) => (params: GetStocksBarsOptions) =>
    context.request<StocksBars>({
      path: "/v2/stocks/bars",
      method: "GET",
      params,
    });

export type GetLatestStocksBarsOptions = {
  symbols: string;
  feed?: string;
  currency?: string;
};

export type LatestStocksBars = {
  bars: { [symbol: string]: StocksBar };
};

export const getLatestStocksBars =
  (context: ClientContext) => (params: GetLatestStocksBarsOptions) =>
    context.request<LatestStocksBars>({
      path: "/v2/stocks/bars/latest",
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
  next_page_token: string | null;
};

export const getCryptoTrades =
  (context: ClientContext) => (params: GetCryptoTradesOptions) =>
    context.request<CryptoTrades>({
      path: "/v1beta3/crypto/:loc/trades",
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
      path: `/v2/stocks/meta/conditions/${params.tickType}`,
      method: "GET",
      params: { tape: params.tape },
    });

export type StocksExchangeCodes = {
  exchanges: { [code: string]: string };
};

export const getStocksExchangeCodes = (context: ClientContext) => () =>
  context.request<StocksExchangeCodes>({
    path: "/v2/stocks/meta/exchanges",
    method: "GET",
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
  next_page_token: string | null;
};

export const getStocksQuotes =
  (context: ClientContext) => (params: GetStocksQuotesOptions) =>
    context.request<StocksQuotes>({
      path: "/v2/stocks/quotes",
      method: "GET",
      params,
    });

export type GetLatestStocksTradesOptions = {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string;
};

export type LatestStocksTrades = {
  trades: { [symbol: string]: StockTrade };
};

export const getLatestStocksTrades =
  (context: ClientContext) => (params: GetLatestStocksTradesOptions) =>
    context.request<LatestStocksTrades>({
      path: "/v2/stocks/trades/latest",
      method: "GET",
      params,
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
  next_page_token: string | null;
};

export const getStocksTrades =
  (context: ClientContext) => (params: GetStocksTradesOptions) =>
    context.request<StocksTrades>({
      path: "/v2/stocks/trades",
      method: "GET",
      params,
    });

export type GetLatestCryptoBarsOptions = {
  loc: string;
  symbols: string;
};

export type LatestCryptoBars = {
  bars: { [symbol: string]: CryptoBar };
};

export const getLatestCryptoBars =
  (context: ClientContext) => (params: GetLatestCryptoBarsOptions) =>
    context.request<LatestCryptoBars>({
      path: `/v1beta3/crypto/${params.loc}/latest/bars`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type GetStocksLatestQuotesOptions = {
  symbols: string;
  feed?: string;
};

export type StocksLatestQuotes = {
  quotes: { [symbol: string]: StockQuote };
};

export const getStocksLatestQuotes =
  (context: ClientContext) => (params: GetStocksLatestQuotesOptions) =>
    context.request<StocksLatestQuotes>({
      path: "/v2/stocks/quotes/latest",
      method: "GET",
      params,
    });

export type LatestOptionsTrades = {
  trades: {
    [symbol: string]: OptionsTradeSnapshot[];
  };
  next_page_token: string | null;
};

export type GetOptionsLatestTradesOptions = {
  symbols: string;
  feed?: string;
};

export const getOptionsLatestTrades =
  (context: ClientContext) => (params: GetOptionsLatestTradesOptions) =>
    context.request<LatestOptionsTrades>({
      path: "/v1beta1/options/trades/latest",
      method: "GET",
      params,
    });

export type LatestCryptoOrderbooks = {
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

export type GetLatestCryptoOrderbooksOptions = {
  loc: string;
  symbols: string;
};

export const getLatestCryptoOrderbooks =
  (context: ClientContext) => (params: GetLatestCryptoOrderbooksOptions) =>
    context.request<LatestCryptoOrderbooks>({
      path: `/v1beta3/crypto/${params.loc}/latest/orderbooks`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type LatestStocksQuotes = {
  quotes: { [symbol: string]: StockQuote };
};

export type GetLatestStocksQuotesOptions = {
  symbols: string;
  feed?: string;
};

export const getLatestStocksQuotes =
  (context: ClientContext) => (params: GetLatestStocksQuotesOptions) =>
    context.request<LatestStocksQuotes>({
      path: "/v2/stocks/quotes/latest",
      method: "GET",
      params,
    });

export type LatestCryptoQuotes = {
  quotes: { [symbol: string]: CryptoQuote };
};

export type GetLatestCryptoQuotesOptions = {
  loc: string;
  symbols: string;
};

export const getLatestCryptoQuotes =
  (context: ClientContext) => (params: GetLatestCryptoQuotesOptions) =>
    context.request<LatestCryptoQuotes>({
      path: `/v1beta3/crypto/${params.loc}/latest/quotes`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });

export type LatestCryptoTrades = {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: string | null;
};

export type GetLatestCryptoTradesOptions = {
  loc: string;
  symbols: string;
};

export const getLatestCryptoTrades =
  (context: ClientContext) => (params: GetLatestCryptoTradesOptions) =>
    context.request<LatestCryptoTrades>({
      path: `/v1beta3/crypto/${params.loc}/latest/trades`,
      method: "GET",
      params: {
        symbols: params.symbols,
      },
    });
