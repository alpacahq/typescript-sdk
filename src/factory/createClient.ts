import marketData from "../api/marketData.ts";
import trade from "../api/trade.ts";

import {
  TokenBucketOptions,
  createTokenBucket,
} from "../factory/createTokenBucket.ts";

import { WebSocketClient } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

export type RequestOptions<T> = {
  path: string;
  method?: string;
  data?: object;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
};

export type CreateClientOptions = {
  key?: string;
  secret?: string;
  token?: string;
  baseURL: string;
  tokenBucket?: TokenBucketOptions;
};

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions<T>) => Promise<T>;
  websocket: WebSocketClient;
};

const clientFactoryMap = {
  // REST (JSON)
  "https://api.alpaca.markets": trade.rest,
  "https://paper-api.alpaca.markets": trade.rest,
  "https://data.alpaca.markets": marketData.rest,
  // WebSocket (binary)
  "wss://paper-api.alpaca.markets/stream": trade.websocket,
  "wss://api.alpaca.markets/stream": trade.websocket,
  // WebSocket (JSON)
  "wss://data.alpaca.markets/stream": marketData.websocket,
} as const;

export type ClientFactoryMap = {
  [K in keyof typeof clientFactoryMap]: ReturnType<
    (typeof clientFactoryMap)[K]
  >;
};

export type ClientWithContext<T extends keyof ClientFactoryMap> =
  ClientFactoryMap[T] & {
    _context: ClientContext;
  };

export const createClient = <T extends keyof ClientFactoryMap>(
  options: CreateClientOptions & { baseURL?: T }
): ClientWithContext<T> => {
  // Create a token bucket for rate limiting
  const bucket = createTokenBucket(options.tokenBucket);

  // Throttled request function that respects the token bucket
  const request = async <T>({
    method = "GET",
    path,
    params,
    data,
  }: RequestOptions<T>): Promise<T> => {
    await new Promise((resolve) => {
      // Poll the token bucket every second
      const timer = setInterval(() => {
        // If a token is available, resolve the promise
        if (bucket.take(1)) {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000);
    });

    // Construct the URL
    const url = new URL(path, options.baseURL);

    if (params) {
      // Append query parameters to the URL
      url.search = new URLSearchParams(
        Object.entries(params) as [string, string][]
      ).toString();
    }

    const {
      key = "",
      secret = "",
      token = "",
    } = {
      key: options.key || Deno.env.get("APCA_KEY_ID"),
      secret: options.secret || Deno.env.get("APCA_KEY_SECRET"),
      token: options.token || Deno.env.get("APCA_ACCESS_TOKEN"),
    };

    // Check if credentials are provided
    if (!token && (!key || !secret)) {
      throw new Error("Missing credentials (need accessToken or key/secret)");
    }

    // Construct the headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (token) {
      // Use the access token for authentication
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      // Use the API key and secret for authentication
      headers.set("APCA-API-KEY-ID", key);
      headers.set("APCA-API-SECRET-KEY", secret);
    }

    // Make the request
    return fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to ${method} ${url}: ${response.status} ${response.statusText}`
        );
      }

      try {
        // Parse the response and cast it to the expected type
        return response.json() as Promise<T>;
      } catch (error) {
        if (
          error instanceof SyntaxError &&
          error.message.includes("Unexpected end of JSON input")
        ) {
          // Return an empty object or a default value instead of throwing an error
          return {} as T;
        }

        // Re-throw other errors
        throw error;
      }
    });
  };

  // Create a WebSocket client
  // const websocket = new StandardWebSocketClient(options.baseURL);

  // Create a context object to pass to the client factory
  const context: ClientContext = {
    options,
    request,
    websocket: null as any,
  };

  // Get the client factory function based on the base URL
  const clientFactory = clientFactoryMap[options.baseURL as T];

  if (!clientFactory) {
    throw new Error("Invalid base URL");
  }

  // Create the client using the client factory function
  const client = clientFactory(context) as ClientFactoryMap[T];

  return Object.assign(client, { _context: context });
};
