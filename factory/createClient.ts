import { createRateLimiter } from "./createRateLimiter.ts";

export type Client<T> = T;

export type ClientFactory<T> = (context: ClientContext) => T;

export type ClientContext = {
  options: CreateClientOptions;
  request: <T>(options: RequestOptions) => Promise<T>;
  connect?: () => Promise<WebSocket>;
  webSocket?: WebSocket;
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
  const webSocket = new WebSocket(options.baseURL);

  const { tokensPerInterval = 200, interval = 60 } =
    options.rateLimiterOptions || {};

  const rateLimiter = createRateLimiter({
    tokensPerInterval,
    interval,
  });

  const context: ClientContext = {
    webSocket,
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
    connect: async () => {
      const webSocket = new WebSocket(context.options.baseURL);

      return await new Promise((resolve, reject) => {
        webSocket.addEventListener("open", () => {
          webSocket.send(
            JSON.stringify({
              action: "auth",
              key: context.options.keyId,
              secret: context.options.secretKey,
            })
          );
        });

        webSocket.addEventListener("message", (event) => {
          console.log("Message from server:", event.data);

          const processMessage = (data: any) => {
            try {
              const message =
                typeof data === "string" ? JSON.parse(data) : data;
              if (
                message.stream === "authorization" &&
                message.data &&
                message.data.status === "authorized"
              ) {
                resolve(webSocket);
              } else {
                reject(new Error("Authorization failed"));
              }
            } catch (e) {
              console.error("Error parsing message:", e);
              reject(e);
            }
          };

          if (event.data instanceof Blob) {
            const reader = new FileReader();

            reader.onload = () => processMessage(reader.result);
            reader.onerror = () => {
              console.error("Error reading the blob");
              reject(new Error("Error reading the blob"));
            };

            reader.readAsText(event.data);
          } else {
            processMessage(event.data);
          }
        });

        webSocket.addEventListener("error", (event) => {
          console.error("WebSocket error:", event);
          reject(new Error("WebSocket error"));
        });

        webSocket.addEventListener("close", (event) => {
          console.log("WebSocket connection closed:", event);
          reject(new Error("WebSocket closed unexpectedly"));
        });
      });
    },
  };

  return factory(context);
}
