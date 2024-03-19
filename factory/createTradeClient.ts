type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface Endpoint<Response> {
  method: Method;
  url: string;
}

interface AccountResponse {
  id: string;
  status: string;
}

interface OrderResponse {
  id: string;
  symbol: string;
  qty: number;
}

interface OrdersResponse {
  orders: OrderResponse[];
}

interface NestedEndpoint {
  [operation: string]: Endpoint<any> | NestedEndpoint | DynamicEndpoint;
}

type DynamicEndpoint = (...args: any[]) => NestedEndpoint;

interface APIEndpointTemplate {
  [key: string]: Endpoint<any> | NestedEndpoint | DynamicEndpoint;
}

const apiTemplate: APIEndpointTemplate = {
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
};

type EndpointFunction<Response> = (data?: object) => Promise<Response>;
type InferAPITemplateFunctions<Template> = {
  [K in keyof Template]: Template[K] extends Endpoint<infer R>
    ? EndpointFunction<R>
    : Template[K] extends (...args: any[]) => APIEndpointTemplate
    ? (...args: any[]) => InferAPITemplateFunctions<ReturnType<Template[K]>>
    : InferAPITemplateFunctions<Template[K]>;
};

type CreateTradeClientOptions = {
  keyId: string;
  secretKey: string;
  paper?: boolean;
};

function createTradeClient({
  keyId,
  secretKey,
  paper = true,
}: CreateTradeClientOptions): InferAPITemplateFunctions<typeof apiTemplate> {
  async function request<Response>(
    method: Method,
    url: string,
    data: object = {}
  ): Promise<Response> {
    const fullUrl = `https://paper-api.alpaca.markets${url}`;
    const headers = new Headers({
      "APCA-API-KEY-ID": keyId,
      "APCA-API-SECRET-KEY": secretKey,
      "Content-Type": "application/json",
    });

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    return response.json() as Promise<Response>;
  }

  function buildEndpoints<Config extends APIEndpointTemplate>(
    config: Config,
    basePath = ""
  ): InferAPITemplateFunctions<Config> {
    const result: any = {};
    Object.keys(config).forEach((key) => {
      const value = config[key];

      if (typeof value === "function") {
        result[key] = (...args: any[]) =>
          buildEndpoints(value(...args), basePath);
        return;
      }

      if (typeof value === "object" && "method" in value && "url" in value) {
        const endpoint: Endpoint<any> = value as Endpoint<any>;
        result[key] = <T>(data: object = {}) =>
          request<T>(endpoint.method, basePath + endpoint.url, data);
        return;
      }

      if (typeof value === "object") {
        result[key] = buildEndpoints(value as APIEndpointTemplate, basePath);
      }
    });
    return result as InferAPITemplateFunctions<Config>;
  }

  return buildEndpoints(apiTemplate);
}
