export type Method = "GET" | "POST" | "PATCH" | "DELETE";

export type Endpoint<Response> = {
  method: Method;
  url: string;
};

export type NestedEndpoint = {
  [operation: string]: Endpoint<any> | NestedEndpoint | DynamicEndpoint;
};

export type DynamicEndpoint = (...args: any[]) => NestedEndpoint;
