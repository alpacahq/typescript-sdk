interface BaseEvent {
  timestamp: string;
}

interface NewEvent extends BaseEvent {
  type: "new";
}

interface FillEvent extends BaseEvent {
  type: "fill";
  price: number;
  position_qty: number;
}

interface PartialFillEvent extends BaseEvent {
  type: "partial_fill";
  price: number;
  position_qty: number;
}

interface CanceledEvent extends BaseEvent {
  type: "canceled";
}

interface ExpiredEvent extends BaseEvent {
  type: "expired";
}

interface DoneForDayEvent extends BaseEvent {
  type: "done_for_day";
}

interface ReplacedEvent extends BaseEvent {
  type: "replaced";
}

interface RejectedEvent extends BaseEvent {
  type: "rejected";
}

interface PendingNewEvent extends BaseEvent {
  type: "pending_new";
}

interface StoppedEvent extends BaseEvent {
  type: "stopped";
}

interface PendingCancelEvent extends BaseEvent {
  type: "pending_cancel";
}

interface PendingReplaceEvent extends BaseEvent {
  type: "pending_replace";
}

interface CalculatedEvent extends BaseEvent {
  type: "calculated";
}

interface SuspendedEvent extends BaseEvent {
  type: "suspended";
}

interface OrderReplaceRejectedEvent extends BaseEvent {
  type: "order_replace_rejected";
}

interface OrderCancelRejectedEvent extends BaseEvent {
  type: "order_cancel_rejected";
}

type TradeEvent =
  | NewEvent
  | FillEvent
  | PartialFillEvent
  | CanceledEvent
  | ExpiredEvent
  | DoneForDayEvent
  | ReplacedEvent
  | RejectedEvent
  | PendingNewEvent
  | StoppedEvent
  | PendingCancelEvent
  | PendingReplaceEvent
  | CalculatedEvent
  | SuspendedEvent
  | OrderReplaceRejectedEvent
  | OrderCancelRejectedEvent;

type TradeUpdateEvent = {
  type:
    | "new"
    | "fill"
    | "partial_fill"
    | "canceled"
    | "expired"
    | "replaced"
    | "rejected"
    | "order_cancel_rejected"
    | "order_replace_rejected";
  timestamp: string;
};

interface ChannelEventMap {
  trade_updates: TradeUpdateEvent;
}

type TradeSubscriptionRequest = {
  channel: keyof ChannelEventMap;
  symbols?: string[];
};

export type TradeWebSocket = {
  on: <E extends keyof ChannelEventMap>(
    channel: E,
    event: E extends keyof ChannelEventMap ? ChannelEventMap[E]["type"] : never,
    handler: (
      data: Extract<ChannelEventMap[E], { type: ChannelEventMap[E]["type"] }>
    ) => void
  ) => void;
  subscribe: (
    requests: TradeSubscriptionRequest[]
  ) => Promise<TradeSubscriptionRequest[]>;
  unsubscribe: (
    requests: TradeSubscriptionRequest[]
  ) => Promise<TradeSubscriptionRequest[]>;
};
