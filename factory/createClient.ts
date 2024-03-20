export type ClientContext = {
  options: CreateClientOptions;
  request: (options: RequestOptions) => Promise<unknown>;
};

type RequestOptions = {
  method: string;
  path: string;
  params?: Record<string, any>;
  data?: object;
};

export type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
};

export type Client<T> = T;

export type ClientFactory<T> = (ctx: ClientContext) => T;

export function createClient<T>(
  factory: ClientFactory<T>,
  options: CreateClientOptions
): Client<T> {
  const context: ClientContext = {
    options,
    request: async ({
      method,
      path,
      params,
      data,
    }: RequestOptions): Promise<any> => {
      let finalPath = path;
      if (params) {
        for (const [key, value] of Object.entries(params)) {
          finalPath = finalPath.replace(`{${key}}`, encodeURIComponent(value));
        }
      }
      const url = `${options.baseURL}${finalPath}`;
      const headers = new Headers({
        "APCA-API-KEY-ID": options.keyId,
        "APCA-API-SECRET-KEY": options.secretKey,
        "Content-Type": "application/json",
      });

      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      });

      if (!response.ok) {
        throw new Error(
          `API call failed: ${response.status} ${response.statusText}`
        );
      }

      return response.json();
    },
  };

  return factory(context);
}
