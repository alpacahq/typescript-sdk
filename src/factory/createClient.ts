import marketData from "../api/marketData.ts";
import trade from "../api/trade.ts";

import {
  TokenBucketOptions,
  createTokenBucket,
} from "../factory/createTokenBucket.ts";

import { WebSocketMessage } from "https://deno.land/std@0.92.0/ws/mod.ts";

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
  // @todo fix WebSocket type
  websocket: any;
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
  "wss://stream.data.alpaca.markets/v2/test": marketData.websocket,
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

  // Hold a reference to the WebSocket instance
  let ws: WebSocket | null = null;

  // Check if the base URL is a WebSocket URL
  if (options.baseURL.startsWith("wss://")) {
    // Create a WebSocket instance only for WebSocket base URLs
    ws = new WebSocket(options.baseURL);

    // Add event listeners to the WebSocket instance
    ws.addEventListener("open", () => {
      if (!key || !secret) {
        throw new Error(
          "Missing API key or secret for WebSocket authentication"
        );
      }

      const authMessage = {
        action: "auth",
        key,
        secret,
      };

      ws?.send(JSON.stringify(authMessage));
    });

    ws.addEventListener("message", (event: MessageEvent) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = () => {
          const message = reader.result as string;
          const parsed: WebSocketMessage = JSON.parse(message);

          // Emit a custom event with the parsed message
          ws?.dispatchEvent(
            new CustomEvent("customMessage", { detail: parsed })
          );
        };

        reader.onerror = () => {
          console.error("Error reading Blob:", reader.error);
        };

        reader.readAsText(event.data);
      } else {
        const parsed: WebSocketMessage = JSON.parse(event.data);

        // Emit a custom event with the parsed message
        ws?.dispatchEvent(new CustomEvent("customMessage", { detail: parsed }));
      }
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.addEventListener("error", (event: Event) => {
      console.error("WebSocket error:", event);
    });
  }

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
    }).then(async (response) => {
      if (!response.ok) {
        // The response will contain an error message (usually)
        throw new Error(await response.text());
      }

      // Parse the response and cast it to the expected type
      return response.json().catch(() => ({})) as Promise<T>;
    });
  };

  // Create a context object to pass to the client factory
  const _context: ClientContext = {
    options,
    request,
    websocket: ws as WebSocket,
  };

  // Get the client factory function based on the base URL
  const factory = clientFactoryMap[options.baseURL as T];

  // The factory will be undefined if the base URL is invalid
  if (!factory) {
    throw new Error("Invalid base URL");
  }

  // Create the client using the client factory function
  return Object.assign(factory(_context) as ClientFactoryMap[T], {
    _context,
  });
};
