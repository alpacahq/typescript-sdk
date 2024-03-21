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
