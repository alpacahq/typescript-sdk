import { ClientContext } from "../factory/createClient.ts";

export interface CorporateActionAnnouncement {
  id: string;
  corporate_actions_id: string;
  ca_type: string;
  ca_sub_type: string;
  initiating_symbol: string;
  initiating_original_cusip: string;
  target_symbol: string;
  target_original_cusip: string;
  declaration_date: string;
  expiration_date: string;
  record_date: string;
  payable_date: string;
  cash: string;
  old_rate: string;
  new_rate: string;
}

export interface AnnouncementsQueryParams {
  ca_types?: string;
  since?: string;
  until?: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
  announcement_id?: string;
}

export interface CryptoFundingWallet {
  chain: string;
  address: string;
  created_at: string;
}

export interface WhitelistedAddressParams {
  address: string;
  asset: string;
}
export interface WhitelistedAddress {
  id: string;
  chain: string;
  asset: string;
  address: string;
  status: "ACTIVE" | "PENDING";
  created_at: string;
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface WithdrawalParams {
  amount: string;
  address: string;
  asset: string;
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface CryptoFundingQueryParams {
  asset?: string;
}

export interface CryptoFundingResponse {
  wallets?: CryptoFundingWallet | CryptoFundingWallet[];
  transfers?: CryptoFundingTransfer[];
}

export interface CryptoFundingWallet {
  chain: string;
  address: string;
  created_at: string; // Timestamp (RFC3339) of account creation
}

export interface WithdrawalParams {
  amount: string;
  address: string;
  asset: string;
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface TransactionParams {
  asset: string;
  from_address: string;
  to_address: string;
  amount: string;
}

export interface TransactionFeeResponse {
  fee: string;
}
export interface OptionContractsQueryParams {
  underlying_symbols?: string;
  status?: string;
  active?: boolean;
  expiration_date?: string;
  expiration_date_gte?: string;
  expiration_date_lte?: string;
  root_symbol?: string;
  type?: string;
  style?: string;
  strike_price_gte?: number;
  strike_price_lte?: number;
  page_token?: string;
  limit?: number;
  symbol_or_id?: string;
}

export interface OptionContract {
  id: string;
  symbol: string;
  name: string;
  status: string;
  tradable: boolean;
  expiration_date: string;
  root_symbol?: string;
  underlying_symbol: string;
  underlying_asset_id: string;
  type: string;
  style: string;
  strike_price: string;
  size: string;
  open_interest?: string;
  open_interest_date?: string;
  close_price?: string;
  close_price_date?: string;
  next_page_token: string | null;
}

export type BaseOrder = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: string | null;
  expired_at: string | null;
  canceled_at: string | null;
  failed_at: string | null;
  replaced_at: string | null;
  replaced_by: string | null;
  replaces: string | null;
  asset_id: string;
  notional: string | null;
  qty: string;
  filled_qty: string;
  filled_avg_price: string | null;
  order_class: string;
  order_type: string;
  type: string;
  side: string;
  time_in_force: string;
  limit_price: string | null;
  stop_price: string | null;
  status: string;
  extended_hours: boolean;
  legs: any | null;
  trail_percent: string | null;
  trail_price: string | null;
  hwm: string | null;
  subtag: string | null;
  source: string | null;
};

export type EquityOrder = BaseOrder & {
  asset_class: "us_equity";
  symbol: string;
};

export type OptionsOrder = BaseOrder & {
  asset_class: "us_option";
  symbol: string;
  order_class: "simple";
};

export type CryptoOrder = BaseOrder & {
  asset_class: "crypto";
  symbol: string;
};

export type Order = EquityOrder | OptionsOrder | CryptoOrder;

export interface MarketClock {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
}

export type Asset = {
  id: string;
  class: string;
  exchange: string;
  symbol: string;
  name: string;
  status: string;
  tradable: boolean;
  marginable: boolean;
  shortable: boolean;
  easy_to_borrow: boolean;
  fractionable: boolean;
  maintenance_margin_requirement: string;
  attributes: string[];
};

export interface PortfolioHistoryOptions {
  period?: string;
  timeframe?: string;
  intraday_reporting?: string;
  start?: string;
  end?: string;
  pnl_reset?: string;
}

export interface PortfolioHistory {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
  base_value_asof: string;
  timeframe: string;
}

export interface AccountConfigurations {
  dtbpCheck: "both" | "entry" | "exit";
  tradeConfirmEmail: "all" | "none";
  suspendTrade: boolean;
  noShorting: boolean;
  fractionalTrading: boolean;
  maxMarginMultiplier: "1" | "2";
  maxOptionsTradingLevel: 0 | 1 | 2;
  pdtCheck: "both" | "entry" | "exit";
  ptpNoExceptionEntry: boolean;
}

export interface PatchAccountConfigurationsOptions {
  dtbp_check?: string;
  trade_confirm_email?: string;
  suspend_trade?: boolean;
  no_shorting?: boolean;
  fractional_trading?: boolean;
  max_margin_multiplier?: string;
  max_options_trading_level?: number;
  pdt_check?: string;
  ptp_no_exception_entry?: boolean;
}

interface GetActivitiesOptions {
  activityType?: string;
  activityTypes?: string;
  date?: string;
  until?: string;
  after?: string;
  direction?: string;
  pageSize?: number;
  pageToken?: string;
  category?: string;
}

export interface AccountTradingActivity {
  activity_type: string;
  id: string;
  cum_qty: string;
  leaves_qty: string;
  price: string;
  qty: string;
  side: string;
  symbol: string;
  transaction_time: string;
  order_id: string;
  type: string;
  order_status: string;
}

export interface AccountNonTradeActivity {
  activity_type: string;
  id: string;
  date: string;
  net_amount: string;
  symbol?: string;
  qty?: string;
  per_share_amount?: string;
}

export type AccountActivity = AccountTradingActivity | AccountNonTradeActivity;

export interface GetOrdersOptions {
  status?: string;
  limit?: number;
  after?: string;
  until?: string;
  direction?: string;
  nested?: boolean;
  symbols?: string;
  side?: string;
  order_id?: string;
}

export type Orders<T extends GetOrdersOptions> = T extends {
  order_id: string;
}
  ? Order
  : Order[];

export interface PostOrderOptions {
  symbol: string;
  qty?: string | number;
  notional?: string;
  side: string;
  type: string;
  time_in_force: string;
  limit_price?: string;
  stop_price?: string;
  trail_price?: string;
  trail_percent?: string;
  extended_hours?: boolean;
  client_order_id?: string;
  order_class?: string;
  take_profit?: {
    limit_price: string;
  };
  stop_loss?: {
    stop_price: string;
    limit_price?: string;
  };
}

export type PatchOrderOptions = {
  qty?: string | number;
  time_in_force?: string;
  limit_price?: string;
  stop_price?: string;
  trail?: string;
  client_order_id?: string;
  order_id: string;
};

export type CancelOrdersOptions = {
  order_id?: string;
};

export type GetPositionsOptions = {
  symbol?: string;
  asset_id?: string;
};

export interface Position {
  asset_id: string;
  symbol: string;
  exchange: string;
  asset_class: string;
  avg_entry_price: string;
  qty: string | number;
  qty_available: string;
  side: string;
  market_value: string;
  cost_basis: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  unrealized_intraday_pl: string;
  unrealized_intraday_plpc: string;
  current_price: string;
  lastday_price: string;
  change_today: string;
  asset_marginable: boolean;
}

export type Positions<T extends GetPositionsOptions> = T extends
  | { symbol: string }
  | { asset_id: string }
  ? Position
  : Position[];

export interface DeletePositionOptions {
  symbol_or_asset_id?: string;
  cancel_orders?: boolean;
  qty?: number;
  percentage?: number;
  symbol?: string;
  asset_id?: string;
}

export type PostExerciseOptions =
  | { symbol: string; contract_id?: never }
  | { symbol?: never; contract_id: string };

export interface CreateWatchlistParams {
  name: string;
  symbols: string[] | null;
}

export interface AddAssetToWatchlistParams {
  name: string;
  symbol: string;
}

export interface DeleteSymbolFromWatchlistParams {
  watchlistId: string;
  symbol: string;
}

export interface DeleteWatchlistByNameParams {
  name: string;
}

export interface GetWatchlistByNameParams {
  name: string;
}

export interface UpdateWatchlistParams {
  name: string;
  symbols: string[] | null;
  watchlist_id: string;
}

export interface UpdateWatchlistByNameParams {
  name: string;
  newName: string;
  symbols: string[] | null;
}

export interface Watchlist {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: Asset[];
}

export type GetWatchlistOptions = {
  watchlist_id?: string;
};

export type DeleteWatchlistOptions = {
  watchlist_id: string;
};

export type MarketCalendarOptions = {
  start?: string;
  end?: string;
  dateType?: "TRADING" | "SETTLEMENT";
};

export interface MarketCalendar {
  date: string;
  open: string;
  close: string;
  settlement_date: string;
}

export type GetAccountActivitiesByTypeOptions = {
  type: string;
};

type GetAssetOptions = {
  symbol_or_asset_id?: string;
};

type GetAssetsOptions = {
  status?: string;
  asset_class?: string;
  exchange?: string;
  attributes?: string[];
};

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
  bp: number; // Bid price
  mp: number; // Mid price
  ap: number; // Ask price
  t: string; // Timestamp
}

export interface HistoricalForexRatesResponse {
  next_page_token: string;
  rates: {
    [currencyPair: string]: HistoricalForexRate[];
  };
}

export interface HistoricalForexRate {
  bp: number; // Bid price
  mp: number; // Mid price
  ap: number; // Ask price
  t: string; // Timestamp
}
export interface HistoricalBarsResponse {
  bars: { [symbol: string]: CryptoBar[] };
  next_page_token: string | null;
}

export interface CryptoBar {
  t: string; // Timestamp
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
  v: number; // Volume
  n: number; // Trade count
  vw: number; // Volume weighted average price
}

export interface LatestBarsResponse {
  bars: { [symbol: string]: CryptoBar };
}

export interface LatestOrderbooksResponse {
  orderbooks: { [symbol: string]: CryptoOrderbook };
}

export interface CryptoOrderbook {
  t: string; // Timestamp
  b: OrderbookEntry[]; // Bid orderbook entries
  a: OrderbookEntry[]; // Ask orderbook entries
}

export interface OrderbookEntry {
  p: number; // Price
  s: number; // Size
}

export interface LatestQuotesResponse {
  quotes: { [symbol: string]: CryptoQuote };
}

export interface CryptoQuote {
  t: string; // Timestamp
  bp: number; // Bid price
  bs: number; // Bid size
  ap: number; // Ask price
  as: number; // Ask size
}

export interface LatestTradesResponse {
  trades: { [symbol: string]: CryptoTrade };
}

export interface CryptoTrade {
  t: string; // Timestamp
  p: number; // Price
  s: number; // Size
  tks: string; // Trade side (S: Sell, B: Buy)
  i: number; // Trade ID
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
  t: string; // Timestamp
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
  v: number; // Volume
  vw: number; // Volume weighted average price
  n: number; // Number of trades
}

interface QuoteData {
  t: string; // Timestamp
  bp: number; // Bid price
  bs: number; // Bid size
  ap: number; // Ask price
  as: number; // Ask size
}

interface TradeData {
  t: string; // Timestamp
  p: number; // Trade price
  s: number; // Trade size
  tks: string; // Trade side (Buy or Sell)
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
  t: string; // Timestamp in RFC-3339 format
  o: number; // Opening price
  h: number; // High price
  l: number; // Low price
  c: number; // Closing price
  v: number; // Bar volume
  n: number; // Trade count in the bar
  vw: number; // Volume weighted average price
}

export interface OptionExchangeMapping {
  [exchangeCode: string]: string;
}

export interface LatestQuotesResponse {
  // quotes: {
  //   [symbol: string]: {
  //     t: string; // Timestamp in RFC-3339 format
  //     ax: string; // Ask exchange
  //     ap: number; // Ask price
  //     as: number; // Ask size
  //     bx: string; // Bid exchange
  //     bp: number; // Bid price
  //     bs: number; // Bid size
  //     c: string; // Condition
  //   };
  // };
}

export interface LatestTradesResponse {
  // trades: {
  //   [symbol: string]: {
  //     t: string; // Timestamp in RFC-3339 format
  //     x: string; // Exchange code
  //     p: number; // Trade price
  //     s: number; // Trade size
  //     c: string; // Condition
  //   };
  // };
}

export interface HistoricalTradesResponse {
  trades: {
    [symbol: string]: {
      t: string; // Timestamp in RFC-3339 format
      x: string; // Exchange code
      p: number; // Trade price
      s: number; // Trade size
      c: string; // Condition
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
  t: string; // Timestamp in RFC-3339 format
  x: string; // Exchange code
  p: number; // Trade price
  s: number; // Trade size
  c: string; // Condition
}

interface QuoteSnapshot {
  t: string; // Timestamp in RFC-3339 format
  ax: string; // Ask exchange code
  ap: number; // Ask price
  as: number; // Ask size
  bx: string; // Bid exchange code
  bp: number; // Bid price
  bs: number; // Bid size
  c: string; // Condition
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
  d: string; // Date
  o: AuctionPrice[]; // Opening auction prices
  c: AuctionPrice[]; // Closing auction prices
}

interface AuctionPrice {
  c: string; // Condition
  p: number; // Price
  t: string; // Timestamp
  x: string; // Auction type
}

export interface HistoricalBarsResponse {
  bars: { [symbol: string]: Bar[] };
  next_page_token: string | null;
}

interface Bar {
  t: string; // Timestamp
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
  v: number; // Volume
  n: number; // Number of trades
  vw: number; // Volume weighted average price
}

export interface LatestBarsResponse {
  bars: { [symbol: string]: Bar };
}

interface Bar {
  t: string; // Timestamp
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
  v: number; // Volume
  n: number; // Number of trades
  vw: number; // Volume weighted average price
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

export interface LatestQuotesResponse {
  // quotes: {
  //   [symbol: string]: LatestQuote;
  // };
}

export interface LatestQuote {
  t: string; // Timestamp
  ax: string; // Ask Exchange
  ap: number; // Ask Price
  as: number; // Ask Size
  bx: string; // Bid Exchange
  bp: number; // Bid Price
  bs: number; // Bid Size
  c: string[]; // Conditions
  z: string; // Tape
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
    t: string; // Timestamp
    x: string; // Exchange
    p: number; // Price
    s: number; // Size
    c: string[]; // Conditions
    i: number; // Trade ID
    z: string; // Tape
  };
  latestQuote: {
    t: string; // Timestamp
    ax: string; // Ask Exchange
    ap: number; // Ask Price
    as: number; // Ask Size
    bx: string; // Bid Exchange
    bp: number; // Bid Price
    bs: number; // Bid Size
    c: string[]; // Conditions
    z: string; // Tape
  };
  minuteBar: {
    t: string; // Timestamp
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
    n: number; // Number of Trades
    vw: number; // Volume Weighted Average Price
  };
  dailyBar: {
    t: string; // Timestamp
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
    n: number; // Number of Trades
    vw: number; // Volume Weighted Average Price
  };
  prevDailyBar: {
    t: string; // Timestamp
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
    n: number; // Number of Trades
    vw: number; // Volume Weighted Average Price
  };
}

export interface TradeParams {
  symbols: string;
  start?: string; // RFC-3339 or YYYY-MM-DD format
  end?: string; // RFC-3339 or YYYY-MM-DD format
  limit?: number;
  asof?: string; // YYYY-MM-DD format
  feed?: "sip" | "iex" | "otc";
  sip?: string; // ISO 4217 format
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
  t: string; // Timestamp
  x: string; // Exchange
  p: number; // Price
  s: number; // Size
  c: string[]; // Conditions
  i: number; // Trade ID
  z: string; // Tape
}

export interface LatestTradeParams {
  symbols: string;
  feed?: "sip" | "iex" | "otc";
  sip?: string; // ISO 4217 format
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

export default ({ request }: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        request<unknown>({
          path: "/v2/account",
        }),
      portfolio: {
        history: {
          get: (options: PortfolioHistoryOptions = {}) =>
            request<PortfolioHistory>({
              path: "/v2/account/portfolio/history",
              method: "GET",
              params: options,
            }),
        },
      },
      configurations: {
        get: () =>
          request<AccountConfigurations>({
            path: "/v2/account/configurations",
          }),
        patch: (options: PatchAccountConfigurationsOptions) =>
          request<void>({
            path: "/v2/account/configurations",
            method: "PATCH",
            data: options,
          }),
      },
      activities: {
        get: ({ activityType, ...options }: GetActivitiesOptions = {}) =>
          request<AccountActivity[]>({
            path: activityType
              ? `/v2/account/activities/${activityType}`
              : "/v2/account/activities",
            method: "GET",
            params: options,
          }),
      },
    },
    orders: {
      get: ({ order_id, ...options }: GetOrdersOptions = {}) =>
        request<Orders<GetOrdersOptions>>({
          path: order_id ? `/v2/orders/${order_id}` : "/v2/orders",
          method: "GET",
          params: options,
        }),
      post: (options: PostOrderOptions) =>
        request<Order>({
          path: "/v2/orders",
          method: "POST",
          data: options,
        }),
      patch: ({ order_id, ...options }: PatchOrderOptions) =>
        request<Order>({
          path: `/v2/orders/${order_id}`,
          method: "PATCH",
          data: options,
        }),
      delete: ({ order_id }: CancelOrdersOptions) =>
        request<void>({
          path: order_id ? `/v2/orders/${order_id}` : "/v2/orders",
          method: "DELETE",
        }),
    },
    positions: {
      get: <T extends GetPositionsOptions>({ symbol, asset_id }: T) =>
        request<Positions<T>>({
          path:
            symbol || asset_id
              ? `/v2/positions/${symbol || asset_id}`
              : "/v2/positions",
          method: "GET",
        }),
      delete: ({ symbol_or_asset_id, ...options }: DeletePositionOptions) =>
        request<Order>({
          path: symbol_or_asset_id
            ? `/v2/positions/${symbol_or_asset_id}`
            : "/v2/positions",
          method: "DELETE",
          params: options,
        }),
      exercise: {
        post: (options: PostExerciseOptions) =>
          request<void>({
            path: `/v2/positions/${
              "symbol" in options ? options.symbol : options.contract_id
            }/exercise`,
            method: "POST",
          }),
      },
    },
    watchlists: {
      get: ({ watchlist_id }: GetWatchlistOptions = {}) =>
        request<Watchlist>({
          path: watchlist_id
            ? `/v2/watchlists/${watchlist_id}`
            : "/v2/watchlists",
        }),
      post: (options: CreateWatchlistParams) =>
        request<Watchlist>({
          path: "/v2/watchlists",
          method: "POST",
          data: options,
        }),
      patch: (options: UpdateWatchlistParams) =>
        request<Watchlist>({
          path: `/v2/watchlists/${options.watchlist_id}`,
          method: "PATCH",
          data: options,
        }),
      delete: (options: DeleteWatchlistOptions) =>
        request<void>({
          path: `/v2/watchlists/${options.watchlist_id}`,
          method: "DELETE",
        }),
    },
    calendar: {
      get: (options: MarketCalendarOptions = {}) =>
        request<MarketCalendar[]>({
          path: "/v2/calendar",
          method: "GET",
          params: options,
        }),
    },
    clock: {
      get: () =>
        request<MarketClock>({
          path: "/v2/clock",
        }),
    },
    assets: {
      get: ({ symbol_or_asset_id, ...options }: GetAssetOptions = {}) =>
        request<Asset>({
          path: symbol_or_asset_id
            ? `/v2/assets/${symbol_or_asset_id}`
            : "/v2/assets",
          method: "GET",
          params: options,
        }),
    },
    options: {
      contracts: {
        get: ({ symbol_or_id, ...options }: OptionContractsQueryParams) =>
          request<OptionContract[]>({
            path: symbol_or_id
              ? `/v2/options/contracts/${symbol_or_id}`
              : "/v2/options/contracts",
            method: "GET",
            params: options,
          }),
      },
    },
    corporate_actions: {
      announcements: {
        get: ({ announcement_id, ...queryParams }: AnnouncementsQueryParams) =>
          request<CorporateActionAnnouncement[]>({
            path: announcement_id
              ? `/v2/corporate_actions/announcements/${announcement_id}`
              : "/v2/corporate_actions/announcements",
            method: "GET",
            params: queryParams,
          }),
      },
    },
    wallets: {
      get: (options: { asset: string }) =>
        request<CryptoFundingWallet | CryptoFundingWallet[]>({
          path: "/v2/wallets",
          method: "GET",
          params: options,
        }),
      whitelists: {
        get: () =>
          request<WhitelistedAddress[]>({
            path: "/v2/wallets/whitelists",
            method: "GET",
          }),
        post: (whitelistedAddressParams: WhitelistedAddressParams) =>
          request<WhitelistedAddress>({
            path: "/v2/wallets/whitelists",
            method: "POST",
            data: whitelistedAddressParams,
          }),
        delete: (whitelistedAddressId: string) =>
          request<void>({
            path: `/v2/wallets/whitelists/${whitelistedAddressId}`,
            method: "DELETE",
          }),
      },
      fees: {
        estimate: {
          get: (transactionParams: TransactionParams) =>
            request<TransactionFeeResponse>({
              path: "/v2/wallets/fees/estimate",
              method: "GET",
              params: transactionParams,
            }),
        },
      },
      transfers: {
        get: (options: { asset?: string; transfer_id?: string }) =>
          request<CryptoFundingResponse | CryptoFundingTransfer>({
            path: options.transfer_id
              ? `/v2/wallets/transfers/${options.transfer_id}`
              : "/v2/wallets/transfers",
            method: "GET",
            params: options,
          }),
        post: (withdrawalParams: WithdrawalParams) =>
          request<CryptoFundingTransfer>({
            path: "/v2/wallets/transfers",
            method: "POST",
            data: withdrawalParams,
          }),
      },
    },
  },
});
