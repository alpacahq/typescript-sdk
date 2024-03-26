import { MockFetch, MockResponse } from "./_mockFetch.type.ts";

export const mockFetch: (response: MockResponse) => MockFetch =
  (response) => (_url, _init?) =>
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
