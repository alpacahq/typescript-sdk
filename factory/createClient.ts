import { createRateLimiter } from "./createRateLimiter.ts";

export type Client<T> = T;

export type ClientFactory<T> = (context: ClientContext) => T;

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<T>;
};

export type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
};

type RequestOptions = {
  method?: string;
  path: string;
  params?: Record<string, any>;
  data?: object;
};

export type RateLimiterOptions = {
  tokensPerInterval?: number;
  interval?: number;
};

export type ExtendedCreateClientOptions = CreateClientOptions & {
  rateLimiterOptions?: RateLimiterOptions;
};

export function createClient<T>(
  factory: ClientFactory<T>,
  options: ExtendedCreateClientOptions
): Client<T> {
  const { tokensPerInterval = 200, interval = 60 } =
    options.rateLimiterOptions || {};
  const rateLimiter = createRateLimiter(tokensPerInterval, interval);

  const context: ClientContext = {
    options,
    request: async <T>({
      method = "GET",
      path,
      params,
      data,
    }: RequestOptions): Promise<T> => {
      while (!rateLimiter.consume()) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      let finalPath = path;
      if (params) {
        for (const [key, value] of Object.entries(params)) {
          finalPath = finalPath.replace(`{${key}}`, encodeURIComponent(value));
        }
      }
      const url = `${options.baseURL}${finalPath}`;
      const headers = new Headers({
        "APCA-API-KEY-ID": options.keyId,
        "APCA-API-SECRET-KEY": options.secretKey,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      });

      if (!response.ok) {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
  };

  return factory(context);
}
