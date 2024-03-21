import { ClientContext } from "../../factory/createClient.ts";

export const MarketData = (context: ClientContext) => ({
  connect: (
    onMessage: (data: any) => void,
    onError: (error: Event) => void
  ) => {
    const ws = new WebSocket(context.options.baseURL);

    ws.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);

      ws.send(
        JSON.stringify({
          action: "auth",
          key: context.options.keyId,
          secret: context.options.secretKey,
        })
      );
    });

    ws.addEventListener("message", (event) => {
      console.log("Message from server:", event.data);

      if (event.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = () => {
          const text = reader.result;
          console.log("Received text:", text);
          try {
            const message = JSON.parse(text as string);
            onMessage(message);
          } catch (e) {
            console.error("Error parsing message:", e);
          }
        };

        reader.onerror = () => {
          console.error("Error reading the blob");
        };

        reader.readAsText(event.data);
      } else if (typeof event.data === "string") {
        try {
          const message = JSON.parse(event.data);
          onMessage(message);
        } catch (e) {
          console.error("Error parsing message:", e);
        }
      } else {
        console.error("Received non-text, non-blob message");
      }
    });

    ws.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      onError(event);
    });

    ws.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });

    return ws;
  },
});
