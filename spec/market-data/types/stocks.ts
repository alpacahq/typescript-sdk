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
  quotes: {
    [symbol: string]: LatestQuote;
  };
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
