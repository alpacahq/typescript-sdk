# typescript-sdk

A TypeScript SDK for the https://alpaca.markets REST API and WebSocket streams.

## Install

While this project is written in Deno/Typescript, it can be used in Node.js as well. This is the most common way to use it.

```sh
npm install @alpacahq/typescript-sdk
```

If however, you are using Deno, you can use the following import statement.

```ts
import { createClient } from "https://deno.land/x/typescript_sdk/mod.ts";
```

## Usage

1. Create a client using `createClient` function.
2. Use the client to make requests to the Alpaca Trade API.

### Example

```ts
import { createClient } from "@alpacahq/typescript-sdk";

// Create a client
const client = createClient(TradeAPI, {
  keyId: "YOUR_API_KEY_ID",
  secretKey: "YOUR_API_SECRET_KEY",
});

// Use the client to make requests
// https://paper-api.alpaca.markets/v2/account GET
client.v2.account.get().then(console.log);
```
