import { ClientContext } from "../factory/createClient.ts";

export const tradeAPI = (ctx: ClientContext) => ({
  v2: {
    account: {
      get: () => ctx.request({ method: "GET", path: "/v2/account" }),
    },
  },
});
