import { marketData, trade } from "../api/index.ts";
import { TradeWebSocket } from "../api/trade/types/websocket.ts";
import { StockDataWebSocket } from "../api/trade/types/websocket_2.ts";
import { CryptoWebSocket } from "../api/trade/types/websocket_3.ts";
import { NewsWebSocket } from "../api/trade/types/websocket_4.ts";
import { OptionsWebSocket } from "../api/trade/types/websocket_5.ts";
import { TokenBucketOptions, createTokenBucket } from "./createTokenBucket.ts";

// Used to share the client options and request function between the different API methods
export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<T>;
};

// The options required to create a client
type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
  tokenBucket?: TokenBucketOptions;
};

// The options required to make a request
type RequestOptions = {
  path: string;
  data?: object;
  method?: string;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
};

// The client object that is returned by createClient
export type Client = {
  rest: {
    trade: ReturnType<typeof trade>;
    marketData: ReturnType<typeof marketData>;
  };
  websocket: {
    trade: TradeWebSocket;
    marketData: {
      stock: StockDataWebSocket;
      crypto: CryptoWebSocket;
      news: NewsWebSocket;
      options: OptionsWebSocket;
    };
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

  const context: ClientContext = { options, request };

  return {
    rest: {
      trade: trade(context),
      marketData: marketData(context),
    },
    websocket: {} as any,
  };
}
