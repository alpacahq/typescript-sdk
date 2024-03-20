type CreateClientOptions = {
  keyId: string;
  secretKey: string;
  baseURL: string;
};

type EndpointFunction = () => { method: string; url: string };
type PromiseReturnType<T extends EndpointFunction> = () => Promise<
  ReturnType<T>
>;

type DynamicApiFunctions<T> = {
  [P in keyof T]: T[P] extends EndpointFunction
    ? PromiseReturnType<T[P]>
    : T[P] extends object
    ? DynamicApiFunctions<T[P]>
    : never;
};

export function createClient<T>(
  api: T,
  { keyId, secretKey, baseURL }: CreateClientOptions
): DynamicApiFunctions<T> {
  const request = async ({
    method,
    path,
    data,
  }: {
    method: string;
    path: string;
    data?: object;
  }): Promise<any> => {
    // Consider specifying a more detailed type than 'any'.
    const url = `${baseURL}${path}`;
    const headers = new Headers({
      "APCA-API-KEY-ID": keyId,
      "APCA-API-SECRET-KEY": secretKey,
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `API call failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  function constructEndpoint(endpoint: { method: string; url: string }) {
    return async () => request({ method: endpoint.method, path: endpoint.url });
  }

  function buildApiObject(apiStructure: any): any {
    return Object.keys(apiStructure).reduce((acc, key) => {
      const value = apiStructure[key];
      if (typeof value === "function") {
        const endpoint = value();
        //@ts-ignore
        acc[key] = constructEndpoint(endpoint);
      } else if (typeof value === "object" && value !== null) {
        //@ts-ignore
        acc[key] = buildApiObject(value);
      }
      return acc;
    }, {});
  }

  return buildApiObject(api) as DynamicApiFunctions<T>;
}
