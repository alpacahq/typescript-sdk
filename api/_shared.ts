// The expected  type for an event map for a given channel
export type EventMap = {
  // deno-lint-ignore no-explicit-any
  [EventKey: string]: { T: string; data: any };
};

// The expected type of a subscription request for a  channel event map
export type SubscriptionRequest<ChannelEventMap extends EventMap> = {
  channel: keyof ChannelEventMap;
  symbols?: string[];
};

export type WebSocketWithEvents<ChannelEventMap extends EventMap> = {
  on: <E extends keyof ChannelEventMap>(
    channel: E,
    event: ChannelEventMap[E]["T"],
    handler: (
      data: Extract<ChannelEventMap[E], { T: ChannelEventMap[E]["T"] }>
    ) => void
  ) => void;
  subscribe: (
    requests: SubscriptionRequest<ChannelEventMap>[]
  ) => Promise<SubscriptionRequest<ChannelEventMap>[]>;
  unsubscribe: (
    requests: SubscriptionRequest<ChannelEventMap>[]
  ) => Promise<SubscriptionRequest<ChannelEventMap>[]>;
};
