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
