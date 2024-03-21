export interface PatchOrderOptions {
  qty?: string;
  time_in_force?: "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";
  limit_price?: string;
  stop_price?: string;
  trail?: string;
  client_order_id?: string;
}

export interface GetOrdersOptions {
  status?: "open" | "closed" | "all";
  limit?: number;
  after?: string;
  until?: string;
  direction?: "asc" | "desc";
  nested?: boolean;
  symbols?: string;
  side?: "buy" | "sell";
}

export interface CreateOrderOptions {
  symbol: string;
  qty?: string;
  notional?: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit" | "trailing_stop";
  time_in_force: "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";
  limit_price?: string;
  stop_price?: string;
  trail_price?: string;
  trail_percent?: string;
  extended_hours: boolean;
  client_order_id?: string;
  order_class?: "simple" | "oco" | "oto" | "bracket";
  take_profit?: {
    limit_price: string;
  };
  stop_loss?: {
    stop_price: string;
    limit_price?: string;
  };
}

export type BaseOrder = {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: string | null;
  expired_at: string | null;
  canceled_at: string | null;
  failed_at: string | null;
  replaced_at: string | null;
  replaced_by: string | null;
  replaces: string | null;
  asset_id: string;
  notional: string | null;
  qty: string;
  filled_qty: string;
  filled_avg_price: string | null;
  order_class: string;
  order_type: string;
  type: string;
  side: string;
  time_in_force: string;
  limit_price: string | null;
  stop_price: string | null;
  status: string;
  extended_hours: boolean;
  legs: any | null;
  trail_percent: string | null;
  trail_price: string | null;
  hwm: string | null;
  subtag: string | null;
  source: string | null;
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
