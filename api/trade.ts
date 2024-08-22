import { ClientContext } from "../factory/createClient.ts";

// Used for fields where the type may change based on the context, such as prices.
export type UnstableNumber = string | number;

export type Nullable<T> = T | null;

export type AccountStatus =
  | "ONBOARDING"
  | "SUBMISSION_FAILED"
  | "SUBMITTED"
  | "ACCOUNT_UPDATED"
  | "APPROVAL_PENDING"
  | "ACTIVE"
  | "REJECTED";

export type OptionsApprovedLevel = 0 | 1 | 2;

export type OptionsTradingLevel = 0 | 1 | 2;

export type Account = {
  id: string;
  account_number: string;
  status: AccountStatus;
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
  options_approved_level: OptionsApprovedLevel;
  options_trading_level: OptionsTradingLevel;
};

export const getAccount = ({ request }: ClientContext) => () =>
  request<Account>({
    path: "/v2/account",
  });

export type BaseOrder = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: Nullable<UnstableNumber>;
  expired_at: Nullable<UnstableNumber>;
  canceled_at: Nullable<UnstableNumber>;
  failed_at: Nullable<UnstableNumber>;
  replaced_at: Nullable<UnstableNumber>;
  replaced_by: Nullable<UnstableNumber>;
  replaces: Nullable<UnstableNumber>;
  asset_id: string;
  notional: Nullable<UnstableNumber>;
  qty: string;
  filled_qty: string;
  filled_avg_price: Nullable<UnstableNumber>;
  order_class: string;
  order_type: string;
  type: Type;
  side: string;
  time_in_force: string;
  limit_price: Nullable<UnstableNumber>;
  stop_price: Nullable<UnstableNumber>;
  status: string;
  extended_hours: boolean;
  legs?: Nullable<object>;
  trail_percent: Nullable<UnstableNumber>;
  trail_price: Nullable<UnstableNumber>;
  hwm: Nullable<UnstableNumber>;
  subtag: Nullable<UnstableNumber>;
  source: Nullable<UnstableNumber>;
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

export type Position = {
  asset_id: string;
  exchange: string;
  asset_class: string;
  symbol: string;
  asset_marginable: boolean;
  qty: string;
  avg_entry_price: string;
  side: Direction;
  market_value: string;
  cost_basis: string;
  unrealized_pl: string;
  unrealized_plpc: string;
  unrealized_intraday_pl: string;
  unrealized_intraday_plpc: string;
  current_price: string;
  lastday_price: string;
  change_today: string;
  qty_available: string;
};

export type TimeInForce = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";

export type PositionIntent =
  | "buy_to_open"
  | "buy_to_close"
  | "sell_to_open"
  | "sell_to_close";

export type Type = "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";

export type Side = "buy" | "sell";

export type OrderClass = "simple" | "oco" | "oto" | "bracket" | "";

export type Direction = "long" | "short";

export type TakeProfit = {
  limit_price?: string;
};

export type StopLoss = {
  stop_price?: string;
  limit_price?: string;
};

export type CreateOrderOptions = {
  symbol: string;
  qty?: UnstableNumber;
  notional?: UnstableNumber;
  side: Side;
  type: Type;
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

export const createOrder =
  ({ request }: ClientContext) => (data: CreateOrderOptions) =>
    request<Order>({
      path: "/v2/orders",
      method: "POST",
      data,
    });

export type GetOrderOptions = {
  order_id: string;
};

export const getOrder =
  ({ request }: ClientContext) => ({ order_id }: GetOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "GET",
    });

export type GetOrdersOptions = {
  status?: string;
  limit?: UnstableNumber;
  after?: string;
  until?: string;
  direction?: Direction;
  nested?: boolean;
  symbols?: string;
  side?: Side;
  order_id: string;
};

export const getOrders =
  ({ request }: ClientContext) => (params: GetOrdersOptions) =>
    request<Array<Position>>({
      path: "/v2/orders",
      method: "GET",
      params,
    });

export type ReplaceOrderOptions = {
  qty?: UnstableNumber;
  time_in_force?: string;
  limit_price?: UnstableNumber;
  stop_price?: UnstableNumber;
  trail?: UnstableNumber;
  client_order_id?: string;
  order_id: string;
};

export const replaceOrder =
  ({ request }: ClientContext) => (data: ReplaceOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${data.order_id}`,
      method: "PATCH",
      data,
    });

export type CancelOrderOptions = {
  order_id: string;
};

export const cancelOrder =
  ({ request }: ClientContext) => ({ order_id }: CancelOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "DELETE",
    });

export const cancelOrders = ({ request }: ClientContext) => () =>
  request<Order>({
    path: "/v2/orders",
    method: "DELETE",
  });

export type GetPositionOptions = {
  symbol_or_asset_id: string;
};

export const getPosition =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: GetPositionOptions) =>
    request<Position>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "GET",
    });

export const getPositions = ({ request }: ClientContext) => () =>
  request<Array<Position>>({
    path: "/v2/positions",
    method: "GET",
  });

export type ClosePositionOptions = {
  symbol_or_asset_id: string;
};

export const closePosition =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: ClosePositionOptions) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "DELETE",
    });

export const closePositions = ({ request }: ClientContext) => () =>
  request<Array<Nullable<Order>>>({
    path: "/v2/positions",
    method: "DELETE",
  });

export type GetAssetsOptions = {
  status?: string;
  asset_class?: string;
  asset_status?: string;
};

export type ExerciseOption = {
  symbol_or_contract_id: string;
};

export const exerciseOption =
  ({ request }: ClientContext) => ({ symbol_or_contract_id }: ExerciseOption) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_contract_id}/exercise`,
      method: "POST",
    });

export type GetCalendarOptions = {
  start?: string;
  end?: string;
  dateType?: "TRADING" | "SETTLEMENT";
};

export type Calendar = {
  date: string;
  open: string;
  close: string;
  settlement_date: string;
};

export const getCalendar =
  ({ request }: ClientContext) => (params: GetCalendarOptions = {}) =>
    request<Calendar[]>({
      path: "/v2/calendar",
      method: "GET",
      params,
    });

export type Clock = {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
};

export const getClock = ({ request }: ClientContext) => () =>
  request<Clock>({
    path: "/v2/clock",
  });

export type GetAssetOptions = {
  symbol_or_asset_id: string;
};

export const getAsset =
  ({ request }: ClientContext) => ({ symbol_or_asset_id }: GetAssetOptions) =>
    request<Asset>({
      path: `/v2/assets/${symbol_or_asset_id}`,
      method: "GET",
    });

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
  tradability: string;
  symbol_with_class: string;
  asset_id: string;
};

export const getAssets =
  ({ request }: ClientContext) => (params: GetAssetsOptions = {}) =>
    request<Asset[]>({
      path: "/v2/assets",
      method: "GET",
      params,
    });

export type Watchlist = {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: Asset[];
};

export type GetWatchlistOptions = {
  watchlist_id: string;
};

export const getWatchlist =
  ({ request }: ClientContext) => ({ watchlist_id }: GetWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
    });

export const getWatchlists = ({ request }: ClientContext) => () =>
  request<Watchlist[]>({
    path: "/v2/watchlists",
  });

export type CreateWatchlistOptions = {
  name: string;
  symbols: Nullable<string[]>;
};

export const createWatchlist =
  ({ request }: ClientContext) => (data: CreateWatchlistOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists",
      method: "POST",
      data,
    });

export type UpdateWatchlistOptions = {
  name: string;
  symbols: Nullable<string[]>;
  watchlist_id: string;
};

export const updateWatchlist =
  ({ request }: ClientContext) => (data: UpdateWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${data.watchlist_id}`,
      method: "PATCH",
      data,
    });

export type DeleteWatchlistOptions = {
  watchlist_id: string;
};

export const deleteWatchlist =
  ({ request }: ClientContext) => ({ watchlist_id }: DeleteWatchlistOptions) =>
    request({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "DELETE",
    });

export type PortfolioHistory = {
  timestamp: string[];
  equity: string[];
  profit_loss: string[];
  profit_loss_pct: string[];
  base_value: string;
  base_value_asof: string;
  timeframe: string;
};

export type GetPortfolioHistoryOptions = {
  period?: string;
  timeframe?: string;
  intraday_reporting?: string;
  start?: string;
  end?: string;
  pnl_reset?: string;
};

export const getPortfolioHistory =
  ({ request }: ClientContext) => (params: GetPortfolioHistoryOptions) =>
    request<PortfolioHistory>({
      path: "/v2/account/portfolio/history",
      method: "GET",
      params,
    });

export type Configurations = {
  dtbp_check: string;
  trade_confirm_email: string;
  suspend_trade: boolean;
  no_shorting: boolean;
  fractional_trading: boolean;
  max_margin_multiplier: string;
  max_options_trading_level: number;
  pdt_check: string;
  ptp_no_exception_entry: boolean;
};

export const getConfigurations = ({ request }: ClientContext) => () =>
  request<Configurations>({
    path: "/v2/account/configurations",
  });

export type UpdateConfigurationsOptions = {
  dtbp_check?: string;
  trade_confirm_email?: string;
  suspend_trade?: boolean;
  no_shorting?: boolean;
  fractional_trading?: boolean;
  max_margin_multiplier?: string;
  max_options_trading_level?: number;
  pdt_check?: string;
  ptp_no_exception_entry?: boolean;
};

export const updateConfigurations =
  ({ request }: ClientContext) => (data: UpdateConfigurationsOptions) =>
    request<Configurations>({
      path: "/v2/account/configurations",
      method: "PATCH",
      data,
    });

export type TradingActivity = {
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
};

export type NonTradeActivity = {
  activity_type: string;
  id: string;
  date: string;
  net_amount: string;
  symbol?: string;
  qty?: string;
  per_share_amount?: string;
};

export type Activity = TradingActivity | NonTradeActivity;

export type GetActivityOptions = {
  activity_type: string;
  activity_types?: string;
  date?: string;
  until?: string;
  after?: string;
  direction?: string;
  pageSize?: number;
  pageToken?: string;
  category?: string;
};

export const getActivity =
  ({ request }: ClientContext) => ({ activity_type }: GetActivityOptions) =>
    request<Activity[]>({
      path: `/v2/account/activities/${activity_type}`,
      method: "GET",
    });

export const getActivities = ({ request }: ClientContext) => () =>
  request<Activity[]>({
    path: "/v2/account/activities",
    method: "GET",
  });

export type OptionsContract = {
  id: string;
  symbol: string;
  name: string;
  status: string;
  tradable: boolean;
  tradability: string;
  chain_id: string;
  type: string;
  option_type: string;
  expiration_date: string;
  strike_price: string;
  min_ticks: {
    above_tick: string;
    below_tick: string;
    cutoff_price: string;
  };
  option_style: string;
  created_at: string;
  updated_at: string;
  last_trade_date: string;
  underlying: string;
  tradable_chain_id: string;
  chain_symbol: string;
  description: string;
  asset_id: string;
};

export type GetOptionsContractOptions = {
  symbol_or_contract_id: string;
};

export const getOptionsContract =
  ({ request }: ClientContext) =>
  ({ symbol_or_contract_id }: GetOptionsContractOptions) =>
    request<OptionsContract>({
      path: `/v2/options/contracts/${symbol_or_contract_id}`,
      method: "GET",
    });

export type GetOptionsContractsOptions = {
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
  symbol_or_contract_id: string;
};

export const getOptionsContracts =
  ({ request }: ClientContext) => (params: GetOptionsContractsOptions) =>
    request<OptionsContract[]>({
      path: "/v2/options/contracts",
      method: "GET",
      params,
    });

export type CorporateAction = {
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
};

export type GetCorporateActionOptions = {
  id: string;
};

export const getCorporateAction =
  ({ request }: ClientContext) => ({ id }: GetCorporateActionOptions) =>
    request<CorporateAction>({
      path: `/v2/corporate_actions/announcements/${id}`,
      method: "GET",
    });

export type GetCorporateActionsOptions = {
  ca_types: string;
  since: string;
  until: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
};

export const getCorporateActions =
  ({ request }: ClientContext) => (params: GetCorporateActionsOptions) =>
    request<CorporateAction[]>({
      path: "/v2/corporate_actions/announcements",
      method: "GET",
      params,
    });

export type CryptoWallet = {
  id: string;
  currency: string;
  balance: string;
  available: string;
  held: string;
  profile_id: string;
};

export type GetWalletOptions = {
  asset: string;
};

export const getCryptoWallet =
  ({ request }: ClientContext) => ({ asset }: GetWalletOptions) =>
    request<CryptoWallet>({
      path: `/v2/wallets/${asset}`,
      method: "GET",
    });

export const getCryptoWallets = ({ request }: ClientContext) => () =>
  request<CryptoWallet[]>({
    path: "/v2/wallets",
    method: "GET",
  });

export type CryptoFee = {
  fee: string;
  network_fee: string;
  estimated_delivery: string;
};

export type GetCryptoFeeEstimateOptions = {
  asset: string;
  from_address: string;
  to_address: string;
  amount: string;
};

export const getFeeEstimate =
  ({ request }: ClientContext) => (params: GetCryptoFeeEstimateOptions) =>
    request<CryptoFee>({
      path: "/v2/wallets/fees/estimate",
      method: "GET",
      params,
    });

export type CryptoTransfer = {
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
};

export type CryptoTransferResponse = {
  wallets?: CryptoWallet | CryptoWallet[];
  transfers?: CryptoTransfer[];
};

export type GetCryptoTransferOptions = {
  transfer_id: string;
};

export const getCryptoTransfer =
  ({ request }: ClientContext) => ({ transfer_id }: GetCryptoTransferOptions) =>
    request<CryptoTransferResponse | CryptoTransfer>({
      path: `/v2/wallets/transfers/${transfer_id}`,
      method: "GET",
    });

export type GetCryptoTransfersOptions = {
  asset?: string;
};

export const getCryptoTransfers =
  ({ request }: ClientContext) => (params?: GetCryptoTransfersOptions) =>
    request<CryptoTransfer[]>({
      path: "/v2/wallets/transfers",
      method: "GET",
      params,
    });

export type CreateCryptoTransferOptions = {
  amount: string;
  address: string;
  asset: string;
};

export const createCryptoTransfer =
  ({ request }: ClientContext) => (data: CreateCryptoTransferOptions) =>
    request<CryptoTransfer>({
      path: "/v2/wallets/transfers",
      method: "POST",
      data,
    });

export type WhitelistedAddress = {
  id: string;
  chain: string;
  asset: string;
  address: string;
  status: "ACTIVE" | "PENDING";
  created_at: string;
};

export type GetCryptoWhitelistedAddressOptions = {
  address: string;
  asset: string;
};

export const getCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  (params: GetCryptoWhitelistedAddressOptions) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "GET",
      params,
    });

export const getCryptoWhitelistedAddresses =
  ({ request }: ClientContext) => () =>
    request<WhitelistedAddress[]>({
      path: "/v2/wallets/whitelists",
      method: "GET",
    });

export type RequestCryptoWhitelistedAddressOptions = {
  address: string;
  asset: string;
};

export const requestCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  (data: RequestCryptoWhitelistedAddressOptions) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "POST",
      data,
    });

export type RemoveCryptoWhitelistedAddressOptions = {
  whitelisted_address_id: string;
};

export const removeCryptoWhitelistedAddress =
  ({ request }: ClientContext) =>
  ({ whitelisted_address_id }: RemoveCryptoWhitelistedAddressOptions) =>
    request({
      path: `/v2/wallets/whitelists/${whitelisted_address_id}`,
      method: "DELETE",
    });
