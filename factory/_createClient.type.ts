import marketData from "../api/marketData.ts";
import trade from "../api/trading.ts";

import { TokenBucketOptions } from "./_createTokenBucket.type.ts";

export type RequestOptions<T> = {
  method?: string;
  path: string;
  // deno-lint-ignore no-explicit-any
  params?: Record<string, any>;
  data?: object;
  responseType?: T;
};

export type CreateClientOptions = {
  keyId?: string;
  secretKey?: string;
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

export type Trade = ReturnType<typeof trade>;
export type MarketData = ReturnType<typeof marketData>;

// Infer the client type based on the base URL
export type ClientFactoryMap = {
  "https://paper-api.alpaca.markets": Trade;
  "https://data.alpaca.markets": MarketData;
};
