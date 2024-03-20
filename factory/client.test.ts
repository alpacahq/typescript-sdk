import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { Trade } from "../api/trade/index.ts";
import { createClient } from "./client.ts";

const client = createClient(Trade, {
  keyId: "PK1OHDJBZQ6J5HQJZBXX",
  secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
  baseURL: "https://paper-api.alpaca.markets",
});

Deno.test("should return a client with an expected endpoint", () =>
  assert(typeof client.v2.account.get === "function")
);

Deno.test("client should make a successful request", async () => {
  try {
    const account = await client.v2.account.get();
    assert(account.id);
  } catch (error) {
    console.error(error);
    assert(false, "Request failed");
  }
});
