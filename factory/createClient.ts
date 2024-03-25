import marketData from "../api/marketData.ts";
import trade from "../api/trade.ts";

import { TokenBucketOptions, createTokenBucket } from "./createTokenBucket.ts";

export type Trade = ReturnType<typeof trade>;
export type MarketData = ReturnType<typeof marketData>;

// Infer the client type based on the base URL
type ClientFactoryMap = {
  "https://paper-api.alpaca.markets": Trade;
  "https://data.alpaca.markets": MarketData;
};

export type Client = Trade | MarketData;

type RequestOptions<T> = {
  method?: string;
  path: string;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
  data?: object;
  responseType?: T;
};

type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
  tokenBucket?: TokenBucketOptions;
};

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions<T>) => Promise<Response & { data: T }>;
};

export type ClientWithContext<T extends keyof ClientFactoryMap> =
  ClientFactoryMap[T] & {
    _context: ClientContext;
  };

export function createClient<T extends keyof ClientFactoryMap>(
  options: CreateClientOptions & { baseURL: T }
): ClientWithContext<T> {
  // Create a token bucket for rate limiting
  const bucket = createTokenBucket(options.tokenBucket);

  // Throttled request function that respects the token bucket
  const request = async <T>({
    method = "GET",
    path,
    params,
    data,
  }: RequestOptions<T>): Promise<Response & { data: T }> => {
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

    // Hold the final path
    let modified = path;
    if (params) {
      // Replace path parameters with actual values
      for (const [key, value] of Object.entries(params)) {
        modified = modified.replace(`{${key}}`, encodeURIComponent(value));
      }
    }

    // Construct the full URL
    const url = `${options.baseURL}${modified}`;

    // Construct the headers
    const headers = new Headers({
      "APCA-API-KEY-ID": options.keyId,
      "APCA-API-SECRET-KEY": options.secretKey,
      "Content-Type": "application/json",
    });

    // Make the request and return the Response object
    return fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to ${method} ${url}: ${response.status} ${response.statusText}`
        );
      }
      const responseData = await response.json();
      return Object.assign(response, { data: responseData as T });
    });
  };

  // Create a context object to pass to the client factory
  const context: ClientContext = {
    options,
    request,
  };

  // Conditionally return client based on the base URL
  const factory = (context: ClientContext): ClientWithContext<T> => {
    let client: ClientFactoryMap[T];
    if (options.baseURL === "https://paper-api.alpaca.markets") {
      client = trade(context) as ClientFactoryMap[T];
    } else if (options.baseURL === "https://data.alpaca.markets") {
      client = marketData(context) as ClientFactoryMap[T];
    } else {
      throw new Error("invalid base URL");
    }
    return Object.assign(client, { _context: context });
  };

  return factory(context);
}
