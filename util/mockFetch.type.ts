export type MockResponse = Response | object | string;

export type MockFetch = (url: string, init?: RequestInit) => Promise<Response>;
