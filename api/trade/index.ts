import {
  CreateOrderOptions,
  Order,
  PatchOrderOptions,
} from "./types/orders.ts";

import { ClientContext } from "../../factory/client.ts";
import { Account } from "./types/accounts.ts";

export const TradeAPI = (context: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        context.request<Account>({
          path: "/v2/account",
        }),
    },
    orders: {
      post: (options: CreateOrderOptions) =>
        context.request<Order>({
          path: "/v2/orders",
          method: "POST",
          data: options,
        }),
      get: (options?: PatchOrderOptions | string, nested?: boolean) => {
        let path = "/v2/orders";
        let params = {};

        if (typeof options === "string") {
          path += `/${options}`;

          if (nested !== undefined) {
            params = { nested };
          }
        } else if (typeof options === "object") {
          params = options;
        }

        return context.request<Order | Order[]>({
          path,
          method: "GET",
          params,
        });
      },
      delete: (orderId?: string) => {
        let path = "/v2/orders";

        if (orderId) {
          path += `/${orderId}`;
        }

        return context.request<{ id?: string; status?: string }[] | void>({
          path,
          method: "DELETE",
        });
      },
      patch: (orderId: string, options: PatchOrderOptions) =>
        context.request<Order>({
          path: `/v2/orders/${orderId}`,
          method: "PATCH",
          data: options,
        }),
    },
  },
});
