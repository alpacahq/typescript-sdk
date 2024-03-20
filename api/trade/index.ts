import { ClientContext } from "../../factory/client.ts";
import { AccountResponse } from "./types/account.ts";

export const TradeAPI = (context: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        context.request<AccountResponse>({
          path: "/v2/account",
        }),
    },
  },
});
