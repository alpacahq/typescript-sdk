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
    id: string;
  };
};

export type CryptoFundingWallet = {
  chain: string;
  address: string;
  created_at: string;
};

export type WalletsWhitelistsOptions = {
  get: {
    address: string;
    asset: string;
  };
  delete: {
    whitelisted_address_id: string;
  };
};
export type WhitelistedAddress = {
  id: string;
  chain: string;
  asset: string;
  address: string;
  status: "ACTIVE" | "PENDING";
  created_at: string;
};

export type CryptoFundingTransfer = {
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

export type CryptoFundingResponse = {
  wallets?: CryptoFundingWallet | CryptoFundingWallet[];
  transfers?: CryptoFundingTransfer[];
};

export type WalletsTransfersOptions = {
  get: {
    asset?: string;
    transfer_id: string;
  };
  post: {
    amount: string;
    address: string;
    asset: string;
  };
};

export type WalletsFeesEstimateOptions = {
  get: {
    asset: string;
    from_address: string;
    to_address: string;
    amount: string;
  };
};

export type Fee = { fee: string };

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
    symbol_or_contract_id: string;
  };
};

export type OptionsContract = {
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
};

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

export type MarketClock = {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
};

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

export type PortfolioHistoryOptions = {
  get: {
    period?: string;
    timeframe?: string;
    intraday_reporting?: string;
    start?: string;
    end?: string;
    pnl_reset?: string;
  };
};

export type PortfolioHistory = {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
  base_value_asof: string;
  timeframe: string;
};

export type DTBPCheck = "both" | "entry" | "exit";

export type TradeConfirmEmail = "all" | "none";

export type MaxMarginMultiplier = "1" | "2";

export type PDTCheck = "both" | "entry" | "exit";

export type MaxOptionsTradingLevel = 0 | 1 | 2;

export type AccountConfigurations = {
  dtbpCheck: DTBPCheck;
  tradeConfirmEmail: TradeConfirmEmail;
  suspendTrade: boolean;
  noShorting: boolean;
  fractionalTrading: boolean;
  maxMarginMultiplier: MaxMarginMultiplier;
  maxOptionsTradingLevel: MaxOptionsTradingLevel;
  pdtCheck: PDTCheck;
  ptpNoExceptionEntry: boolean;
};

export type AccountConfigurationsOptions = {
  patch: {
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
};

export type ActivitiesOptions = {
  get: {
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
};

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

export type DeletedPositionStatus = {
  symbol: string;
  status: number;
  body: Order;
};

export type TakeProfit = {
  limit_price?: string;
};

export type StopLoss = {
  stop_price?: string;
  limit_price?: string;
};

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

export type OrdersOptions = {
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
    order_id: string;
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
    order_id: string;
  };
};

export type PositionsExerciseOptions = {
  post: {
    symbol_or_contract_id: string;
  };
};

export type PositionsOptions = {
  get: {
    symbol_or_asset_id: string;
  };
  delete: {
    symbol_or_asset_id?: string;
    cancel_orders?: boolean;
    qty?: UnstableNumber;
    percentage?: UnstableNumber;
  };
};

export type Position = {
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
};

export type Watchlist = {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: Asset[];
};

export type WatchlistOptions = {
  get: {
    watchlist_id?: string;
  };
  post: {
    name: string;
    symbols: string[] | null;
  };
  patch: {
    name: string;
    symbols: string[] | null;
    watchlist_id: string;
  };
  delete: {
    watchlist_id: string;
  };
};

export type MarketCalendarOptions = {
  start?: string;
  end?: string;
  dateType?: "TRADING" | "SETTLEMENT";
};

export type MarketCalendar = {
  date: string;
  open: string;
  close: string;
  settlement_date: string;
};

export type AssetsOptions = {
  get: {
    symbol_or_asset_id: string;
    status?: string;
    asset_class?: string;
    exchange?: string;
    attributes?: string[];
  };
};

export type WebSocketEvent = "trade_updates" | "listening" | "authorization";

export type WalletsOptions = {
  get: {
    asset: string;
  };
};

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
            get: (params?: PortfolioHistoryOptions["get"]) =>
              request<PortfolioHistory>({
                path: "/v2/account/portfolio/history",
                method: "GET",
                params,
              }),
          },
        },
        configurations: {
          get: () =>
            request<AccountConfigurations>({
              path: "/v2/account/configurations",
            }),
          patch: (data: AccountConfigurationsOptions["patch"]) =>
            request({
              path: "/v2/account/configurations",
              method: "PATCH",
              data,
            }),
        },
        activities: {
          get: (
            params: Pick<ActivitiesOptions["get"], "activity_types"> = {}
          ) =>
            request<AccountActivity[]>({
              path: "/v2/account/activities",
              method: "GET",
              params,
            }),
          [":activity_type"]: {
            get: (options: Omit<ActivitiesOptions["get"], "activity_types">) =>
              request<AccountActivity[]>({
                path: `/v2/account/activities/${options.activity_type}`,
              }),
          },
        },
      },
      orders: {
        get: (params: Omit<OrdersOptions["get"], "order_id">) =>
          request<Order>({
            path: "/v2/orders",
            method: "GET",
            params,
          }),
        [":order_id"]: {
          get: (params: Pick<OrdersOptions["get"], "order_id" | "nested">) =>
            request<Order>({
              path: `/v2/orders/${params.order_id}`,
              method: "GET",
              params,
            }),
          delete: ({ order_id }: OrdersOptions["delete"]) =>
            request({
              path: `/v2/orders/${order_id}`,
              method: "DELETE",
            }),
        },
        post: (data: OrdersOptions["post"]) =>
          request<Order>({
            path: "/v2/orders",
            method: "POST",
            data,
          }),
        patch: ({ order_id, ...data }: OrdersOptions["patch"]) =>
          request<Order>({
            path: `/v2/orders/${order_id}`,
            method: "PATCH",
            data,
          }),
        delete: () =>
          request({
            path: "/v2/orders",
            method: "DELETE",
          }),
      },
      positions: {
        get: () =>
          request<Position[]>({
            path: "/v2/positions",
          }),
        [":symbol_or_asset_id"]: {
          get: ({ symbol_or_asset_id }: PositionsOptions["get"]) =>
            request<Position>({
              path: `/v2/positions/${symbol_or_asset_id}`,
            }),
          delete: ({ symbol_or_asset_id }: PositionsOptions["delete"]) =>
            request<Order>({
              path: `/v2/positions/${symbol_or_asset_id}`,
              method: "DELETE",
            }),
        },
        delete: () =>
          request<DeletedPositionStatus[]>({
            path: "/v2/positions",
            method: "DELETE",
          }),
        exercise: {
          post: ({ symbol_or_contract_id }: PositionsExerciseOptions["post"]) =>
            request({
              path: `/v2/positions/${symbol_or_contract_id}/exercise`,
              method: "POST",
            }),
        },
      },
      watchlists: {
        get: () =>
          request<Watchlist>({
            path: "/v2/watchlists",
          }),
        [":wachlist_id"]: {
          get: ({ watchlist_id }: WatchlistOptions["get"]) =>
            request<Watchlist>({
              path: `/v2/watchlists/${watchlist_id}`,
            }),
        },
        post: (data: WatchlistOptions["post"]) =>
          request<Watchlist>({
            path: "/v2/watchlists",
            method: "POST",
            data,
          }),
        patch: ({ watchlist_id, ...data }: WatchlistOptions["patch"]) =>
          request<Watchlist>({
            path: `/v2/watchlists/${watchlist_id}`,
            method: "PATCH",
            data,
          }),
        delete: ({ watchlist_id }: WatchlistOptions["delete"]) =>
          request({
            path: `/v2/watchlists/${watchlist_id}`,
            method: "DELETE",
          }),
      },
      calendar: {
        get: (params: MarketCalendarOptions = {}) =>
          request<MarketCalendar[]>({
            path: "/v2/calendar",
            method: "GET",
            params,
          }),
      },
      clock: {
        get: () =>
          request<MarketClock>({
            path: "/v2/clock",
          }),
      },
      assets: {
        get: (params: Omit<AssetsOptions["get"], "symbol_or_asset_id"> = {}) =>
          request<Asset[]>({
            path: "/v2/assets",
            method: "GET",
            params,
          }),
        [":symbol_or_asset_id"]: {
          get: ({ symbol_or_asset_id, ...params }: AssetsOptions["get"]) =>
            request<Asset>({
              path: `/v2/assets/${symbol_or_asset_id}`,
              method: "GET",
              params,
            }),
        },
      },
      options: {
        contracts: {
          get: (
            params: Omit<
              OptionsContractsOptions["get"],
              "symbol_or_contract_id"
            > = {}
          ) =>
            request<OptionsContract[]>({
              path: "/v2/options/contracts",
              method: "GET",
              params,
            }),
          [":symbol_or_contract_id"]: {
            get: ({
              symbol_or_contract_id,
            }: Pick<OptionsContractsOptions["get"], "symbol_or_contract_id">) =>
              request<OptionsContract>({
                path: `/v2/options/contracts/${symbol_or_contract_id}`,
                method: "GET",
              }),
          },
        },
      },
      corporate_actions: {
        announcements: {
          get: (
            params: Omit<CorporateActionsAnnouncementsOptions["get"], "id">
          ) =>
            request<CorporateActionAnnouncement[]>({
              path: "/v2/corporate_actions/announcements",
              method: "GET",
              params,
            }),
          [":id"]: {
            get: ({
              id,
            }: Pick<CorporateActionsAnnouncementsOptions["get"], "id">) =>
              request<CorporateActionAnnouncement>({
                path: `/v2/corporate_actions/announcements/${id}`,
                method: "GET",
              }),
          },
        },
      },
      wallets: {
        get: (params?: WalletsOptions["get"]) =>
          request<
            "asset" extends keyof typeof params
              ? CryptoFundingWallet
              : CryptoFundingWallet[]
          >({ path: "/v2/wallets", method: "GET", params }),
        whitelists: {
          get: () =>
            request<WhitelistedAddress[]>({
              path: "/v2/wallets/whitelists",
              method: "GET",
            }),
          post: (data: WalletsWhitelistsOptions["get"]) =>
            request<WhitelistedAddress>({
              path: "/v2/wallets/whitelists",
              method: "POST",
              data,
            }),
          delete: ({
            whitelisted_address_id,
          }: WalletsWhitelistsOptions["delete"]) =>
            request({
              path: `/v2/wallets/whitelists/${whitelisted_address_id}`,
              method: "DELETE",
            }),
        },
        fees: {
          estimate: {
            get: (params: WalletsFeesEstimateOptions) =>
              request<Fee>({
                path: "/v2/wallets/fees/estimate",
                method: "GET",
                params,
              }),
          },
        },
        transfers: {
          get: (params?: Omit<WalletsTransfersOptions["get"], "transfer_id">) =>
            request<CryptoFundingTransfer[]>({
              path: "/v2/wallets/transfers",
              method: "GET",
              params,
            }),
          [":transfer_id"]: {
            get: ({
              transfer_id,
            }: Pick<WalletsTransfersOptions["get"], "transfer_id">) =>
              request<CryptoFundingResponse | CryptoFundingTransfer>({
                path: `/v2/wallets/transfers/${transfer_id}`,
                method: "GET",
              }),
          },
          post: (data: WalletsTransfersOptions["post"]) =>
            request<CryptoFundingTransfer>({
              path: "/v2/wallets/transfers",
              method: "POST",
              data,
            }),
        },
      },
    },
  }),
  // -------------- OK ABOVE THIS LINE -------------- //
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
