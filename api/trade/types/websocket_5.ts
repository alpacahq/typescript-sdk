interface BaseOptionEvent {
  T: string;
  S: string;
  t: string;
}

interface OptionTradeEvent extends BaseOptionEvent {
  T: "t";
  p: number;
  s: number;
  x: string;
  c: string;
}

interface OptionQuoteEvent extends BaseOptionEvent {
  T: "q";
  bx: string;
  bp: number;
  bs: number;
  ax: string;
  ap: number;
  as: number;
  c: string;
}

interface OptionSuccessMessage {
  T: "success";
  msg: string;
}

interface OptionErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface OptionSubscriptionMessage {
  T: "subscription";
  trades: string[];
  quotes: string[];
}

type OptionMessage =
  | OptionTradeEvent
  | OptionQuoteEvent
  | OptionSuccessMessage
  | OptionErrorMessage
  | OptionSubscriptionMessage;

type OptionAction = "subscribe" | "unsubscribe";
type OptionChannel = "trades" | "quotes";

interface OptionSubscriptionRequest {
  action: OptionAction;
  trades?: string[];
  quotes?: string[];
}

export type OptionsWebSocket = {
  on: (event: "message", handler: (data: OptionMessage[]) => void) => void;
  send: (data: OptionSubscriptionRequest) => void;
};
