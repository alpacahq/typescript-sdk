import { ClientContext } from "../../factory/client.ts";
import { Account } from "./types/account.ts";

export const TradeAPI = (context: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        context.request<Account>({
          path: "/v2/account",
        }),
    },
  },
});
