import Template from "../template/trade.ts";

import { Endpoint, Method } from "../template/_shared.ts";
import { TradeTemplate } from "../template/trade.ts";

type EndpointFunction<Response> = (data?: object) => Promise<Response>;

type InferAPITemplateFunctions<Template> = {
  [K in keyof Template]: Template[K] extends Endpoint<infer R>
    ? EndpointFunction<R>
    : Template[K] extends (...args: any[]) => TradeTemplate
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
}: CreateTradeClientOptions): InferAPITemplateFunctions<typeof Template> {
  const request = async <Response>(
    method: Method,
    url: string,
    data: object = {}
  ): Promise<Response> => {
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
  };

  const buildEndpoints = <Config extends TradeTemplate>(
    config: Config,
    basePath = ""
  ): InferAPITemplateFunctions<Config> => {
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
        result[key] = buildEndpoints(value as TradeTemplate, basePath);
      }
    });
    return result as InferAPITemplateFunctions<Config>;
  };

  return buildEndpoints(Template);
}
