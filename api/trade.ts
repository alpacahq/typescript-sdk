// await client.v2.account.get();
// await client.v2.orders.post({
//   symbol: "AAPL",
//   qty: 1,
//   side: "buy",
//   type: "market",
//   time_in_force: "gtc",
// });

// await client.v2.orders.get();
// await client.v2.orders.delete();
// await client.v2.orders.orderId("order_id").get();
// await client.v2.orders.orderId("order_id").patch({
//   qty: 2,
// });

// await client.v2.orders.orderId("order_id").delete();

export const TradeAPITemplate = {
  v2: {
    account: {
      get: {
        method: "GET",
        path: "/v2/account",
      },
    },
  },
};

type CreateTradeClientOptions = {
  keyId: string;
  secretKey: string;
  paper?: boolean;
};

export const createTradeClient = ({
  keyId,
  secretKey,
  paper = true,
}: CreateTradeClientOptions) => {
  return {};
};
