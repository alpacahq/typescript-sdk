import { data, trading } from "./rest.ts";

import { TokenBucketOptions, createTokenBucket } from "./createTokenBucket.ts";

export type RequestOptions<T> = {
  method?: string;
  path: string;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
  data?: object;
  responseType?: T;
};

export type CreateClientOptions = {
  key?: string;
  secret?: string;
  baseURL?: string;
  accessToken?: string;
  tokenBucket?: TokenBucketOptions;
};

export type Client = Trade | MarketData;

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions<T>) => Promise<T>;
};

export type ClientWithContext<T extends keyof ClientFactoryMap> =
  ClientFactoryMap[T] & {
    _context: ClientContext;
  };

export type Trade = ReturnType<typeof trading>;
export type MarketData = ReturnType<typeof data>;

// Infer the client type based on the base URL
export type ClientFactoryMap = {
  "https://paper-api.alpaca.markets": Trade;
  "https://data.alpaca.markets": MarketData;
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
      // Add query parameters to the URL
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.append(key, value);
      }
    }

    // Construct the headers
    const headers = new Headers({
      "APCA-API-KEY-ID": options.key || Deno.env.get("APCA_KEY_ID") || "",
      "APCA-API-SECRET-KEY":
        options.secret || Deno.env.get("APCA_KEY_SECRET") || "",
      "Content-Type": "application/json",
    });

    // Make the request
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

      try {
        const jsonData = await response.json();
        return Object.assign(response, { data: jsonData as T }).data;
      } catch (error) {
        if (
          error instanceof SyntaxError &&
          error.message.includes("Unexpected end of JSON input")
        ) {
          // Return an empty object or a default value instead of throwing an error
          return Object.assign(response, { data: {} as T }).data;
        }

        // Re-throw other errors
        throw error;
      }
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
      client = trading(context) as ClientFactoryMap[T];
    } else if (options.baseURL === "https://data.alpaca.markets") {
      client = data(context) as ClientFactoryMap[T];
    } else {
      throw new Error("invalid base URL");
    }

    return Object.assign(client, { _context: context });
  };

  return factory(context);
}

// client.<resource>.<method>(options)
