import { methods } from "../api/marketData/methods.ts";
import { methods as methods2 } from "../api/trade/methods.ts";
import {
  createBottleneck,
  CreateBottleneckOptions,
} from "./createBottleneck.ts";

type WebSocket = {
  on: (handler: () => void) => void;
  // when called, will open a connection to the server and authenticate, then subscribe to the given streams
  subscribe: (streams: string[]) => Promise<string[]>;
  unsubscribe: (streams: string[]) => Promise<string[]>;
};

export type Client = {
  rest: {
    trade: ReturnType<typeof methods>;
    marketData: ReturnType<typeof methods2>;
  };
  websocket: {
    trade: WebSocket;
    marketData: {
      stock: WebSocket;
      crypto: WebSocket;
      news: WebSocket;
      options: WebSocket;
    };
  };
};

export type ClientFactory = (context: ClientContext) => any;

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<unknown>;
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

export type ExtendedCreateClientOptions = CreateClientOptions & {
  rateLimiterOptions?: CreateBottleneckOptions;
};

export function createClient(options: ExtendedCreateClientOptions): Client {
  const { tokensPerInterval = 200, interval = 60 } =
    options.rateLimiterOptions || {};

  const bottleneck = createBottleneck({
    tokensPerInterval,
    interval,
  });

  const context: ClientContext = {
    options,
    request: async <T>({
      method = "GET",
      path,
      params,
      data,
    }: RequestOptions): Promise<T> => {
      while (!bottleneck.consume()) {
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

  return {
    trade: methods(context),
    marketData: methods2(context),
  };
}
