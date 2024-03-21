type Trade = {
  T: "t";
  i: number;
  S: string;
  x: string;
  p: number;
  s: number;
  c: string[];
  t: string;
  z: string;
};

type Quote = {
  T: "q";
  S: string;
  bx: string;
  bp: number;
  bs: number;
  ax: string;
  ap: number;
  as: number;
  c: string[];
  t: string;
  z: string;
};

type Bar = {
  T: "b" | "d" | "u";
  S: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  t: string;
};

type Correction = {
  T: "c";
  S: string;
  x: string;
  oi: number;
  op: number;
  os: number;
  oc: string[];
  ci: number;
  cp: number;
  cs: number;
  cc: string[];
  t: string;
  z: string;
};

type CancelError = {
  T: "x";
  S: string;
  i: number;
  x: string;
  p: number;
  s: number;
  a: string;
  t: string;
  z: string;
};

type LULD = {
  T: "l";
  S: string;
  u: number;
  d: number;
  i: string;
  t: string;
  z: string;
};

type TradingStatus = {
  T: "s";
  S: string;
  sc: string;
  sm: string;
  rc: string;
  rm: string;
  t: string;
  z: string;
};

type SuccessMessage = {
  T: "success";
  msg: string;
};

type ErrorMessage = {
  T: "error";
  code: number;
  msg: string;
};

type SubscriptionMessage = {
  T: "subscription";
  trades: string[];
  quotes: string[];
  bars: string[];
  updatedBars: string[];
  dailyBars: string[];
  statuses: string[];
  lulds: string[];
  corrections: string[];
  cancelErrors: string[];
};

type StockDataMessage =
  | Trade
  | Quote
  | Bar
  | Correction
  | CancelError
  | LULD
  | TradingStatus
  | SuccessMessage
  | ErrorMessage
  | SubscriptionMessage;

interface StockChannelEventMap {
  trades: Trade;
  quotes: Quote;
  bars: Bar;
  dailyBars: Bar;
  updatedBars: Bar;
  statuses: TradingStatus;
  lulds: LULD;
}

type SubscriptionRequest = {
  channel: keyof StockChannelEventMap;
  symbols: string[];
};

export type StockDataWebSocket = {
  on: <E extends keyof StockChannelEventMap>(
    channel: E,
    event: E extends keyof StockChannelEventMap
      ? StockChannelEventMap[E]["T"]
      : never,
    handler: (
      data: Extract<
        StockChannelEventMap[E],
        { T: StockChannelEventMap[E]["T"] }
      >
    ) => void
  ) => void;
  subscribe: (
    requests: SubscriptionRequest[]
  ) => Promise<SubscriptionRequest[]>;
  unsubscribe: (
    requests: SubscriptionRequest[]
  ) => Promise<SubscriptionRequest[]>;
};
