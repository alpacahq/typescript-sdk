export const mockFetch =
  // deno-lint-ignore no-explicit-any
  (response: any) => (_url: string, _init?: RequestInit) => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    } as Response);
  };
