import { ClientContext } from "../../factory/createClient.ts";

export const TradeAPIWebsocket = (context: ClientContext) => {
  return context.connect?.();
};
