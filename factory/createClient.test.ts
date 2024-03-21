import { TradeAPIRest } from "../api/trade/rest.ts";
import { TradeAPIWebsocket } from "../api/trade/websocket.ts";
import { createClient } from "./createClient.ts";

Deno.test("rest", () => {
  const client = createClient(TradeAPIRest, {
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "https://paper-api.alpaca.markets",
  });

  client.v2.account.get().then(console.log);
});

Deno.test("stream", async () => {
  const client = createClient(TradeAPIWebsocket, {
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "wss://paper-api.alpaca.markets/stream",
  });

  await new Promise((resolve) => setTimeout(resolve, 10000));
});
