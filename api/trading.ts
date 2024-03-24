export type Account = {
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
};

export interface UpdatedAccountConfigurations {
  dtbp_check?: "both" | "entry" | "exit";
  trade_confirm_email?: "all" | "none";
  suspend_trade?: boolean;
  no_shorting?: boolean;
  fractional_trading?: boolean;
  max_margin_multiplier?: "1" | "2";
  max_options_trading_level?: 0 | 1 | 2;
  pdt_check?: "both" | "entry" | "exit";
  ptp_no_exception_entry?: boolean;
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
  type: "fill" | "partial_fill";
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
export interface MarketCalendar {
  date: string;
  open: string;
  close: string;
  settlement_date: string;
}
export interface MarketClock {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
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

export interface AnnouncementsQueryParams {
  ca_types?: string;
  since?: string;
  until?: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
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
  created_at: string; // Timestamp (RFC3339) of account creation
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
export interface PatchOrderOptions {
  qty?: string;
  time_in_force?: "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";
  limit_price?: string;
  stop_price?: string;
  trail?: string;
  client_order_id?: string;
}

export interface GetOrdersOptions {
  status?: "open" | "closed" | "all";
  limit?: number;
  after?: string;
  until?: string;
  direction?: "asc" | "desc";
  nested?: boolean;
  symbols?: string;
  side?: "buy" | "sell";
}

export interface CreateOrderOptions {
  symbol: string;
  qty?: string;
  notional?: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";
  time_in_force: "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";
  limit_price?: string;
  stop_price?: string;
  trail_price?: string;
  trail_percent?: string;
  extended_hours: boolean;
  client_order_id?: string;
  order_class?: "simple" | "oco" | "oto" | "bracket";
  take_profit?: {
    limit_price: string;
  };
  stop_loss?: {
    stop_price: string;
    limit_price?: string;
  };
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
export interface PortfolioHistoryParams {
  period?: string;
  timeframe?: string;
  intraday_reporting?: string;
  start?: string;
  end?: string;
  pnl_reset?: string;
}

export interface PortfolioHistoryResponse {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
  base_value_asof: string;
  timeframe: string;
}
export interface ClosePositionOptions {
  symbol_or_asset_id?: string;
  cancel_orders?: boolean;
  qty?: number;
  percentage?: number;
}

export type PositionClosedResponse = unknown[];

export interface Position {
  asset_id: string;
  symbol: string;
  exchange: string;
  asset_class: string;
  avg_entry_price: string;
  qty: string;
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
interface BaseEvent {
  timestamp: string;
}

interface NewEvent extends BaseEvent {
  type: "new";
}

interface FillEvent extends BaseEvent {
  type: "fill";
  price: number;
  position_qty: number;
}

interface PartialFillEvent extends BaseEvent {
  type: "partial_fill";
  price: number;
  position_qty: number;
}

interface CanceledEvent extends BaseEvent {
  type: "canceled";
}

interface ExpiredEvent extends BaseEvent {
  type: "expired";
}

interface DoneForDayEvent extends BaseEvent {
  type: "done_for_day";
}

interface ReplacedEvent extends BaseEvent {
  type: "replaced";
}

interface RejectedEvent extends BaseEvent {
  type: "rejected";
}

interface PendingNewEvent extends BaseEvent {
  type: "pending_new";
}

interface StoppedEvent extends BaseEvent {
  type: "stopped";
}

interface PendingCancelEvent extends BaseEvent {
  type: "pending_cancel";
}

interface PendingReplaceEvent extends BaseEvent {
  type: "pending_replace";
}

interface CalculatedEvent extends BaseEvent {
  type: "calculated";
}

interface SuspendedEvent extends BaseEvent {
  type: "suspended";
}

interface OrderReplaceRejectedEvent extends BaseEvent {
  type: "order_replace_rejected";
}

interface OrderCancelRejectedEvent extends BaseEvent {
  type: "order_cancel_rejected";
}

type TradeUpdateEvent = {
  type:
    | "new"
    | "fill"
    | "partial_fill"
    | "canceled"
    | "expired"
    | "replaced"
    | "rejected"
    | "order_cancel_rejected"
    | "order_replace_rejected";
  timestamp: string;
};

interface ChannelEventMap {
  trade_updates: TradeUpdateEvent;
}

type TradeSubscriptionRequest = {
  channel: keyof ChannelEventMap;
  symbols?: string[];
};

export type TradeWebSocket = {
  on: <E extends keyof ChannelEventMap>(
    channel: E,
    event: E extends keyof ChannelEventMap ? ChannelEventMap[E]["type"] : never,
    handler: (
      data: Extract<ChannelEventMap[E], { type: ChannelEventMap[E]["type"] }>
    ) => void
  ) => void;
  subscribe: (
    requests: TradeSubscriptionRequest[]
  ) => Promise<TradeSubscriptionRequest[]>;
  unsubscribe: (
    requests: TradeSubscriptionRequest[]
  ) => Promise<TradeSubscriptionRequest[]>;
};

type Trade = {
  T: "t";
  i: number;
  S: string;
  x: string;
  p: number;
  s: number;
  c: string[];
  t: string;
  z: string;
};

type Quote = {
  T: "q";
  S: string;
  bx: string;
  bp: number;
  bs: number;
  ax: string;
  ap: number;
  as: number;
  c: string[];
  t: string;
  z: string;
};

type Bar = {
  T: "b" | "d" | "u";
  S: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  t: string;
};

type Correction = {
  T: "c";
  S: string;
  x: string;
  oi: number;
  op: number;
  os: number;
  oc: string[];
  ci: number;
  cp: number;
  cs: number;
  cc: string[];
  t: string;
  z: string;
};

type CancelError = {
  T: "x";
  S: string;
  i: number;
  x: string;
  p: number;
  s: number;
  a: string;
  t: string;
  z: string;
};

type LULD = {
  T: "l";
  S: string;
  u: number;
  d: number;
  i: string;
  t: string;
  z: string;
};

type TradingStatus = {
  T: "s";
  S: string;
  sc: string;
  sm: string;
  rc: string;
  rm: string;
  t: string;
  z: string;
};

type StockDataMessage =
  | Trade
  | Quote
  | Bar
  | Correction
  | CancelError
  | LULD
  | TradingStatus
  | SuccessMessage
  | ErrorMessage
  | SubscriptionMessage;

// interface StockChannelEventMap extends EventMap {
//   trades: { T: "trades"; data: Trade };
//   quotes: { T: "quotes"; data: Quote };
//   bars: { T: "bars"; data: Bar };
//   dailyBars: { T: "dailyBars"; data: Bar };
//   updatedBars: { T: "updatedBars"; data: Bar };
//   statuses: { T: "statuses"; data: TradingStatus };
//   lulds: { T: "lulds"; data: LULD };
// }

// export type StockDataWebSocket = WebSocket<StockChannelEventMap>;
interface BaseEvent {
  T: string;
  S: string;
  t: string;
}

interface TradeEvent extends BaseEvent {
  T: "t";
  p: number;
  s: number;
  i: number;
  tks: "B" | "S";
}

interface QuoteEvent extends BaseEvent {
  T: "q";
  bp: number;
  bs: number;
  ap: number;
  as: number;
}

interface BarEvent extends BaseEvent {
  T: "b" | "d" | "u";
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n?: number;
  vw?: number;
}

interface OrderbookEvent extends BaseEvent {
  T: "o";
  b: { p: number; s: number }[];
  a: { p: number; s: number }[];
  r?: boolean;
}

interface SuccessMessage {
  T: "success";
  msg: string;
}

interface ErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface SubscriptionMessage {
  T: "subscription";
  trades: string[];
  quotes: string[];
  bars: string[];
  orderbooks: string[];
}

type CryptoMessage =
  | TradeEvent
  | QuoteEvent
  | BarEvent
  | OrderbookEvent
  | SuccessMessage
  | ErrorMessage
  | SubscriptionMessage;

interface CryptoChannelEventMap {
  trades: TradeEvent;
  quotes: QuoteEvent;
  bars: BarEvent;
  orderbooks: OrderbookEvent;
}

type CryptoSubscriptionRequest = {
  channel: keyof CryptoChannelEventMap;
  symbols?: string[];
};

export type CryptoWebSocket = {
  on: <E extends keyof CryptoChannelEventMap>(
    channel: E,
    event: E extends keyof CryptoChannelEventMap
      ? CryptoChannelEventMap[E]["T"]
      : never,
    handler: (
      data: Extract<
        CryptoChannelEventMap[E],
        { T: CryptoChannelEventMap[E]["T"] }
      >
    ) => void
  ) => void;
  subscribe: (
    requests: CryptoSubscriptionRequest[]
  ) => Promise<CryptoSubscriptionRequest[]>;
  unsubscribe: (
    requests: CryptoSubscriptionRequest[]
  ) => Promise<CryptoSubscriptionRequest[]>;
};
interface NewsEvent {
  T: "n";
  id: number;
  headline: string;
  summary: string;
  author: string;
  created_at: string;
  updated_at: string;
  url: string;
  content: string;
  symbols: string[];
  source: string;
}

interface NewsSuccessMessage {
  T: "success";
  msg: string;
}

interface NewsErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface NewsSubscriptionMessage {
  T: "subscription";
  news: string[];
}

type NewsMessage =
  | NewsEvent
  | NewsSuccessMessage
  | NewsErrorMessage
  | NewsSubscriptionMessage;

type NewsAction = "subscribe" | "unsubscribe";

interface NewsSubscriptionRequest {
  action: NewsAction;
  news: string[];
}

export type NewsWebSocket = {
  on: (event: "message", handler: (data: NewsMessage[]) => void) => void;
  send: (data: NewsSubscriptionRequest) => void;
};
interface BaseOptionEvent {
  T: string;
  S: string;
  t: string;
}

interface OptionTradeEvent extends BaseOptionEvent {
  T: "t";
  p: number;
  s: number;
  x: string;
  c: string;
}

interface OptionQuoteEvent extends BaseOptionEvent {
  T: "q";
  bx: string;
  bp: number;
  bs: number;
  ax: string;
  ap: number;
  as: number;
  c: string;
}

interface OptionSuccessMessage {
  T: "success";
  msg: string;
}

interface OptionErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface OptionSubscriptionMessage {
  T: "subscription";
  trades: string[];
  quotes: string[];
}

type OptionMessage =
  | OptionTradeEvent
  | OptionQuoteEvent
  | OptionSuccessMessage
  | OptionErrorMessage
  | OptionSubscriptionMessage;

type OptionAction = "subscribe" | "unsubscribe";
type OptionChannel = "trades" | "quotes";

interface OptionSubscriptionRequest {
  action: OptionAction;
  trades?: string[];
  quotes?: string[];
}

export type OptionsWebSocket = {
  on: (event: "message", handler: (data: OptionMessage[]) => void) => void;
  send: (data: OptionSubscriptionRequest) => void;
};

type TradeEventMap = any;

export type TradingAPI = {
  "/v2/account": {
    method: "GET";
    params: {};
    response: Account;
  };
  "/v2/orders": {
    method: "POST";
    params: CreateOrderOptions;
    response: Order;
  } & {
    method: "GET";
    params: PatchOrderOptions | string;
    response: Order | Order[];
  } & {
    method: "DELETE";
    params: { orderId?: string };
    response: { id?: string; status?: string }[] | void;
  } & {
    method: "PATCH";
    params: { orderId: string; options: PatchOrderOptions };
    response: Order;
  };
  "/v2/positions": {
    method: "GET";
    params: { symbol_or_asset_id?: string };
    response: Position | Position[];
  } & {
    method: "DELETE";
    params: ClosePositionOptions;
    response: Order[];
  } & {
    method: "POST";
    params: { symbol_or_contract_id: string };
    response: void;
  };
  "/v2/account/portfolio/history": {
    method: "GET";
    params: PortfolioHistoryParams;
    response: PortfolioHistoryResponse;
  };
  "/v2/watchlists": {
    method: "GET";
    params: { watchlist_id?: string };
    response: Watchlist | Watchlist[];
  } & {
    method: "POST";
    params: CreateWatchlistParams;
    response: Watchlist;
  } & {
    method: "PUT";
    params: { watchlist_id: string; name: string; symbols: string[] };
    response: Watchlist;
  } & {
    method: "DELETE";
    params: { watchlist_id: string };
    response: void;
  } & {
    method: "POST";
    params: { watchlist_id: string; symbol: string };
    response: Watchlist;
  } & {
    method: "GET";
    params: GetWatchlistByNameParams;
    response: Watchlist;
  } & {
    method: "PUT";
    params: UpdateWatchlistByNameParams;
    response: Watchlist;
  } & {
    method: "POST";
    params: AddAssetToWatchlistParams;
    response: void;
  } & {
    method: "DELETE";
    params: DeleteWatchlistByNameParams;
    response: void;
  } & {
    method: "DELETE";
    params: DeleteSymbolFromWatchlistParams;
    response: Watchlist;
  };
  "/v2/account/configurations": {
    method: "GET";
    params: {};
    response: AccountConfigurations;
  } & {
    method: "PATCH";
    params: UpdatedAccountConfigurations;
    response: void;
  };
  "/v2/account/activities": {
    method: "GET";
    params: { activityType?: string; options?: any };
    response: AccountActivity[];
  };
  "/v2/calendar": {
    method: "GET";
    params: {
      start?: string;
      end?: string;
      dateType?: "TRADING" | "SETTLEMENT";
    };
    response: MarketCalendar[];
  };
  "/v2/clock": {
    method: "GET";
    params: {};
    response: MarketClock;
  };
  "/v2/assets": {
    method: "GET";
    params: {
      status?: string;
      asset_class?: string;
      exchange?: string;
      attributes?: string[];
    };
    response: Asset[];
  } & {
    method: "GET";
    params: { symbolOrAssetId: string };
    response: Asset;
  };
  "/v2/options/contracts": {
    method: "GET";
    params: OptionContractsQueryParams;
    response: OptionContract | OptionContract[];
  };
  "/v2/corporate_actions/announcements": {
    method: "GET";
    params: { queryParams?: AnnouncementsQueryParams; announcementId?: string };
    response: CorporateActionAnnouncement | CorporateActionAnnouncement[];
  };
  "/v2/wallets": {
    method: "GET";
    params: { asset?: string };
    response: CryptoFundingWallet | CryptoFundingWallet[];
  } & {
    method: "POST";
    params: WithdrawalParams;
    response: CryptoFundingTransfer;
  } & {
    method: "GET";
    params: { transferId?: string };
    response: CryptoFundingTransfer | CryptoFundingTransfer[];
  } & {
    method: "GET";
    params: {};
    response: WhitelistedAddress[];
  } & {
    method: "POST";
    params: WhitelistedAddressParams;
    response: WhitelistedAddress;
  } & {
    method: "DELETE";
    params: { whitelistedAddressId: string };
    response: void;
  } & {
    method: "GET";
    params: TransactionParams;
    response: TransactionFeeResponse;
  };
};
