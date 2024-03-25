import { createClient } from "./factory/createClient.ts";

const client = createClient({
  // Replace these with your own API key and secret
  keyId: "xxxxxxxxxxxx",
  secretKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  baseURL: "https://paper-api.alpaca.markets",
});

async function main() {
  const account = await client.getAccount();
  console.log(account);
}

main();
