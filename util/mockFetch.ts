export type MockResponse = Response | object | string;

export type MockFetch = (url: string, init?: RequestInit) => Promise<Response>;

// Used to mock the fetch function in tests
export const mockFetch: (response: MockResponse) => MockFetch =
  (response) => (_url, _init?) =>
    // Return a promise that resolves with a response
    Promise.resolve(
      new Response(
        typeof response === "object"
          ? JSON.stringify(response)
          : (response as string),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
