import { Trade } from "../api/trade/index.ts";
import { createClient } from "./createClient.ts";

Deno.test("generic", () => {
  // do whatever you want
  const client = createClient(Trade, {
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "https://paper-api.alpaca.markets",
  });

  client.v2.account.get().then(console.log);
});
