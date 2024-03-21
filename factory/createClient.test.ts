import { createClient } from "./createClient.ts";

Deno.test("misc", () => {
  const { rest, websocket } = createClient({
    keyId: "PK1OHDJBZQ6J5HQJZBXX",
    secretKey: "7ntdrZayazQkRxINbLWcn4ib0Nv58AlTQH0IqzbQ",
    baseURL: "https://paper-api.alpaca.markets",
  });
});
