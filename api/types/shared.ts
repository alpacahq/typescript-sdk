import { ClientContext } from "../../factory/createClient.ts";

export type ClientContextConsumer<T> = (context: ClientContext) => T;
