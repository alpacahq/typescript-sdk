import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { mockFetch } from "./mockFetch.ts";

Deno.test("mockFetch should return a function", () => {
  const response = { data: "mocked response" };
  const result = mockFetch(response);

  assert(typeof result === "function");
});

Deno.test(
  "mockFetch should return a promise that resolves to a response object",
  async () => {
    const response = { data: "mocked response" };
    const fetch = mockFetch(response);
    const result = await fetch("https://example.com");

    assert(result instanceof Response);
    assert(result.ok === true);
    assert(result.status === 200);
    assert(result.headers.get("Content-Type") === "application/json");
  }
);

Deno.test("mockFetch should return the mocked response data", async () => {
  const response = { data: "mocked response" };
  const fetch = mockFetch(response);
  const result = await fetch("https://example.com");
  const data = await result.json();

  assert(data.data === response.data);
});

Deno.test("mockFetch should ignore the url and init parameters", async () => {
  const response = { data: "mocked response" };
  const fetch = mockFetch(response);

  const a = await fetch("https://example.com");
  const b = await fetch("https://example.com/other", {
    method: "POST",
    body: JSON.stringify({ key: "value" }),
  });

  const c = await a.json();
  const d = await b.json();

  assert(c.data === response.data);
  assert(d.data === response.data);
});
