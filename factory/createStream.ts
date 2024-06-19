// NOT CLEANED UP; TYPES MISSING FOR CALLBACKS; BARELY FUNCTIONAL

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

type EventCallback = (data: any) => void;

type TradeUpdate = {
  event: string;
  price: string;
  qty: string;
  timestamp: string;
};

export const createStream = (options: CreateStreamOptions) => {
  const {
    type,
    version = "v2",
    feed = "iex",
    autoReconnect = true,
    maxRetries = 5,
    retryDelay = 3000,
  } = options;

  const key = options.key || Deno.env.get("APCA_KEY_ID");
  const secret = options.secret || Deno.env.get("APCA_KEY_SECRET");

  if (!key || !secret) {
    console.error("API key and secret are required.");
    return;
  }

  let url: string;

  if (type === "data" || type === "data_sandbox") {
    url = `${baseURLs[type]}/${version}/${feed}`;
  } else if (type === "data_test") {
    url = baseURLs[type];
  } else {
    url = `${baseURLs[type]}/stream`;
  }

  console.log(url);
  let socket: Nullable<WebSocket> = null;
  let retries = 0;
  const eventCallbacks: { [event: string]: EventCallback[] } = {};
  const activeStreams: Set<string> = new Set();
  let isAuthenticated = false;

  const handle = (message: any) => {
    const event = message.stream;
    if (event && eventCallbacks[event]) {
      eventCallbacks[event].forEach((callback) => callback(message));
    } else {
      console.debug("Unhandled message:", message);
    }
  };

  const connect = () => {
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
      if (typeof data === "string") {
        console.log("Received text message:", data);
        try {
          const result = JSON.parse(data);
          if (
            result.stream === "authorization" &&
            result.data.status === "authorized"
          ) {
            isAuthenticated = true;
            sendListenMessage();
          }
          handle(result);
        } catch (error) {
          console.debug("Error parsing text message:", error);
        }
      } else if (data instanceof Blob) {
        console.log("Received binary message:", data);
        const reader = new FileReader();
        reader.onload = function () {
          if (typeof reader.result === "string") {
            try {
              const result = JSON.parse(reader.result);
              if (
                result.stream === "authorization" &&
                result.data.status === "authorized"
              ) {
                isAuthenticated = true;
                sendListenMessage();
              }
              handle(result);
            } catch (error) {
              console.debug("Error parsing binary message:", error);
            }
          }
        };
        reader.readAsText(data);
      } else {
        console.debug("Unknown message type:", data);
      }
    };
  };

  connect();

  const sendListenMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN && isAuthenticated) {
      console.log("Sending listen message:", Array.from(activeStreams));
      socket.send(
        JSON.stringify({
          action: "listen",
          data: {
            streams: Array.from(activeStreams),
          },
        }),
      );
    } else {
      console.debug(
        "Socket is not open or not authenticated. Cannot send listen message.",
      );
    }
  };

  const subscribe = (event: string, callback: EventCallback) => {
    console.log("Subscribing to event:", event);
    if (!eventCallbacks[event]) {
      eventCallbacks[event] = [];
    }
    eventCallbacks[event].push(callback);
    activeStreams.add(event);
    sendListenMessage();
  };

  const unsubscribe = (event: string) => {
    if (eventCallbacks[event]) {
      delete eventCallbacks[event];
      activeStreams.delete(event);
      sendListenMessage();
    }
  };

  return {
    socket,
    close: () => socket?.close(),
    subscribe,
    unsubscribe,
  };
};

// const stream = createStream({
//   type: "account_paper",
//   key: "key",
//   secret: "secret",
//   autoReconnect: true,
//   maxRetries: 5,
//   retryDelay: 3000,
// });

// stream.subscribe("trade_updates", (data) => {
//   // trade update received
// });
