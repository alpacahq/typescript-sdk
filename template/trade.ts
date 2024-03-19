import { DynamicEndpoint, Endpoint, NestedEndpoint } from "./_shared.ts";

export type TradeTemplate = {
  [key: string]: Endpoint<any> | NestedEndpoint | DynamicEndpoint;
};

export default {
  v2: {
    account: { method: "GET", url: "/account" },
    orders: {
      method: "GET",
      url: "/orders",
      post: { method: "POST", url: "/orders" },
      delete: { method: "DELETE", url: "/orders" },
      orderId: (id: string): NestedEndpoint => ({
        get: { method: "GET", url: `/orders/${id}` },
        patch: { method: "PATCH", url: `/orders/${id}` },
        delete: { method: "DELETE", url: `/orders/${id}` },
      }),
    },
  },
} as TradeTemplate;
