import { TradingAPI } from "./trading.ts";

type ClientOptions = {
  apiKey: string;
  apiSecret: string;
  baseURL: string;
};

type Endpoint = keyof TradingAPI;
type Method = TradingAPI[Endpoint]["method"];
type Params<E extends Endpoint> = TradingAPI[E]["params"];
type Response<E extends Endpoint> = TradingAPI[E]["response"];

function createClient(options: ClientOptions) {
  const call = async <E extends Endpoint>(
    method: Method,
    endpoint: E,
    params?: Params<E>
  ): Promise<Response<E>> => {
    const url = new URL(`${options.baseURL}${endpoint}`);
    if (params && method === "GET") {
      Object.entries(params as Record<string, string>).forEach(
        ([key, value]) => {
          url.searchParams.append(key, value);
        }
      );
    }
    const response = await fetch(url.toString(), {
      method,
      headers: {
        "APCA-API-KEY-ID": options.apiKey,
        "APCA-API-SECRET-KEY": options.apiSecret,
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(params) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return (await response.json()) as Response<E>;
  };

  return { call };
}

const client = createClient({} as any);

client.call("GET", "/v2/account/activities", {}).then((response) => {
  console.log(response);
});
