import marketData from "../api/marketData.ts";
import trade from "../api/trading.ts";

import {
  ClientContext,
  ClientFactoryMap,
  ClientWithContext,
} from "./_createClient.type.ts";

import { CreateClientOptions, RequestOptions } from "./_createClient.type.ts";
import { createTokenBucket } from "./createTokenBucket.ts";

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
      "APCA-API-KEY-ID": options.keyId || Deno.env.get("APCA_KEY_ID") || "",
      "APCA-API-SECRET-KEY":
        options.secretKey || Deno.env.get("APCA_KEY_SECRET") || "",
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
