import { ClientContext } from "../factory/createClient.ts";

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
  qty?: string | number;
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
  qty?: string | number;
  notional?: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";
  time_in_force: "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";
  limit_price?: string;
  stop_price?: string;
  trail_price?: string;
  trail_percent?: string;
  extended_hours?: boolean;
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

export type GetActivitiesOptions = {
  date?: string;
  until?: string;
  after?: string;
  direction?: string;
  pageSize?: number;
  pageToken?: string;
  category?: string;
};

/**
 * - [x] GET https://paper-api.alpaca.markets/v2/account
 * - [x] POST https://paper-api.alpaca.markets/v2/orders
 * - [x] GET https://paper-api.alpaca.markets/v2/orders
 * - [x] DELETE https://paper-api.alpaca.markets/v2/orders
 * - [x] GET https://paper-api.alpaca.markets/v2/orders/{order_id}
 * - [x] PATCH https://paper-api.alpaca.markets/v2/orders/{order_id}
 * - [x] DELETE https://paper-api.alpaca.markets/v2/orders/{order_id}
 * - [x] GET https://paper-api.alpaca.markets/v2/positions
 * - [x] DELETE https://paper-api.alpaca.markets/v2/positions
 * - [x] GET https://paper-api.alpaca.markets/v2/positions/{symbol_or_asset_id}
 * - [x] DELETE https://paper-api.alpaca.markets/v2/positions/{symbol_or_asset_id}
 * - [x] POST https://paper-api.alpaca.markets/v2/positions/{symbol_or_contract_id}/exercise
 * - [x] GET https://paper-api.alpaca.markets/v2/account/portfolio/history
 *
 *
 * - [] GET https://paper-api.alpaca.markets/v2/watchlists
 * - [] POST https://paper-api.alpaca.markets/v2/watchlists
 * - [] GET https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}
 * - [] PUT https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}
 * - [] POST https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}
 * - [] DELETE https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}
 * - [] GET https://paper-api.alpaca.markets/v2/watchlists:by_name
 * - [] PUT https://paper-api.alpaca.markets/v2/watchlists:by_name
 * - [] POST https://paper-api.alpaca.markets/v2/watchlists:by_name
 * - [] DELETE https://paper-api.alpaca.markets/v2/watchlists:by_name
 * - [] DELETE https://paper-api.alpaca.markets/v2/watchlists/{watchlist_id}/{symbol}
 *
 *
 *
 * - [] GET https://paper-api.alpaca.markets/v2/account/configurations
 * - [] PATCH https://paper-api.alpaca.markets/v2/account/configurations
 * - [] GET https://paper-api.alpaca.markets/v2/account/activities
 * - [] GET https://paper-api.alpaca.markets/v2/account/activities/{activity_type}
 * - [] GET https://paper-api.alpaca.markets/v2/calendar
 * - [] GET https://paper-api.alpaca.markets/v2/clock
 * - [] GET https://paper-api.alpaca.markets/v2/assets
 * - [] GET https://paper-api.alpaca.markets/v2/assets/{symbol_or_asset_id}
 * - [] GET https://paper-api.alpaca.markets/v2/options/contracts
 * - [] GET https://paper-api.alpaca.markets/v2/options/contracts/{symbol_or_id}
 * - [] GET https://paper-api.alpaca.markets/v2/corporate_actions/announcements/{id}
 * - [] GET https://paper-api.alpaca.markets/v2/corporate_actions/announcements
 * - [] GET https://paper-api.alpaca.markets/v2/wallets
 * - [] GET https://paper-api.alpaca.markets/v2/wallets/transfers
 * - [] POST https://paper-api.alpaca.markets/v2/wallets/transfers
 * - [] GET https://paper-api.alpaca.markets/v2/wallets/transfers/{transfer_id}
 * - [] GET https://paper-api.alpaca.markets/v2/wallets/whitelists
 * - [] POST https://paper-api.alpaca.markets/v2/wallets/whitelists
 * - [] DELETE https://paper-api.alpaca.markets/v2/wallets/whitelists/{whitelisted_address_id}
 * - [] GET https://paper-api.alpaca.markets/v2/wallets/fees/estimate
 */

export default ({ request }: ClientContext) => ({
  getAccount: () =>
    request<Account>({
      path: "/v2/account",
    }),
  getOrder: (orderId: string) =>
    request<Order>({
      path: `/v2/orders/${orderId}`,
    }),
  getOrders: (options: GetOrdersOptions) =>
    request<Order[]>({
      path: "/v2/orders",
      method: "GET",
      params: options,
    }),
  createOrder: (options: CreateOrderOptions) =>
    request<Order>({
      path: "/v2/orders",
      method: "POST",
      data: options,
    }),
  replaceOrder: (options: PatchOrderOptions | string, nested?: boolean) => {
    let path = "/v2/orders";
    let params = {};

    if (typeof options === "string") {
      path += `/${options}`;

      if (nested !== undefined) {
        params = { nested };
      }
    } else if (typeof options === "object") {
      params = options;
    }

    return request<Order | Order[]>({
      path,
      method: "PATCH",
      params,
    });
  },
  cancelOrder: (orderId: string) =>
    request<void>({
      path: `/v2/orders/${orderId}`,
      method: "DELETE",
    }),
  cancelOrders: () =>
    request<void>({
      path: "/v2/orders",
      method: "DELETE",
    }),
  getPosition: (symbol_or_asset_id: string) =>
    request<Position | Position[]>({
      path: `/v2/positions/${symbol_or_asset_id}`,
      method: "GET",
    }),
  getPositions: () =>
    request<Position[]>({
      path: "/v2/positions",
      method: "GET",
    }),
  closePosition: (
    params: Pick<
      ClosePositionOptions,
      "symbol_or_asset_id" | "qty" | "percentage"
    >
  ) =>
    request<Order[]>({
      path: `/v2/positions/${params.symbol_or_asset_id}`,
      method: "DELETE",
      params: { qty: params.qty, percentage: params.percentage },
    }),
  closeAllPositions: (params: Pick<ClosePositionOptions, "cancel_orders">) =>
    request<PositionClosedResponse>({
      path: "/v2/positions",
      method: "DELETE",
      params: { cancel_orders: params.cancel_orders },
    }),
  exercisePosition: (symbol_or_contract_id: string) =>
    request<void>({
      path: `/v2/positions/${symbol_or_contract_id}/exercise`,
      method: "POST",
    }),
  getPortfolioHistory: (params?: PortfolioHistoryParams) =>
    request<PortfolioHistoryResponse>({
      path: "/v2/account/portfolio/history",
      method: "GET",
      params,
    }),
  getWatchlist: (watchlist_id: string) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
    }),
  getWatchlists: () =>
    request<Watchlist[]>({
      path: "/v2/watchlists",
    }),
  createWatchlist: ({ name, symbols }: CreateWatchlistParams) =>
    request<Watchlist>({
      path: "/v2/watchlists",
      method: "POST",
      data: { name, symbols },
    }),
  updateWatchlist: ({
    watchlist_id,
    name,
    symbols,
  }: { watchlist_id: string } & UpdateWatchlistParams) =>
    request<Watchlist>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "PUT",
      data: { name, symbols },
    }),
  deleteWatchlist: ({ watchlist_id }: { watchlist_id: string }) =>
    request<void>({
      path: `/v2/watchlists/${watchlist_id}`,
      method: "DELETE",
    }),
  getAccountConfigurations: () =>
    request<AccountConfigurations>({
      path: "/v2/account/configurations",
    }),
  updateAccountConfigurations: (updatedConfig: UpdatedAccountConfigurations) =>
    request<void>({
      path: "/v2/account/configurations",
      method: "PATCH",
      data: updatedConfig,
    }),
  getActivities: (
    activityType?: string,
    options?: {
      date?: string;
      until?: string;
      after?: string;
      direction?: string;
      pageSize?: number;
      pageToken?: string;
      category?: string;
    }
  ) =>
    request<AccountActivity[]>({
      path: `/v2/account/activities${activityType ? `/${activityType}` : ""}`,
      method: "GET",
      params: Object.fromEntries(
        Object.entries({
          date: options?.date,
          until: options?.until,
          after: options?.after,
          direction: options?.direction,
          page_size: options?.pageSize,
          page_token: options?.pageToken,
          category: options?.category,
        }).filter(([_, value]) => value !== undefined)
      ),
    }),
  getCalendar: (options?: {
    start?: string;
    end?: string;
    dateType?: "TRADING" | "SETTLEMENT";
  }) =>
    request<MarketCalendar[]>({
      path: "/v2/calendar",
      method: "GET",
      params: Object.fromEntries(
        Object.entries({
          start: options?.start,
          end: options?.end,
          date_type: options?.dateType,
        }).filter(([_, value]) => value !== undefined)
      ),
    }),
  getClock: () =>
    request<MarketClock>({
      path: "/v2/clock",
      method: "GET",
    }),
  getAsset: (symbolOrAssetId: string) =>
    request<Asset>({
      path: `/v2/assets/${symbolOrAssetId}`,
      method: "GET",
    }),
  getAssets: (options?: {
    status?: string;
    asset_class?: string;
    exchange?: string;
    attributes?: string[];
  }) =>
    request<Asset[]>({
      path: "/v2/assets",
      method: "GET",
      params: Object.fromEntries(
        Object.entries({
          status: options?.status,
          asset_class: options?.asset_class,
          exchange: options?.exchange,
          attributes: options?.attributes?.join(","),
        }).filter(([_, value]) => value !== undefined)
      ),
    }),
  getOptionsContracts: (queryParams: OptionContractsQueryParams) =>
    request<OptionContract[]>({
      path: "/v2/options/contracts",
      method: "GET",
      params: queryParams,
    }),
  getOptionsContract: (
    symbolOrId: string,
    queryParams: OptionContractsQueryParams
  ) =>
    request<OptionContract>({
      path: `/v2/options/contracts/${symbolOrId}`,
      method: "GET",
      params: queryParams,
    }),
  getCorporateActionAnnouncement: (announcementId: string) =>
    request<CorporateActionAnnouncement>({
      path: `/v2/corporate_actions/announcements/${announcementId}`,
      method: "GET",
    }),
  getCorporateActionAnnouncements: (queryParams: AnnouncementsQueryParams) =>
    request<CorporateActionAnnouncement[]>({
      path: "/v2/corporate_actions/announcements",
      method: "GET",
      params: queryParams,
    }),
  getCryptoWallets: (asset?: string) =>
    request<CryptoFundingWallet | CryptoFundingWallet[]>({
      path: "/v2/wallets",
      method: "GET",
      params: { asset },
    }),
  getCryptoWhitelistedAddresses: () =>
    request<WhitelistedAddress[]>({
      path: "/v2/wallets/whitelists",
      method: "GET",
    }),
  requestCryptoWhitelistedAddress: (
    whitelistedAddressParams: WhitelistedAddressParams
  ) =>
    request<WhitelistedAddress>({
      path: "/v2/wallets/whitelists",
      method: "POST",
      data: whitelistedAddressParams,
    }),
  deleteCryptoWhitelistedAddress: (whitelistedAddressId: string) =>
    request<void>({
      path: `/v2/wallets/whitelists/${whitelistedAddressId}`,
      method: "DELETE",
    }),
  getCryptoTransferFeeEstimate: (transactionParams: TransactionParams) =>
    request<TransactionFeeResponse>({
      path: "/v2/wallets/fees/estimate",
      method: "GET",
      params: transactionParams,
    }),
  getCryptoTransfer: (transferId: string) =>
    request<CryptoFundingTransfer>({
      path: `/v2/wallets/transfers/${transferId}`,
      method: "GET",
    }),
  getCryptoTransfers: () =>
    request<CryptoFundingTransfer[]>({
      path: "/v2/wallets/transfers",
      method: "GET",
    }),
  requestCryptoWithdrawal: (withdrawalParams: WithdrawalParams) =>
    request<CryptoFundingTransfer>({
      path: "/v2/wallets/transfers",
      method: "POST",
      data: withdrawalParams,
    }),
});
