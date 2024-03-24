import { assert } from "https://deno.land/std@0.220.0/assert/mod.ts";
import { websocket } from "../api/marketData.ts";
import { createClient } from "./createClient.ts";

Deno.test("creates a client with trade and marketData APIs", () => {
  const { trade, marketData } = createClient({
    keyId: "test",
    secretKey: "test",
    baseURL: "https://paper-api.alpaca.markets",
  });

  assert(trade !== undefined, "trade");
  assert(websocket !== undefined, "marketData");
  assert(
    typeof trade.rest.v2.account.get === "function",
    "trade.v2.account.get"
  );
  assert(
    typeof marketData.rest.v2.stocks.getConditionCodes === "function",
    "marketData.v2.stocks.getConditionCodes"
  );
});

// Deno.test("createClient - request handles parameters and data", async () => {
//   const client = createClient({
//     keyId: "testKeyId",
//     secretKey: "testSecretKey",
//     baseURL: "https://example.com",
//   });

//   const response = await client.rest.trade({
//     path: "/test/{param}",
//     params: { param: "value" },
//     data: { test: "data" },
//   });

//   assertEquals(response.finalPath, "/test/value");
//   assertEquals(response.data, { test: "data" });
// });

// Deno.test("createClient - throws error on API call failure", async () => {
//   const client = createClient({
//     keyId: "testKeyId",
//     secretKey: "testSecretKey",
//     baseURL: "https://example.com",
//   });

//   await assertRejects(
//     () =>
//       client.rest.trade({
//         path: "/invalid-endpoint",
//       }),
//     Error,
//     "API call failed"
//   );
// });

// Deno.test("createClient - constructs websocket clients correctly", () => {
//   const { websocket } = createClient({
//     keyId: "PK1OHDJBZQ6J5HQJZBXX",
//     secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
//     baseURL: "https://paper-api.alpaca.markets",
//   });

//   assert(websocket.trade instanceof TradeWebSocket);
//   assert(websocket.marketData.stock instanceof StockDataWebSocket);
//   assert(websocket.marketData.crypto instanceof CryptoWebSocket);
//   assert(websocket.marketData.news instanceof NewsWebSocket);
//   assert(websocket.marketData.options instanceof OptionsWebSocket);
// });
