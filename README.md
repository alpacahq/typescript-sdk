# typescript-sdk

typescript sdk for alpaca trade api

```ts
import { createClient } from "@alpacahq/typescript-sdk";

const client = createClient(TradeAPI, {
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
});

// https://paper-api.alpaca.markets/v2/account GET
// https://paper-api.alpaca.markets/v2/orders POST
// https://paper-api.alpaca.markets/v2/orders GET
// https://paper-api.alpaca.markets/v2/orders DELETE
// https://paper-api.alpaca.markets/v2/orders/{order_id} GET
// https://paper-api.alpaca.markets/v2/orders/{order_id} PATCH
// https://paper-api.alpaca.markets/v2/orders/{order_id} DELETE

await client.v2.account();
await client.v2.orders.post({
  symbol: "AAPL",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "gtc",
});

await client.v2.orders.get();
await client.v2.orders.delete();
await client.v2.orders.orderId("order_id").get();
await client.v2.orders.orderId("order_id").patch({
  qty: 2,
});

await client.v2.orders.orderId("order_id").delete();
```
