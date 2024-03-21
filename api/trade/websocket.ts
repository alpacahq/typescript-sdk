import { ClientContext } from "../../factory/createClient.ts";

export const TradeAPIWebsocket = (context: ClientContext) => {
  context.connect?.();
  return context.webSocket;
};
