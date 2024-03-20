import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { TradeAPI } from "../api/tradeAPI.ts";
import { createClient } from "./createClient.ts";

const client = createClient(TradeAPI, {
  keyId: "PK1OHDJBZQ6J5HQJZBXX",
  secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
  baseURL: "https://paper-api.alpaca.markets",
});

// Deno.test(
//   "createTradeClient should return a client with expected endpoints",
//   async () => {
//     assert(typeof client.getAccount === "function");
//     assert(typeof client.getOrders === "function");
//     // Add more assertions for other expected endpoints
//   }
// );

Deno.test("client endpoints should make successful requests", async () => {
  try {
    const account = await client.v2.account.get();
    console.log(JSON.stringify(account, null, 2));
    assert(account);
  } catch (error) {
    console.error(error);
    assert(false, "Request failed");
  }
});
