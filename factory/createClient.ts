import * as marketData from "../api/marketData.ts";
import * as trade from "../api/trade.ts";

import { createTokenBucket, TokenBucketOptions } from "./createTokenBucket.ts";

export const baseURLs = {
  live: "https://api.alpaca.markets",
  paper: "https://paper-api.alpaca.markets",
  marketData: "https://data.alpaca.markets",
} as const;

export type BaseURLKey = keyof typeof baseURLs;

export type RequestOptions<T> = {
  path: string;
  method?: string;
  baseURL?: (typeof baseURLs)[BaseURLKey];
  data?: object;
  params?: object;
};

export type Client =
  & { [K in keyof typeof trade]: ReturnType<(typeof trade)[K]> }
  & { [K in keyof typeof marketData]: ReturnType<(typeof marketData)[K]> };

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions<T>) => Promise<T>;
};

export type CreateClientOptions = {
  key?: string;
  secret?: string;
  accessToken?: string;
  baseURL?: (typeof baseURLs)[BaseURLKey];
  paper?: boolean;
  tokenBucket?: TokenBucketOptions;
};

export const createClient = (options: CreateClientOptions) => {
  const {
    key = "",
    secret = "",
    accessToken = "",
    paper = true,
  } = {
    key: options.key || Deno.env.get("APCA_KEY_ID"),
    secret: options.secret || Deno.env.get("APCA_KEY_SECRET"),
    accessToken: options.accessToken || Deno.env.get("APCA_ACCESS_TOKEN"),
  };

  // Check if credentials are provided
  if (!accessToken && (!key || !secret)) {
    throw new Error("Missing credentials (need accessToken or key/secret)");
  }

  const defaultBaseURL = options.baseURL || (paper ? baseURLs.paper : baseURLs.live);

  // Create a token bucket for rate limiting
  const bucket = createTokenBucket(options.tokenBucket);

  // Throttled request function that respects the token bucket
  const request = async <T>({
    method = "GET",
    path,
    params,
    data,
    baseURL = defaultBaseURL
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
    const url = new URL(path, baseURL);

    if (params) {
      // Append query parameters to the URL
      url.search = new URLSearchParams(
        Object.entries(params) as [string, string][],
      ).toString();
    }

    // Construct the headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    if (accessToken) {
      // Use the access token for authentication
      headers.set("Authorization", `Bearer ${accessToken}`);
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
  const context: ClientContext = { options, request };

  // Return an object with all methods
  return [...Object.values(trade), ...Object.values(marketData)].reduce(
    (prev, fn) => ({ ...prev, [fn.name]: fn(context) }),
    {} as Client,
  );
};
