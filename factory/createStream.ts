// NOT CLEANED UP; TYPES MISSING FOR CALLBACKS

import { Nullable } from "../api/trade.ts";

const baseURLs = {
  data: "wss://stream.data.alpaca.markets",
  data_sandbox: "wss://stream.data.sandbox.alpaca.markets",
  data_test: "wss://stream.data.alpaca.markets/v2/test",
  account: "wss://api.alpaca.markets",
  account_paper: "wss://paper-api.alpaca.markets",
} as const;

type BaseURLKey = keyof typeof baseURLs;

type CreateStreamOptions = {
  type: BaseURLKey;
  key?: string;
  secret?: string;
  version?: "v2";
  feed?: "iex" | "sip";
  autoReconnect?: boolean;
  maxRetries?: number;
  retryDelay?: number;
};

export const createStream = (options: CreateStreamOptions): void => {
  const {
    type,
    version = "v2",
    feed = "iex",
    autoReconnect = true,
    maxRetries = 5,
    retryDelay = 3000,
  } = options;

  // Default to environment variables if key or secret are not provided
  const key = options.key || Deno.env.get("APCA_KEY_ID");
  const secret = options.secret || Deno.env.get("APCA_KEY_SECRET");

  if (!key || !secret) {
    console.error("API key and secret are required.");
    return;
  }

  let url: string;

  if (type === "data" || type === "data_sandbox") {
    // Modify the URL to include version and feed
    url = `${baseURLs[type]}/${version}/${feed}`;
  } else if (type === "data_test") {
    // Test data URL is already fine
    url = baseURLs[type];
  } else {
    // Otherwise, we're dealing with an account stream
    url = `${baseURLs[type]}/stream`;
  }

  let socket: Nullable<WebSocket> = null;
  let retries = 0;

  // Handle incoming messages
  const handle = (message: object) => {
    // @todo: will be passed to a callback with proper typing
    console.debug(message);
  };

  const connect = () => {
    // If auto-reconnect is disabled or max retries reached, stop trying to reconnect
    // and close the WebSocket connection.
    if (!autoReconnect || (maxRetries !== undefined && retries >= maxRetries)) {
      console.debug("Auto-reconnect is disabled or max retries reached.");
      socket?.close();
      return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
      console.debug(
        "WebSocket connection established. Sending authentication message.",
      );

      socket?.send(
        JSON.stringify({
          action: "auth",
          key: key,
          secret: secret,
        }),
      );
    };

    socket.onclose = () => {
      console.debug("WebSocket connection closed. Attempting to reconnect...");
      retries++;
      setTimeout(connect, retryDelay);
    };

    socket.onerror = (error) => {
      console.debug("WebSocket encountered an error:", error);
      socket?.close();
    };

    socket.onmessage = ({ data }) => {
      try {
        const messages = JSON.parse(data);

        // Only the data stream sends an array of messages
        if (Array.isArray(messages)) {
          messages.forEach(handle);
          return;
        }

        // deno-lint-ignore no-empty
      } catch (_) {}

      const blob = new Blob([data]);
      const reader = new FileReader();

      reader.onload = function () {
        if (typeof reader.result === "string") {
          try {
            const result = JSON.parse(reader.result);
            if (Array.isArray(result)) {
              result.forEach(handle);
            } else {
              handle(result);
            }
          } catch (error) {
            console.debug("Error parsing message:", error);
          }
        }
      };

      reader.readAsText(blob);
    };
  };

  connect();
};
