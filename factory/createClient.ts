import { methods } from "../api/marketData/methods.ts";
import { methods as methods2 } from "../api/trade/methods.ts";
import { TradeWebSocket } from "../api/trade/types/websocket.ts";
import { StockDataWebSocket } from "../api/trade/types/websocket_2.ts";
import { CryptoWebSocket } from "../api/trade/types/websocket_3.ts";
import { NewsWebSocket } from "../api/trade/types/websocket_4.ts";
import { OptionsWebSocket } from "../api/trade/types/websocket_5.ts";
import { TokenBucketOptions, createTokenBucket } from "./createTokenBucket.ts";

export type Client = {
  rest: {
    trade: ReturnType<typeof methods2>;
    marketData: ReturnType<typeof methods>;
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

export type ClientFactory = (context: ClientContext) => any;

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<unknown>;
};

type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
  rateLimiterOptions?: TokenBucketOptions;
};

type RequestOptions = {
  method?: string;
  path: string;
  params?: Record<string, any>;
  data?: object;
};

export function createClient(options: CreateClientOptions): Client {
  const { rateLimiterOptions } = options;
  const rateLimiter = createTokenBucket(rateLimiterOptions);

  const throttledRequest = async ({
    method = "GET",
    path,
    params,
    data,
  }: RequestOptions): Promise<any> => {
    await new Promise((resolve) => {
      const timer = setInterval(() => {
        if (rateLimiter.take(1)) {
          clearInterval(timer);
          resolve(true);
        }
      }, 1000); // Check every second if a token is available
    });

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

    return fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    });
  };

  const context: ClientContext = {
    options,
    request: throttledRequest,
  };

  return {
    rest: {
      trade: methods2(context),
      marketData: methods(context),
    },
    websocket: {} as any,
  };
}
