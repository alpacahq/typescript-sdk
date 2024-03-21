export interface MarketClock {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
}
