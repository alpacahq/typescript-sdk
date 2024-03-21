interface NewsEvent {
  T: "n";
  id: number;
  headline: string;
  summary: string;
  author: string;
  created_at: string;
  updated_at: string;
  url: string;
  content: string;
  symbols: string[];
  source: string;
}

interface NewsSuccessMessage {
  T: "success";
  msg: string;
}

interface NewsErrorMessage {
  T: "error";
  code: number;
  msg: string;
}

interface NewsSubscriptionMessage {
  T: "subscription";
  news: string[];
}

type NewsMessage =
  | NewsEvent
  | NewsSuccessMessage
  | NewsErrorMessage
  | NewsSubscriptionMessage;

type NewsAction = "subscribe" | "unsubscribe";

interface NewsSubscriptionRequest {
  action: NewsAction;
  news: string[];
}

export type NewsWebSocket = {
  on: (event: "message", handler: (data: NewsMessage[]) => void) => void;
  send: (data: NewsSubscriptionRequest) => void;
};
