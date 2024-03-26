import {
  Account,
  AccountActivity,
  AccountConfigurations,
  Asset,
  CancelOrdersOptions,
  ClosePositionOptions,
  CorporateActionAnnouncement,
  CreateOrderOptions,
  CreateWatchlistParams,
  CryptoFundingTransfer,
  CryptoFundingWallet,
  DeleteWatchlistOptions,
  ExerciseOptions,
  GetActivitiesOptions,
  GetOrdersOptions,
  GetOrdersReturn,
  GetPositionsOptions,
  GetPositionsResponse,
  GetWatchlistOptions,
  MarketCalendar,
  MarketClock,
  OptionContract,
  OptionContractsQueryParams,
  Order,
  PortfolioHistoryParams,
  PortfolioHistoryResponse,
  ReplaceOrderOptions,
  TransactionFeeResponse,
  TransactionParams,
  UpdateWatchlistParams,
  UpdatedAccountConfigurations,
  Watchlist,
  WhitelistedAddress,
  WhitelistedAddressParams,
  WithdrawalParams,
} from "./trading.type.ts";

import { ClientContext } from "../factory/createClient.type.ts";

export default ({ request }: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        request<Account>({
          path: "/v2/account",
        }),
      configurations: {
        get: () =>
          request<AccountConfigurations>({
            path: "/v2/account/configurations",
          }),
        patch: (updatedConfig: UpdatedAccountConfigurations) =>
          request<void>({
            path: "/v2/account/configurations",
            method: "PATCH",
            data: updatedConfig,
          }),
      },
      activities: {
        get: (options?: GetActivitiesOptions) =>
          request<AccountActivity[]>({
            path: "/v2/account/activities",
            method: "GET",
            params: options,
          }),
      },
    },
    orders: {
      get: <T extends GetOrdersOptions>(options?: T) =>
        request<GetOrdersReturn<T>>({
          path: options?.order_id
            ? `/v2/orders/${options.order_id}`
            : "/v2/orders",
          method: "GET",
          params: options,
        }),
      post: (options: CreateOrderOptions) =>
        request<Order>({
          path: "/v2/orders",
          method: "POST",
          data: options,
        }),
      patch: ({ order_id, ...options }: ReplaceOrderOptions) =>
        request<Order>({
          path: `/v2/orders/${order_id}`,
          method: "PATCH",
          data: options,
        }),
      delete: (options?: CancelOrdersOptions) =>
        request<void>({
          path: options?.order_id
            ? `/v2/orders/${options.order_id}`
            : "/v2/orders",
          method: "DELETE",
        }),
    },
    positions: {
      get: <T extends GetPositionsOptions>(options?: T) =>
        request<GetPositionsResponse<T>>({
          path:
            options?.symbol || options?.asset_id
              ? `/v2/positions/${options.symbol || options.asset_id}`
              : "/v2/positions",
          method: "GET",
        }),
      delete: <T extends ClosePositionOptions>(params?: T) =>
        request<
          T extends { symbol?: string; asset_id?: string } ? Order : Order[]
        >({
          path:
            params?.symbol || params?.asset_id
              ? `/v2/positions/${params.symbol || params.asset_id}`
              : "/v2/positions",
          method: "DELETE",
          params: {
            qty: params?.qty,
            percentage: params?.percentage,
            cancel_orders: params?.cancel_orders,
          },
        }),
      exercise: {
        post: (options: ExerciseOptions) =>
          request<void>({
            path: `/v2/positions/${
              "symbol" in options ? options.symbol : options.contract_id
            }/exercise`,
            method: "POST",
          }),
      },
    },
    portfolio: {
      history: {
        get: (options?: PortfolioHistoryParams) =>
          request<PortfolioHistoryResponse>({
            path: "/v2/account/portfolio/history",
            method: "GET",
            params: options,
          }),
      },
    },
    watchlists: {
      get: (options?: GetWatchlistOptions) =>
        request<Watchlist>({
          path: options?.watchlist_id
            ? `/v2/watchlists/${options.watchlist_id}`
            : "/v2/watchlists",
        }),
      post: (params: CreateWatchlistParams) =>
        request<Watchlist>({
          path: "/v2/watchlists",
          method: "POST",
          data: params,
        }),
      patch: (params: UpdateWatchlistParams) =>
        request<Watchlist>({
          path: `/v2/watchlists/${params.watchlist_id}`,
          method: "PATCH",
          data: params,
        }),
      delete: (options: DeleteWatchlistOptions) =>
        request<void>({
          path: `/v2/watchlists/${options.watchlist_id}`,
          method: "DELETE",
        }),
    },
    calendar: {
      get: (options?: {
        start?: string;
        end?: string;
        dateType?: "TRADING" | "SETTLEMENT";
      }) =>
        request<MarketCalendar[]>({
          path: "/v2/calendar",
          method: "GET",
          params: Object.fromEntries(
            Object.entries({
              start: options?.start,
              end: options?.end,
              date_type: options?.dateType,
            }).filter(([_, value]) => value !== undefined)
          ),
        }),
    },
    clock: {
      get: () =>
        request<MarketClock>({
          path: "/v2/clock",
          method: "GET",
        }),
    },
    assets: {
      get: (symbolOrAssetId: string) =>
        request<Asset>({
          path: `/v2/assets/${symbolOrAssetId}`,
          method: "GET",
        }),
      // getAssets: (options?: {
      //   status?: string;
      //   asset_class?: string;
      //   exchange?: string;
      //   attributes?: string[];
      // }) =>
      //   request<Asset[]>({
      //     path: "/v2/assets",
      //     method: "GET",
      //     params: Object.fromEntries(
      //       Object.entries({
      //         status: options?.status,
      //         asset_class: options?.asset_class,
      //         exchange: options?.exchange,
      //         attributes: options?.attributes?.join(","),
      //       }).filter(([_, value]) => value !== undefined)
      //     ),
      //   }),
    },
    options: {
      contracts: {
        get: (queryParams: OptionContractsQueryParams) =>
          request<OptionContract[]>({
            path: "/v2/options/contracts",
            method: "GET",
            params: queryParams,
          }),
        // getOptionsContract: (
        //   symbolOrId: string,
        //   queryParams: OptionContractsQueryParams
        // ) =>
        //   request<OptionContract>({
        //     path: `/v2/options/contracts/${symbolOrId}`,
        //     method: "GET",
        //     params: queryParams,
        //   }),
      },
    },
    corporate_actions: {
      announcements: {
        get: (announcementId?: string) =>
          request<CorporateActionAnnouncement>({
            path: `/v2/corporate_actions/announcements/${announcementId}`,
            method: "GET",
          }),
        // getCorporateActionAnnouncements: (
        //   queryParams: AnnouncementsQueryParams
        // ) =>
        //   request<CorporateActionAnnouncement[]>({
        //     path: "/v2/corporate_actions/announcements",
        //     method: "GET",
        //     params: queryParams,
        //   }),
      },
    },
    wallets: {
      get: (asset?: string) =>
        request<CryptoFundingWallet | CryptoFundingWallet[]>({
          path: "/v2/wallets",
          method: "GET",
          params: { asset },
        }),
      whitelists: {
        get: () =>
          request<WhitelistedAddress[]>({
            path: "/v2/wallets/whitelists",
            method: "GET",
          }),
        post: (whitelistedAddressParams: WhitelistedAddressParams) =>
          request<WhitelistedAddress>({
            path: "/v2/wallets/whitelists",
            method: "POST",
            data: whitelistedAddressParams,
          }),
        delete: (whitelistedAddressId: string) =>
          request<void>({
            path: `/v2/wallets/whitelists/${whitelistedAddressId}`,
            method: "DELETE",
          }),
      },
      fees: {
        estimate: {
          get: (transactionParams: TransactionParams) =>
            request<TransactionFeeResponse>({
              path: "/v2/wallets/fees/estimate",
              method: "GET",
              params: transactionParams,
            }),
        },
      },
      transfers: {
        get: () =>
          request<CryptoFundingTransfer[]>({
            path: "/v2/wallets/transfers",
            method: "GET",
          }),
        post: (withdrawalParams: WithdrawalParams) =>
          request<CryptoFundingTransfer>({
            path: "/v2/wallets/transfers",
            method: "POST",
            data: withdrawalParams,
          }),
      },
    },
  },
});
