import { TokenBucketOptions, createTokenBucket } from "./createTokenBucket.ts";

// The options required to make a request
export type RequestOptions = {
  path: string;
  data?: object;
  method?: string;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
};

// Used to share the client options and request function between the different API methods
export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<T>;
};

// The options required to create a client
export type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
  tokenBucket?: TokenBucketOptions;
};

// Infer the return type of a client method
export type ClientMethodsReturn<T> = T extends (
  // deno-lint-ignore no-explicit-any
  ...args: any[]
) => infer R
  ? R
  : T;

// Used to enforce the client context consumer type
export type ClientContextConsumer<T> = (context: ClientContext) => T;

// deno-lint-ignore no-explicit-any
type ClientMethods<T extends (...args: any[]) => any> = ReturnType<
  ClientContextConsumer<ClientMethodsReturn<T>>
>;

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

export type ClientSub = {
  rest: ClientMethods<any>;
  websocket: WebSocketWithEvents<any>;
};

// The object returned by createClient
export type Client = {
  trade: {
    rest: {};
    websocket: {};
  };
  marketData: {
    rest: {};
    websocket: {};
  };
};

/**
 * Creates a new client with the given options
 * @param {CreateClientOptions} options - the options to create the client with
 * @returns {Client} - a new client
 * @example
 * const client = createClient({
 *  keyId: "APCA-API-KEY-ID",
 *  secretKey: "APCA-API-KEY-SECRET",
 *  baseURL: "https://paper-api.alpaca.markets",
 *  rateLimiterOptions: {
 *    capacity: 5,
 *    fillRate: 1,
 *  },
 * });
 */
export function createClient({
  // De-structured, not needed in the context
  tokenBucket,
  ...options
}: CreateClientOptions): Client {
  // New token bucket (defaults to rate limit in alpaca docs)
  const bucket = createTokenBucket(tokenBucket);

  // New request function that waits for tokens to be available before making a request
  const request = async <T>({
    method = "GET",
    path,
    params,
    data,
  }: RequestOptions): Promise<T> => {
    await new Promise((resolve) => {
      // If there are enough tokens, resolve immediately
      // Otherwise, wait until there are enough tokens (polling every second)
      const timer = setInterval(() => {
        if (bucket.take(1)) {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000);
    });

    // Holds the final path with parameters replaced
    let qualified = path;

    if (params) {
      // Replace path parameters with the actual values
      for (const [key, value] of Object.entries(params)) {
        qualified = qualified.replace(`{${key}}`, encodeURIComponent(value));
      }
    }

    const url = `${options.baseURL}${qualified}`;
    const headers = new Headers({
      "APCA-API-KEY-ID": options.keyId,
      "APCA-API-SECRET-KEY": options.secretKey,
      "Content-Type": "application/json",
    });

    return (
      fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      })
        .then((response) => {
          // If the response is not ok, throw an error
          if (!response.ok) {
            throw new Error(
              `failed to fetch ${url}: ${response.status} ${response.statusText}`
            );
          }

          return response.json();
        })
        // Catch any other errors and log them
        .catch((error) => console.error(error))
    );
  };

  // Build the context object
  const context: ClientContext = { options, request };

  return {
    rest: {
      // Instantiate the trade methods with the context
      trade: trade(context),
      // Instantiate the market data methods with the context
      marketData: marketData(context),
    },
    websocket: {} as any,
  };
}
