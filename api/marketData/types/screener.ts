export interface MostActivesResponse {
  most_actives: MostActiveStock[];
  last_updated: string;
}

export interface MostActiveStock {
  symbol: string;
  volume: number;
  trade_count: number;
}

export interface MarketMoversResponse {
  gainers: MarketMover[];
  losers: MarketMover[];
  market_type: string;
  last_updated: string;
}

export interface MarketMover {
  symbol: string;
  percent_change: number;
  change: number;
  price: number;
}
