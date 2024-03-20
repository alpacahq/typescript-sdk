export interface HistoricalBarsResponse {
  bars: { [symbol: string]: CryptoBar[] };
  next_page_token: string | null;
}

export interface CryptoBar {
  t: string; // Timestamp
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
  v: number; // Volume
  n: number; // Trade count
  vw: number; // Volume weighted average price
}

export interface LatestBarsResponse {
  bars: { [symbol: string]: CryptoBar };
}

export interface LatestOrderbooksResponse {
  orderbooks: { [symbol: string]: CryptoOrderbook };
}

export interface CryptoOrderbook {
  t: string; // Timestamp
  b: OrderbookEntry[]; // Bid orderbook entries
  a: OrderbookEntry[]; // Ask orderbook entries
}

export interface OrderbookEntry {
  p: number; // Price
  s: number; // Size
}

export interface LatestQuotesResponse {
  quotes: { [symbol: string]: CryptoQuote };
}

export interface CryptoQuote {
  t: string; // Timestamp
  bp: number; // Bid price
  bs: number; // Bid size
  ap: number; // Ask price
  as: number; // Ask size
}

export interface LatestTradesResponse {
  trades: { [symbol: string]: CryptoTrade };
}

export interface CryptoTrade {
  t: string; // Timestamp
  p: number; // Price
  s: number; // Size
  tks: string; // Trade side (S: Sell, B: Buy)
  i: number; // Trade ID
}

export interface HistoricalQuotesResponse {
  quotes: { [symbol: string]: CryptoQuote[] };
  next_page_token: string | null;
}

export interface CryptoSnapshotsResponse {
  snapshots: { [symbol: string]: CryptoSnapshot };
}

interface CryptoSnapshot {
  dailyBar: BarData;
  latestQuote: QuoteData;
  latestTrade: TradeData;
  minuteBar: BarData;
  prevDailyBar: BarData;
}

interface BarData {
  t: string; // Timestamp
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  c: number; // Close price
  v: number; // Volume
  vw: number; // Volume weighted average price
  n: number; // Number of trades
}

interface QuoteData {
  t: string; // Timestamp
  bp: number; // Bid price
  bs: number; // Bid size
  ap: number; // Ask price
  as: number; // Ask size
}

interface TradeData {
  t: string; // Timestamp
  p: number; // Trade price
  s: number; // Trade size
  tks: string; // Trade side (Buy or Sell)
}

export interface CryptoHistoricalTradesResponse {
  trades: { [symbol: string]: CryptoTrade[] };
  next_page_token: string | null;
}
