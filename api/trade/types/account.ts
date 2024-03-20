export type Account = {
  // Account Id (required)
  id: string;

  // Account number
  account_number: string;

  // Status of the account (required). Possible values:
  // - ONBOARDING: The account is onboarding
  // - SUBMISSION_FAILED: The account application submission failed
  // - SUBMITTED: The account application has been submitted for review
  // - ACCOUNT_UPDATED: Account information is being updated
  // - APPROVAL_PENDING: Final account approval is pending
  // - ACTIVE: The account is active for trading
  // - REJECTED: The account application has been rejected
  status:
    | "ONBOARDING"
    | "SUBMISSION_FAILED"
    | "SUBMITTED"
    | "ACCOUNT_UPDATED"
    | "APPROVAL_PENDING"
    | "ACTIVE"
    | "REJECTED";

  // Currency of the account, typically USD
  currency: string;

  // Cash Balance
  cash: string;

  // Total value of cash + holding positions. Deprecated, equivalent to the equity field
  portfolio_value: string;

  // Current available non-margin dollar buying power
  non_marginable_buying_power: string;

  // The fees that have been accrued
  accrued_fees: string;

  // Cash pending transfer into the account
  pending_transfer_in: string;

  // Cash pending transfer out of the account
  pending_transfer_out: string;

  // Whether or not the account has been flagged as a pattern day trader
  pattern_day_trader: boolean;

  // If true, the account is not allowed to place orders due to user settings
  trade_suspended_by_user: boolean;

  // If true, the account is not allowed to place orders
  trading_blocked: boolean;

  // If true, the account is not allowed to request money transfers
  transfers_blocked: boolean;

  // If true, all account activities by the user are prohibited
  account_blocked: boolean;

  // Timestamp when this account was created
  created_at: string; // Use ISO 8601 date-time string format

  // Flag to denote whether the account is permitted to short
  shorting_enabled: boolean;

  // Real-time mark-to-market value of all long positions held in the account
  long_market_value: string;

  // Real-time mark-to-market value of all short positions held in the account
  short_market_value: string;

  // Cash + long_market_value + short_market_value
  equity: string;

  // Equity as of the previous trading day at 16:00:00 ET
  last_equity: string;

  // Buying power multiplier representing account margin classification
  multiplier: string;

  // Current available buying power
  buying_power: string;

  // Reg T initial margin requirement (continuously updated)
  initial_margin: string;

  // Maintenance margin requirement (continuously updated)
  maintenance_margin: string;

  // Value of the special memorandum account
  sma: string;

  // Current number of day trades that have been made in the last 5 trading days
  daytrade_count: number;

  // Maintenance margin requirement on the previous trading day
  last_maintenance_margin: string;

  // Buying power for day trades (continuously updated)
  daytrading_buying_power: string;

  // Buying power under Regulation T
  regt_buying_power: string;

  // Buying power for options trading
  options_buying_power: string;

  // The options trading level that was approved for this account
  options_approved_level: 0 | 1 | 2;

  // The effective options trading level of the account
  options_trading_level: 0 | 1 | 2;
};
