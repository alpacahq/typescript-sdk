export const mockFetch =
  (response: any) => (_url: string, _init?: RequestInit) => {
    return Promise.resolve(
      new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  };
