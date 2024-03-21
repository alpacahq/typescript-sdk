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
