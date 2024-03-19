interface AccountResponse {
  id: string;
  status: string;
}

interface Endpoint {
  method: string;
  path: string;
}

interface APITemplate {
  account: {
    get: Endpoint;
  };
}

interface TradeAPIClient {
  v2: {
    account: {
      get: () => Promise<AccountResponse>;
    };
  };
}

const TradeAPITemplate: APITemplate = {
  account: {
    get: {
      method: "GET",
      path: "/v2/account",
    },
  },
};

type CreateTradeClientOptions = {
  keyId: string;
  secretKey: string;
  paper?: boolean;
};

export const createTradeClient = ({
  keyId,
  secretKey,
  paper = true,
}: CreateTradeClientOptions): TradeAPIClient => {
  const request = async <ResponseType>(
    method: string,
    path: string,
    data?: object
  ): Promise<ResponseType> => {
    const baseUrl = "https://paper-api.alpaca.markets";
    const url = `${baseUrl}${path}`;
    const headers = new Headers({
      "APCA-API-KEY-ID": keyId,
      "APCA-API-SECRET-KEY": secretKey,
      "Content-Type": "application/json",
    });

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    return response.json();
  };

  return {
    v2: {
      account: {
        get: () =>
          request<AccountResponse>(
            TradeAPITemplate.account.get.method,
            TradeAPITemplate.account.get.path
          ),
      },
    },
  };
};
