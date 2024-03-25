import trade, { CreateOrderOptions, Order } from "./trading.ts";

import {
  ClosePositionOptions,
  GetOrdersOptions,
  PatchOrderOptions,
  Position,
  PositionClosedResponse,
} from "./trading.ts";

import { assertEquals } from "https://deno.land/std@0.152.0/testing/asserts.ts";
import { assert } from "https://deno.land/std@0.217.0/assert/assert.ts";
import { ClientContext, RequestOptions } from "../factory/createClient.ts";
import { mockFetch } from "../util/mockFetch.ts";
import {
  AccountActivity,
  AccountConfigurations,
  AnnouncementsQueryParams,
  Asset,
  CorporateActionAnnouncement,
  CreateWatchlistParams,
  GetActivitiesOptions,
  MarketCalendar,
  MarketClock,
  OptionContract,
  OptionContractsQueryParams,
  PortfolioHistoryParams,
  PortfolioHistoryResponse,
  UpdatedAccountConfigurations,
  Watchlist,
} from "./trading.ts";

Deno.test(
  "account.get should send a request with the correct path",
  async () => {
    let requestedPath = "";

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>({ path }: { path: string }): Promise<T> => {
        requestedPath = path;
        const response = {
          id: "abc123",
          account_number: "1234567890",
          status: "ACTIVE",
        };

        return mockFetch(response)("") as Promise<T>;
      },
    };

    const client = trade(mockContext);

    await client.getAccount();

    assert(requestedPath === "/v2/account");
  }
);

Deno.test(
  "createOrder should send a POST request with the correct path and options",
  async () => {
    let requestedOptions: RequestOptions<Order> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Order>;
        const response = {
          id: "order_123",
          client_order_id: "client_order_123",
          created_at: "2023-05-25T10:00:00Z",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const orderOptions: CreateOrderOptions = {
      symbol: "AAPL",
      qty: 10,
      side: "buy",
      type: "market",
      time_in_force: "day",
    };

    await tradeClient.createOrder(orderOptions);

    assert(requestedOptions?.path === "/v2/orders");
    assert(requestedOptions?.method === "POST");
    assert(requestedOptions?.data === orderOptions);
  }
);

Deno.test(
  "updateOrder should send a PATCH request with the correct path and options",
  async () => {
    let requestedOptions: RequestOptions<Order | Order[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Order | Order[]>;
        const response = {
          id: "order_123",
          client_order_id: "client_order_123",
          created_at: "2023-05-25T10:00:00Z",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const updateOptions: PatchOrderOptions = {
      qty: 20,
      time_in_force: "gtc",
    };

    await tradeClient.replaceOrder(updateOptions);

    assert(requestedOptions?.path === ("/v2/orders" as string));
    assert(requestedOptions?.method === "PATCH");
    assertEquals(requestedOptions?.params, updateOptions);

    const orderId = "order_123";
    const nested = true;
    await tradeClient.replaceOrder(orderId, nested);

    assert(requestedOptions?.path === (`/v2/orders/${orderId}` as string));
    assert(requestedOptions?.method === "PATCH");
    assertEquals(requestedOptions?.params, { nested });
  }
);

Deno.test(
  "cancelOrder should send a DELETE request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const orderId = "order_123";
    await tradeClient.cancelOrder(orderId);
    assert(requestedOptions?.path === `/v2/orders/${orderId}`);
    assert(requestedOptions?.method === "DELETE");
  }
);

Deno.test(
  "cancelAllOrders should send a DELETE request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.cancelOrders();
    assert(requestedOptions?.path === "/v2/orders");
    assert(requestedOptions?.method === "DELETE");
  }
);

Deno.test(
  "cancelOrders should send a DELETE request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.cancelOrders();
    assert(requestedOptions?.path === ("/v2/orders" as string));
    assert(requestedOptions?.method === "DELETE");
  }
);

Deno.test(
  "getOrders should send a GET request with the correct path and options",
  async () => {
    let requestedOptions: RequestOptions<Order[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Order[]>;
        const response: Partial<Order>[] = [
          {
            id: "order_123",
            client_order_id: "client_order_123",
            created_at: "2023-05-25T10:00:00Z",
          },
          {
            id: "order_456",
            client_order_id: "client_order_456",
            created_at: "2023-05-25T11:00:00Z",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const getOrdersOptions: GetOrdersOptions = {
      status: "open",
      limit: 10,
    };

    await tradeClient.getOrders(getOrdersOptions);

    assert(requestedOptions?.path === ("/v2/orders" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, getOrdersOptions);
  }
);

Deno.test(
  "getOrder should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Order> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Order>;
        const response: Partial<Order> = {
          id: "order_123",
          client_order_id: "client_order_123",
          created_at: "2023-05-25T10:00:00Z",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const orderId = "order_123";
    await tradeClient.getOrder(orderId);
    assert(requestedOptions?.path === (`/v2/orders/${orderId}` as string));
    assert(
      requestedOptions?.method === "GET" ||
        requestedOptions?.method === undefined
    );
  }
);

Deno.test(
  "getPosition should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Position | Position[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Position | Position[]>;
        const response: Partial<Position> = {
          asset_id: "abc123",
          symbol: "AAPL",
          qty: 100,
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const symbolOrAssetId = "AAPL";
    await tradeClient.getPosition(symbolOrAssetId);
    assert(
      requestedOptions?.path === (`/v2/positions/${symbolOrAssetId}` as string)
    );
    assert(requestedOptions?.method === "GET");
  }
);

Deno.test(
  "getPositions should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Position[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Position[]>;
        const response: Partial<Position>[] = [
          {
            asset_id: "abc123",
            symbol: "AAPL",
            qty: 100,
          },
          {
            asset_id: "def456",
            symbol: "GOOGL",
            qty: 50,
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getPositions();
    assert(requestedOptions?.path === ("/v2/positions" as string));
    assert(requestedOptions?.method === "GET");
  }
);

Deno.test(
  "closePosition should send a DELETE request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<Order[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Order[]>;
        const response: Partial<Order>[] = [
          {
            id: "order_123",
            client_order_id: "client_order_123",
            created_at: "2023-05-25T10:00:00Z",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const params: Pick<
      ClosePositionOptions,
      "symbol_or_asset_id" | "qty" | "percentage"
    > = {
      symbol_or_asset_id: "AAPL",
      qty: 50,
      percentage: 0.5,
    };
    await tradeClient.closePosition(params);
    assert(
      requestedOptions?.path ===
        (`/v2/positions/${params.symbol_or_asset_id}` as string)
    );
    assert(requestedOptions?.method === "DELETE");
    assertEquals(requestedOptions?.params, {
      qty: params.qty,
      percentage: params.percentage,
    });
  }
);

Deno.test(
  "closeAllPositions should send a DELETE request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<PositionClosedResponse> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<PositionClosedResponse>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const params: Pick<ClosePositionOptions, "cancel_orders"> = {
      cancel_orders: true,
    };
    await tradeClient.closeAllPositions(params);
    assert(requestedOptions?.path === ("/v2/positions" as string));
    assert(requestedOptions?.method === "DELETE");
    assertEquals(requestedOptions?.params, {
      cancel_orders: params.cancel_orders,
    });
  }
);

Deno.test(
  "exercisePosition should send a POST request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const symbolOrContractId = "option_abc123";
    await tradeClient.exercisePosition(symbolOrContractId);
    assert(
      requestedOptions?.path ===
        (`/v2/positions/${symbolOrContractId}/exercise` as string)
    );
    assert(requestedOptions?.method === "POST");
  }
);

Deno.test(
  "getPortfolioHistory should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<PortfolioHistoryResponse> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<PortfolioHistoryResponse>;
        const response: Partial<PortfolioHistoryResponse> = {
          timestamp: [1621915200, 1621915260],
          equity: [10000, 10500],
          profit_loss: [0, 500],
          profit_loss_pct: [0, 0.05],
          base_value: 10000,
          timeframe: "1Min",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getPortfolioHistory();
    assert(
      requestedOptions?.path === ("/v2/account/portfolio/history" as string)
    );
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, undefined);

    const params: PortfolioHistoryParams = {
      period: "1M",
      timeframe: "1D",
      end: "2023-05-25",
    };
    await tradeClient.getPortfolioHistory(params);
    assert(
      requestedOptions?.path === ("/v2/account/portfolio/history" as string)
    );
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, params);
  }
);

Deno.test(
  "getWatchlist should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Watchlist> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Watchlist>;
        const response: Watchlist = {
          id: "watchlist_123",
          name: "My Watchlist",
          account_id: "account_123",
          created_at: "2023-05-25T10:00:00Z",
          updated_at: "2023-05-25T10:00:00Z",
          assets: [
            {
              id: "asset_123",
              class: "us_equity",
              exchange: "NYSE",
              symbol: "AAPL",
              name: "Apple Inc.",
              status: "active",
              tradable: true,
              marginable: true,
              shortable: true,
              easy_to_borrow: true,
            },
          ] as Asset[],
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const watchlistId = "watchlist_123";
    await tradeClient.getWatchlist(watchlistId);
    assert(
      requestedOptions?.path === (`/v2/watchlists/${watchlistId}` as string)
    );
    assert(
      requestedOptions?.method === "GET" ||
        requestedOptions?.method === undefined
    );
  }
);

Deno.test(
  "getWatchlists should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Watchlist[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Watchlist[]>;
        const response: Watchlist[] = [
          {
            id: "watchlist_123",
            name: "My Watchlist",
            account_id: "account_123",
            created_at: "2023-05-25T10:00:00Z",
            updated_at: "2023-05-25T10:00:00Z",
            assets: [
              {
                id: "asset_123",
                class: "us_equity",
                exchange: "NYSE",
                symbol: "AAPL",
                name: "Apple Inc.",
                status: "active",
                tradable: true,
                marginable: true,
                shortable: true,
                easy_to_borrow: true,
              },
            ] as Asset[],
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getWatchlists();
    assert(requestedOptions?.path === ("/v2/watchlists" as string));
    assert(
      requestedOptions?.method === "GET" ||
        requestedOptions?.method === undefined
    );
  }
);

Deno.test(
  "createWatchlist should send a POST request with the correct path and data",
  async () => {
    let requestedOptions: RequestOptions<Watchlist> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Watchlist>;
        const response: Watchlist = {
          id: "watchlist_123",
          name: "My Watchlist",
          account_id: "account_123",
          created_at: "2023-05-25T10:00:00Z",
          updated_at: "2023-05-25T10:00:00Z",
          assets: [
            {
              id: "asset_123",
              class: "us_equity",
              exchange: "NYSE",
              symbol: "AAPL",
              name: "Apple Inc.",
              status: "active",
              tradable: true,
              marginable: true,
              shortable: true,
              easy_to_borrow: true,
            },
          ] as Asset[],
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const params: CreateWatchlistParams = {
      name: "My Watchlist",
      symbols: ["AAPL", "GOOGL"],
    };
    await tradeClient.createWatchlist(params);
    assert(requestedOptions?.path === ("/v2/watchlists" as string));
    assert(requestedOptions?.method === "POST");
    assertEquals(requestedOptions?.data, {
      name: params.name,
      symbols: params.symbols,
    });
  }
);

Deno.test(
  "updateWatchlist should send a PUT request with the correct path and data",
  async () => {
    let requestedOptions: RequestOptions<Watchlist> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Watchlist>;
        const response: Watchlist = {
          id: "watchlist_123",
          name: "Updated Watchlist",
          account_id: "account_123",
          created_at: "2023-05-25T10:00:00Z",
          updated_at: "2023-05-25T11:00:00Z",
          assets: [
            {
              id: "asset_123",
              class: "us_equity",
              exchange: "NYSE",
              symbol: "AAPL",
              name: "Apple Inc.",
              status: "active",
              tradable: true,
              marginable: true,
              shortable: true,
              easy_to_borrow: true,
            },
            {
              id: "asset_456",
              class: "us_equity",
              exchange: "NASDAQ",
              symbol: "GOOGL",
              name: "Alphabet Inc.",
              status: "active",
              tradable: true,
              marginable: true,
              shortable: true,
              easy_to_borrow: true,
            },
          ] as Asset[],
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const params = {
      watchlist_id: "watchlist_123",
      name: "Updated Watchlist",
      symbols: ["AAPL", "GOOGL"],
    };
    await tradeClient.updateWatchlist(params);
    assert(
      requestedOptions?.path ===
        (`/v2/watchlists/${params.watchlist_id}` as string)
    );
    assert(requestedOptions?.method === "PUT");
    assertEquals(requestedOptions?.data, {
      name: params.name,
      symbols: params.symbols,
    });
  }
);

Deno.test(
  "deleteWatchlist should send a DELETE request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const params = {
      watchlist_id: "watchlist_123",
    };
    await tradeClient.deleteWatchlist(params);
    assert(
      requestedOptions?.path ===
        (`/v2/watchlists/${params.watchlist_id}` as string)
    );
    assert(requestedOptions?.method === "DELETE");
  }
);

Deno.test(
  "getAccountConfigurations should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<AccountConfigurations> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<AccountConfigurations>;
        const response: Partial<AccountConfigurations> = {
          dtbpCheck: "entry",
          noShorting: false,
          suspendTrade: false,
          tradeConfirmEmail: "all",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getAccountConfigurations();
    assert(requestedOptions?.path === ("/v2/account/configurations" as string));
    assert(
      requestedOptions?.method === "GET" ||
        requestedOptions?.method === undefined
    );
  }
);

Deno.test(
  "updateAccountConfigurations should send a PATCH request with the correct path and data",
  async () => {
    let requestedOptions: RequestOptions<void> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<void>;
        return mockFetch(null)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const updatedConfig: UpdatedAccountConfigurations = {
      dtbp_check: "both",
      trade_confirm_email: "none",
    };
    await tradeClient.updateAccountConfigurations(updatedConfig);
    assert(requestedOptions?.path === ("/v2/account/configurations" as string));
    assert(requestedOptions?.method === "PATCH");
    assertEquals(requestedOptions?.data, updatedConfig);
  }
);

Deno.test(
  "getActivities should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<AccountActivity[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<AccountActivity[]>;
        const response: AccountActivity[] = [
          {
            id: "activity_123",
            activity_type: "FILL",
            transaction_time: "2023-05-25T10:00:00Z",
            type: "fill",
            price: "100.00",
            qty: "10",
            side: "buy",
            symbol: "AAPL",
            leaves_qty: "0",
            order_id: "order_123",
            cum_qty: "10",
            order_status: "filled",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getActivities();
    assert(requestedOptions?.path === ("/v2/account/activities" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {});

    await tradeClient.getActivities("FILL");
    assert(
      requestedOptions?.path === ("/v2/account/activities/FILL" as string)
    );
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {});

    const options: GetActivitiesOptions = {
      date: "2023-05-25",
      pageSize: 10,
      pageToken: "token123",
      category: "FILL",
    };
    await tradeClient.getActivities(undefined, options);
    assert(requestedOptions?.path === ("/v2/account/activities" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {
      date: options.date,
      page_size: options.pageSize,
      page_token: options.pageToken,
      category: options.category,
    });
  }
);

Deno.test(
  "getCalendar should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<MarketCalendar[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<MarketCalendar[]>;
        const response: MarketCalendar[] = [
          {
            date: "2023-05-25",
            open: "09:30",
            close: "16:00",
            settlement_date: "2023-05-25",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getCalendar();
    assert(requestedOptions?.path === ("/v2/calendar" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {});

    const options: {
      start?: string;
      end?: string;
      dateType?: "TRADING" | "SETTLEMENT";
    } = {
      start: "2023-05-01",
      end: "2023-05-31",
      dateType: "TRADING",
    };
    await tradeClient.getCalendar(options);
    assert(requestedOptions?.path === ("/v2/calendar" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {
      start: options.start,
      end: options.end,
      date_type: options.dateType,
    });
  }
);

Deno.test(
  "getClock should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<MarketClock> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<MarketClock>;
        const response: MarketClock = {
          timestamp: "2023-05-25T10:00:00Z",
          is_open: true,
          next_open: "2023-05-26T09:30:00Z",
          next_close: "2023-05-26T16:00:00Z",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getClock();
    assert(requestedOptions?.path === ("/v2/clock" as string));
    assert(requestedOptions?.method === "GET");
  }
);

Deno.test(
  "getAsset should send a GET request with the correct path",
  async () => {
    let requestedOptions: RequestOptions<Asset> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Asset>;
        const response: Partial<Asset> = {
          id: "asset_123",
          class: "us_equity",
          exchange: "NYSE",
          symbol: "AAPL",
          name: "Apple Inc.",
          status: "active",
          tradable: true,
          marginable: true,
          shortable: true,
          easy_to_borrow: true,
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const symbolOrAssetId = "AAPL";
    await tradeClient.getAsset(symbolOrAssetId);
    assert(
      requestedOptions?.path === (`/v2/assets/${symbolOrAssetId}` as string)
    );
    assert(requestedOptions?.method === "GET");
  }
);

Deno.test(
  "getAssets should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<Asset[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<Asset[]>;
        const response: Partial<Asset>[] = [
          {
            id: "asset_123",
            class: "us_equity",
            exchange: "NYSE",
            symbol: "AAPL",
            name: "Apple Inc.",
            status: "active",
            tradable: true,
            marginable: true,
            shortable: true,
            easy_to_borrow: true,
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    await tradeClient.getAssets();
    assert(requestedOptions?.path === ("/v2/assets" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {});

    const options = {
      status: "active",
      asset_class: "us_equity",
      exchange: "NYSE",
      attributes: ["easy_to_borrow"],
    };
    await tradeClient.getAssets(options);
    assert(requestedOptions?.path === ("/v2/assets" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, {
      status: options.status,
      asset_class: options.asset_class,
      exchange: options.exchange,
      attributes: options.attributes?.join(","),
    });
  }
);

Deno.test(
  "getOptionsContracts should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<OptionContract[]> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<OptionContract[]>;
        const response: Partial<OptionContract>[] = [
          {
            id: "option_contract_123",
            underlying_symbol: "AAPL",
            expiration_date: "2023-06-30",
            strike_price: "150.0",
            type: "call",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const queryParams: OptionContractsQueryParams = {
      underlying_symbols: "AAPL",
      expiration_date: "2023-06-30",
      type: "call",
    };
    await tradeClient.getOptionsContracts(queryParams);
    assert(requestedOptions?.path === ("/v2/options/contracts" as string));
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, queryParams);
  }
);

Deno.test(
  "getOptionsContract should send a GET request with the correct path and params",
  async () => {
    let requestedOptions: RequestOptions<OptionContract> | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<OptionContract>;
        const response: Partial<OptionContract> = {
          id: "option_contract_123",
          underlying_symbol: "AAPL",
          expiration_date: "2023-06-30",
          strike_price: "150.0",
          type: "call",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const symbolOrId = "option_contract_123";
    const queryParams: OptionContractsQueryParams = {
      underlying_symbols: "AAPL",
      expiration_date: "2023-06-30",
      type: "call",
    };
    await tradeClient.getOptionsContract(symbolOrId, queryParams);
    assert(
      requestedOptions?.path ===
        (`/v2/options/contracts/${symbolOrId}` as string)
    );
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, queryParams);
  }
);

Deno.test(
  "getCorporateActionAnnouncement should send a GET request with the correct path",
  async () => {
    let requestedOptions:
      | RequestOptions<CorporateActionAnnouncement>
      | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions =
          options as RequestOptions<CorporateActionAnnouncement>;
        const response: Partial<CorporateActionAnnouncement> = {
          id: "announcement_123",
          target_symbol: "AAPL",
          declaration_date: "2023-05-25",
        };
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const announcementId = "announcement_123";
    await tradeClient.getCorporateActionAnnouncement(announcementId);
    assert(
      requestedOptions?.path ===
        (`/v2/corporate_actions/announcements/${announcementId}` as string)
    );
    assert(requestedOptions?.method === "GET");
  }
);

Deno.test(
  "getCorporateActionAnnouncements should send a GET request with the correct path and params",
  async () => {
    let requestedOptions:
      | RequestOptions<CorporateActionAnnouncement[]>
      | undefined;

    const mockContext: ClientContext = {
      options: {
        keyId: "test_key",
        secretKey: "test_secret",
        baseURL: "https://paper-api.alpaca.markets",
      },
      request: async <T>(options: RequestOptions<T>): Promise<T> => {
        requestedOptions = options as RequestOptions<
          CorporateActionAnnouncement[]
        >;
        const response: Partial<CorporateActionAnnouncement>[] = [
          {
            id: "announcement_123",
            target_symbol: "AAPL",
            declaration_date: "2023-05-25",
          },
        ];
        return mockFetch(response)("") as Promise<T>;
      },
    };

    const tradeClient = trade(mockContext);

    const queryParams: AnnouncementsQueryParams = {
      symbol: "AAPL",
      since: "2023-05-25",
    };
    await tradeClient.getCorporateActionAnnouncements(queryParams);
    assert(
      requestedOptions?.path ===
        ("/v2/corporate_actions/announcements" as string)
    );
    assert(requestedOptions?.method === "GET");
    assertEquals(requestedOptions?.params, queryParams);
  }
);
