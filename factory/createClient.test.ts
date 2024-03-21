import { Trade } from "../api/trade/rest.ts";
import { MarketData } from "../api/trade/websocket.ts";
import { createClient } from "./createClient.ts";

Deno.test("rest", () => {
  const client = createClient(Trade, {
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "https://paper-api.alpaca.markets",
  });

  client.v2.account.get().then(console.log);
});

Deno.test("stream", async () => {
  const client = createClient(MarketData, {
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "wss://paper-api.alpaca.markets/stream",
  });

  client.connect(
    (message) => {
      console.log("Received message:", message);
    },
    (error) => {
      console.error("WebSocket error:", error);
    }
  );

  await new Promise((resolve) => setTimeout(resolve, 10000000));
});
