import { ClientContext } from "../factory/createClient.ts";

export interface Account {
  id: string;
  account_number: string;
  status:
    | "ONBOARDING"
    | "SUBMISSION_FAILED"
    | "SUBMITTED"
    | "ACCOUNT_UPDATED"
    | "APPROVAL_PENDING"
    | "ACTIVE"
    | "REJECTED";
  currency: string;
  cash: string;
  portfolio_value: string;
  non_marginable_buying_power: string;
  accrued_fees: string;
  pending_transfer_in: string;
  pending_transfer_out: string;
  pattern_day_trader: boolean;
  trade_suspended_by_user: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
  account_blocked: boolean;
  created_at: string;
  shorting_enabled: boolean;
  long_market_value: string;
  short_market_value: string;
  equity: string;
  last_equity: string;
  multiplier: string;
  buying_power: string;
  initial_margin: string;
  maintenance_margin: string;
  sma: string;
  daytrade_count: number;
  last_maintenance_margin: string;
  daytrading_buying_power: string;
  regt_buying_power: string;
  options_buying_power: string;
  options_approved_level: 0 | 1 | 2;
  options_trading_level: 0 | 1 | 2;
}

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

export type CorporateActionDateType =
  | "declaration"
  | "ex"
  | "record"
  | "payable";

export type CorporateActionsAnnouncementsOptions = {
  get: {
    ca_types: string;
    since: string;
    until: string;
    symbol?: string;
    cusip?: string;
    date_type?: CorporateActionDateType;
    id?: string;
  };
};

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
  created_at: string;
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
  created_at: string;
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
  created_at: string;
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
  created_at: string;
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

export type OptionsContractsOptions = {
  get: {
    underlying_symbols?: string;
    status?: string;
    active?: boolean;
    expiration_date?: string;
    expiration_date_gte?: string;
    expiration_date_lte?: string;
    root_symbol?: string;
    type?: string;
    style?: string;
    strike_price_gte?: UnstableNumber;
    strike_price_lte?: UnstableNumber;
    page_token?: string;
    limit?: UnstableNumber;
    symbol_or_id?: string;
  };
};

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
  next_page_token: UnstableNumber;
}

export type BaseOrder = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: UnstableNumber;
  expired_at: UnstableNumber;
  canceled_at: UnstableNumber;
  failed_at: UnstableNumber;
  replaced_at: UnstableNumber;
  replaced_by: UnstableNumber;
  replaces: UnstableNumber;
  asset_id: string;
  notional: UnstableNumber;
  qty: string;
  filled_qty: string;
  filled_avg_price: UnstableNumber;
  order_class: string;
  order_type: string;
  type: string;
  side: string;
  time_in_force: string;
  limit_price: UnstableNumber;
  stop_price: UnstableNumber;
  status: string;
  extended_hours: boolean;
  // deno-lint-ignore no-explicit-any
  legs?: any;
  trail_percent: UnstableNumber;
  trail_price: UnstableNumber;
  hwm: UnstableNumber;
  subtag: UnstableNumber;
  source: UnstableNumber;
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

export interface GetActivitiesOptions {
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

export type DeletedOrderStatus = {
  id: string;
  status: number;
};

export type DeletedPositionStatus = {
  symbol: string;
  status: number;
  body: Order;
};

export type Orders<T extends OrderOptions["get"]> = T extends {
  order_id: string;
}
  ? Order
  : Order[];

export interface TakeProfit {
  limit_price?: string;
}

export interface StopLoss {
  stop_price?: string;
  limit_price?: string;
}

export type UnstableNumber = string | number;

export type TimeInForce = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";

export type PositionIntent =
  | "buy_to_open"
  | "buy_to_close"
  | "sell_to_open"
  | "sell_to_close";

export type OrderType =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop";

export type OrderSide = "buy" | "sell";

export type OrderClass = "simple" | "oco" | "oto" | "bracket" | "";

export type OrderDirection = "long" | "short";

export interface OrderOptions {
  post: {
    symbol: string;
    qty?: UnstableNumber;
    notional?: UnstableNumber;
    side: OrderSide;
    type: OrderType;
    time_in_force: TimeInForce;
    limit_price?: UnstableNumber;
    stop_price?: UnstableNumber;
    trail_price?: UnstableNumber;
    trail_percent?: UnstableNumber;
    extended_hours?: boolean;
    client_order_id?: string;
    order_class?: OrderClass;
    take_profit?: TakeProfit;
    stop_loss?: StopLoss;
    position_intent?: PositionIntent;
  };
  get: {
    status?: string;
    limit?: UnstableNumber;
    after?: string;
    until?: string;
    direction?: OrderDirection;
    nested?: boolean;
    symbols?: string;
    side?: OrderSide;
    order_id?: string;
  };
  patch: {
    qty?: UnstableNumber;
    time_in_force?: string;
    limit_price?: UnstableNumber;
    stop_price?: UnstableNumber;
    trail?: UnstableNumber;
    client_order_id?: string;
    order_id: string;
  };
  delete: {
    order_id?: string;
  };
}

export type PositionsExerciseOptions = {
  post:
    | { symbol: string; contract_id?: never }
    | { symbol?: never; contract_id: string };
};

export type PositionsOptions = {
  get: {
    symbol?: string;
    asset_id?: string;
  };
  delete: {
    symbol_or_asset_id?: string;
    cancel_orders?: boolean;
    qty?: UnstableNumber;
    percentage?: UnstableNumber;
  };
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

export type AssetsOptions = {
  get: {
    symbol_or_asset_id?: string;
    status?: string;
    asset_class?: string;
    exchange?: string;
    attributes?: string[];
  };
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
    next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
}
export interface NewsResponse {
  news: NewsArticle[];
  next_page_token: UnstableNumber;
}

export interface NewsArticle {
  id: number;
  headline: string;
  author: string;
  created_at: string;
  updated_at: string;
  summary: string;
  content: string;
  url: UnstableNumber;
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
  next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
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
  next_page_token: UnstableNumber;
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

type WebSocketEvent = "trade_updates" | "listening" | "authorization";

export default {
  rest: ({ request }: ClientContext) => ({
    v2: {
      account: {
        get: () =>
          request<Account>({
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
        get: (({ order_id, ...params }: OrderOptions["get"] = {}) =>
          request({
            path: order_id ? `/v2/orders/${order_id}` : "/v2/orders",
            method: "GET",
            params,
          })) as {
          (
            options: { order_id: string } & Omit<
              OrderOptions["get"],
              "order_id"
            >
          ): Promise<Order>;
          (options?: Omit<OrderOptions["get"], "order_id">): Promise<Order[]>;
        },
        post: (data: OrderOptions["post"]) =>
          request<Order>({
            path: "/v2/orders",
            method: "POST",
            data,
          }),
        patch: ({ order_id, ...data }: OrderOptions["patch"]) =>
          request<Order>({
            path: `/v2/orders/${order_id}`,
            method: "PATCH",
            data,
          }),
        delete: (({ order_id }: OrderOptions["delete"] = {}) =>
          request({
            path: order_id ? `/v2/orders/${order_id}` : "/v2/orders",
            method: "DELETE",
          })) as {
          (options: { order_id: string }): Promise<void>;
          (options?: Record<string, never>): Promise<DeletedOrderStatus[]>;
        },
      },
      positions: {
        get: (({ symbol, asset_id }: PositionsOptions["get"] = {}) =>
          request({
            path:
              symbol || asset_id
                ? `/v2/positions/${symbol || asset_id}`
                : "/v2/positions",
          })) as {
          (options: PositionsOptions["get"]): Promise<Position>;
          (options?: Record<string, never>): Promise<Position[]>;
        },
        delete: (({
          symbol_or_asset_id,
          ...params
        }: PositionsOptions["delete"] = {}) =>
          request({
            path: symbol_or_asset_id
              ? `/v2/positions/${symbol_or_asset_id}`
              : "/v2/positions",
            method: "DELETE",
            params,
          })) as {
          (options: PositionsOptions["delete"]): Promise<Order>;
          (options?: Record<string, never>): Promise<DeletedPositionStatus[]>;
        },
        exercise: {
          post: ({ symbol, contract_id }: PositionsExerciseOptions["post"]) =>
            request<void>({
              path: `/v2/positions/${symbol || contract_id}/exercise`,
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
        get: (({
          symbol_or_asset_id,
          ...params
        }: AssetsOptions["get"] | Record<string, never> = {}) =>
          request({
            path: symbol_or_asset_id
              ? `/v2/assets/${symbol_or_asset_id}`
              : "/v2/assets",
            method: "GET",
            params,
          })) as {
          (options: AssetsOptions["get"]): Promise<Asset>;
          (options?: Record<string, never>): Promise<Asset[]>;
        },
      },
      options: {
        contracts: {
          get: (({
            symbol_or_id,
            ...params
          }: OptionsContractsOptions["get"] | Record<string, never> = {}) =>
            request({
              path: symbol_or_id ? `/v2/assets/${symbol_or_id}` : "/v2/assets",
              method: "GET",
              params,
            })) as {
            (options: OptionsContractsOptions["get"]): Promise<OptionContract>;
            (options?: Record<string, never>): Promise<OptionContract[]>;
          },
        },
      },
      corporate_actions: {
        announcements: {
          get: ((
            {
              id,
              ...params
            }:
              | CorporateActionsAnnouncementsOptions["get"]
              | { id: string }
              | Record<string, never> = {
              ca_types: "",
              since: "",
              until: "",
            }
          ) =>
            request<
              CorporateActionAnnouncement | CorporateActionAnnouncement[]
            >({
              path: id
                ? `/v2/corporate_actions/announcements/${id}`
                : "/v2/corporate_actions/announcements",
              method: "GET",
              params,
            })) as {
            (options: CorporateActionsAnnouncementsOptions["get"]): Promise<
              CorporateActionAnnouncement[]
            >;
            (options: { id: string }): Promise<CorporateActionAnnouncement>;
            (options?: Record<string, never>): Promise<
              CorporateActionAnnouncement[]
            >;
          },
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
  }),
  websocket: ({ websocket }: ClientContext) => {
    return {
      on: (event: WebSocketEvent, callback: (data: any) => void) => {
        //@ts-ignore
        websocket.addEventListener("customMessage", (message) => {
          //@ts-ignore
          if (message.detail.stream == event) {
            // @ts-ignore
            callback(message.detail.data);
          }
        });
      },
      subscribe: (streams: WebSocketEvent[]) => {
        const subscribeMessage = {
          action: "listen",
          data: {
            streams,
          },
        };

        websocket.send(JSON.stringify(subscribeMessage));
      },
      unsubscribe: (streams: WebSocketEvent[]) => {
        const unsubscribeMessage = {
          action: "listen",
          data: {
            streams,
          },
        };

        websocket.send(JSON.stringify(unsubscribeMessage));
      },
    };
  },
};
