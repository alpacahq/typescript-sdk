interface BaseEvent {
  T: string;
  S: string;
  t: string;
}

interface TradeEvent extends BaseEvent {
  T: "t";
  p: number;
  s: number;
  i: number;
  tks: "B" | "S";
}

interface QuoteEvent extends BaseEvent {
  T: "q";
  bp: number;
  bs: number;
  ap: number;
  as: number;
}

interface BarEvent extends BaseEvent {
  T: "b" | "d" | "u";
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  n?: number;
  vw?: number;
}

interface OrderbookEvent extends BaseEvent {
  T: "o";
  b: { p: number; s: number }[];
  a: { p: number; s: number }[];
  r?: boolean;
}

interface SuccessMessage {
  T: "success";
  msg: string;
}

interface ErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface SubscriptionMessage {
  T: "subscription";
  trades: string[];
  quotes: string[];
  bars: string[];
  orderbooks: string[];
}

type CryptoMessage =
  | TradeEvent
  | QuoteEvent
  | BarEvent
  | OrderbookEvent
  | SuccessMessage
  | ErrorMessage
  | SubscriptionMessage;

interface CryptoChannelEventMap {
  trades: TradeEvent;
  quotes: QuoteEvent;
  bars: BarEvent;
  orderbooks: OrderbookEvent;
}

type CryptoSubscriptionRequest = {
  channel: keyof CryptoChannelEventMap;
  symbols?: string[];
};

export type CryptoWebSocket = {
  on: <E extends keyof CryptoChannelEventMap>(
    channel: E,
    event: E extends keyof CryptoChannelEventMap
      ? CryptoChannelEventMap[E]["T"]
      : never,
    handler: (
      data: Extract<
        CryptoChannelEventMap[E],
        { T: CryptoChannelEventMap[E]["T"] }
      >
    ) => void
  ) => void;
  subscribe: (
    requests: CryptoSubscriptionRequest[]
  ) => Promise<CryptoSubscriptionRequest[]>;
  unsubscribe: (
    requests: CryptoSubscriptionRequest[]
  ) => Promise<CryptoSubscriptionRequest[]>;
};
