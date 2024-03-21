export interface HistoricalOptionBarsResponse {
  bars: OptionBar[];
  next_page_token: string | null;
}

export interface OptionBar {
  t: string; // Timestamp in RFC-3339 format
  o: number; // Opening price
  h: number; // High price
  l: number; // Low price
  c: number; // Closing price
  v: number; // Bar volume
  n: number; // Trade count in the bar
  vw: number; // Volume weighted average price
}

export interface OptionExchangeMapping {
  [exchangeCode: string]: string;
}

export interface LatestQuotesResponse {
  quotes: {
    [symbol: string]: {
      t: string; // Timestamp in RFC-3339 format
      ax: string; // Ask exchange
      ap: number; // Ask price
      as: number; // Ask size
      bx: string; // Bid exchange
      bp: number; // Bid price
      bs: number; // Bid size
      c: string; // Condition
    };
  };
}

export interface LatestTradesResponse {
  trades: {
    [symbol: string]: {
      t: string; // Timestamp in RFC-3339 format
      x: string; // Exchange code
      p: number; // Trade price
      s: number; // Trade size
      c: string; // Condition
    };
  };
}

export interface HistoricalTradesResponse {
  trades: {
    [symbol: string]: {
      t: string; // Timestamp in RFC-3339 format
      x: string; // Exchange code
      p: number; // Trade price
      s: number; // Trade size
      c: string; // Condition
    }[];
  };
  next_page_token: string | null;
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
  t: string; // Timestamp in RFC-3339 format
  x: string; // Exchange code
  p: number; // Trade price
  s: number; // Trade size
  c: string; // Condition
}

interface QuoteSnapshot {
  t: string; // Timestamp in RFC-3339 format
  ax: string; // Ask exchange code
  ap: number; // Ask price
  as: number; // Ask size
  bx: string; // Bid exchange code
  bp: number; // Bid price
  bs: number; // Bid size
  c: string; // Condition
}
