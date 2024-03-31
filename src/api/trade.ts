import { ClientContext } from "../factory/createClient.ts";
import { UnstableNumber } from "./_shared.ts";

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

export const getAccount =
  ({ request }: ClientContext) =>
  () =>
    request<Account>({
      path: "/v2/account",
    });

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
  ({ request }: ClientContext) =>
  (data: CreateOrderOptions) =>
    request<Order>({
      path: "/v2/orders",
      method: "POST",
      data,
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
  ({ request }: ClientContext) =>
  (params: GetOrdersOptions) =>
    request<Order>({
      path: "/v2/orders",
      method: "GET",
      params,
    });

export type GetOrderOptions = {
  order_id: string;
};

export const getOrder =
  ({ request }: ClientContext) =>
  ({ order_id }: GetOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "GET",
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
  ({ request }: ClientContext) =>
  (data: ReplaceOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${data.order_id}`,
      method: "PATCH",
      data,
    });

export const cancelOrders =
  ({ request }: ClientContext) =>
  () =>
    request<Order>({
      path: "/v2/orders",
      method: "DELETE",
    });

export type CancelOrderOptions = {
  order_id: string;
};

export const cancelOrder =
  ({ request }: ClientContext) =>
  ({ order_id }: CancelOrderOptions) =>
    request<Order>({
      path: `/v2/orders/${order_id}`,
      method: "DELETE",
    });

export const getPositions =
  ({ request }: ClientContext) =>
  () =>
    request<Order>({
      path: "/v2/positions",
      method: "GET",
    });

export type GetPositionOptions = {
  symbol_or_asset_id: string;
};

export const getPosition =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: GetPositionOptions) =>
    request<Order>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "GET",
    });

export const closePositions =
  ({ request }: ClientContext) =>
  () =>
    request<Order>({
      path: "/v2/positions",
      method: "DELETE",
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

export type GetAssetsOptions = {
  status?: string;
  asset_class?: string;
  asset_status?: string;
};

export type ExerciseOption = {
  symbol_or_contract_id: string;
};

export const exerciseOption =
  ({ request }: ClientContext) =>
  ({ symbol_or_contract_id }: ExerciseOption) =>
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

export const getMarketCalendar =
  ({ request }: ClientContext) =>
  (params: GetCalendarOptions = {}) =>
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

export const getMarketClock =
  ({ request }: ClientContext) =>
  () =>
    request<Clock>({
      path: "/v2/clock",
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
  ({ request }: ClientContext) =>
  (params: GetAssetsOptions = {}) =>
    request<Asset[]>({
      path: "/v2/assets",
      method: "GET",
      params,
    });

export type GetAssetOptions = {
  symbol_or_asset_id: string;
};

export const getAsset =
  ({ request }: ClientContext) =>
  ({ symbol_or_asset_id }: GetAssetOptions) =>
    request<Asset>({
      path: `/v2/assets/${symbol_or_asset_id}`,
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
  ({ request }: ClientContext) =>
  (params: GetOptionsContractsOptions) =>
    request<OptionsContract[]>({
      path: "/v2/options/contracts",
      method: "GET",
      params,
    });

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

export type CorporateActionAnnouncement = {
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

export type GetCorporateActionsAnnouncementsOptions = {
  ca_types: string;
  since: string;
  until: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
  id: string;
};

export const getCorporateActionsAnnouncements =
  ({ request }: ClientContext) =>
  (params: GetCorporateActionsAnnouncementsOptions) =>
    request<CorporateActionAnnouncement[]>({
      path: "/v2/corporate_actions/announcements",
      method: "GET",
      params,
    });

export type GetCorporateActionsAnnouncementOptions = {
  id: string;
};

export const getCorporateActionsAnnouncement =
  ({ request }: ClientContext) =>
  ({ id }: GetCorporateActionsAnnouncementOptions) =>
    request<CorporateActionAnnouncement>({
      path: `/v2/corporate_actions/announcements/${id}`,
      method: "GET",
    });

export type Watchlist = {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: Asset[];
};

export const getWatchlists =
  ({ request }: ClientContext) =>
  () =>
    request<Watchlist>({
      path: "/v2/watchlists",
    });

export type GetWatchlistOptions = {
  watchlist_id: string;
};

export const getWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id }: GetWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
    });

export type CreateWatchlistOptions = {
  name: string;
  symbols: string[] | null;
};

export const createWatchlist =
  ({ request }: ClientContext) =>
  (data: CreateWatchlistOptions) =>
    request<Watchlist>({
      path: "/v2/watchlists",
      method: "POST",
      data,
    });

export type UpdateWatchlistOptions = {
  name: string;
  symbols: string[] | null;
  watchlist_id: string;
};

export const updateWatchlist =
  ({ request }: ClientContext) =>
  (data: UpdateWatchlistOptions) =>
    request<Watchlist>({
      path: `/v2/watchlists/${data.watchlist_id}`,
      method: "PATCH",
      data,
    });

export type DeleteWatchlistOptions = {
  watchlist_id: string;
};

export const deleteWatchlist =
  ({ request }: ClientContext) =>
  ({ watchlist_id }: DeleteWatchlistOptions) =>
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
  ({ request }: ClientContext) =>
  (params: GetPortfolioHistoryOptions) =>
    request<PortfolioHistory>({
      path: "/v2/account/portfolio/history",
      method: "GET",
      params,
    });

export type AccountConfigurations = {
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

export const getAccountConfigurations =
  ({ request }: ClientContext) =>
  () =>
    request<AccountConfigurations>({
      path: "/v2/account/configurations",
    });

export type UpdateAccountConfigurationsOptions = {
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

export const updateAccountConfigurations =
  ({ request }: ClientContext) =>
  (data: UpdateAccountConfigurationsOptions) =>
    request<AccountConfigurations>({
      path: "/v2/account/configurations",
      method: "PATCH",
      data,
    });

export type AccountTradingActivity = {
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

export type AccountNonTradeActivity = {
  activity_type: string;
  id: string;
  date: string;
  net_amount: string;
  symbol?: string;
  qty?: string;
  per_share_amount?: string;
};

export type AccountActivity = AccountTradingActivity | AccountNonTradeActivity;

export const getAccountActivities =
  ({ request }: ClientContext) =>
  () =>
    request<AccountActivity[]>({
      path: "/v2/account/activities",
      method: "GET",
    });

export type GetAccountActivityOptions = {
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

export const getAccountActivity =
  ({ request }: ClientContext) =>
  ({ activity_type }: GetAccountActivityOptions) =>
    request<AccountActivity[]>({
      path: `/v2/account/activities/${activity_type}`,
      method: "GET",
    });

export type CryptoWallet = {
  id: string;
  currency: string;
  balance: string;
  available: string;
  held: string;
  profile_id: string;
};

export const getWallets =
  ({ request }: ClientContext) =>
  () =>
    request<CryptoWallet[]>({
      path: "/v2/wallets",
      method: "GET",
    });

export type GetWalletOptions = {
  asset: string;
};

export const getWallet =
  ({ request }: ClientContext) =>
  ({ asset }: GetWalletOptions) =>
    request<CryptoWallet>({
      path: `/v2/wallets/${asset}`,
      method: "GET",
    });

export type Fee = {
  fee: string;
  network_fee: string;
  estimated_delivery: string;
};

export type GetFeeEstimateOptions = {
  asset: string;
  from_address: string;
  to_address: string;
  amount: string;
};

export const getFeeEstimate =
  ({ request }: ClientContext) =>
  (params: GetFeeEstimateOptions) =>
    request<Fee>({
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

export type GetTransfersOptions = {
  asset?: string;
};

export const getTransfers =
  ({ request }: ClientContext) =>
  (params?: GetTransfersOptions) =>
    request<CryptoTransfer[]>({
      path: "/v2/wallets/transfers",
      method: "GET",
      params,
    });

export type GetTransferOptions = {
  transfer_id: string;
};

export const getTransfer =
  ({ request }: ClientContext) =>
  ({ transfer_id }: GetTransferOptions) =>
    request<CryptoTransferResponse | CryptoTransfer>({
      path: `/v2/wallets/transfers/${transfer_id}`,
      method: "GET",
    });

export type CreateTransferOptions = {
  amount: string;
  address: string;
  asset: string;
};

export const createTransfer =
  ({ request }: ClientContext) =>
  (data: CreateTransferOptions) =>
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

export type GetWhitelistsOptions = {
  address: string;
  asset: string;
};

export const getWhitelists =
  ({ request }: ClientContext) =>
  (params: GetWhitelistsOptions) =>
    request<WhitelistedAddress[]>({
      path: "/v2/wallets/whitelists",
      method: "GET",
      params,
    });

export type CreateWhitelistOptions = {
  address: string;
  asset: string;
};

export const createWhitelist =
  ({ request }: ClientContext) =>
  (data: CreateWhitelistOptions) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "POST",
      data,
    });

export type RemoveWhitelistOptions = {
  whitelisted_address_id: string;
};

export const removeWhitelist =
  ({ request }: ClientContext) =>
  ({ whitelisted_address_id }: RemoveWhitelistOptions) =>
    request({
      path: `/v2/wallets/whitelists/${whitelisted_address_id}`,
      method: "DELETE",
    });
