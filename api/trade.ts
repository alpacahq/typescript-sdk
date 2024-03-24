import {
  Account,
  AccountActivity,
  AccountConfigurations,
  AddAssetToWatchlistParams,
  AnnouncementsQueryParams,
  Asset,
  ClosePositionOptions,
  CorporateActionAnnouncement,
  CreateOrderOptions,
  CreateWatchlistParams,
  CryptoFundingTransfer,
  CryptoFundingWallet,
  DeleteSymbolFromWatchlistParams,
  DeleteWatchlistByNameParams,
  GetWatchlistByNameParams,
  MarketCalendar,
  MarketClock,
  OptionContract,
  OptionContractsQueryParams,
  Order,
  PatchOrderOptions,
  PortfolioHistoryParams,
  PortfolioHistoryResponse,
  Position,
  TransactionFeeResponse,
  TransactionParams,
  UpdateWatchlistByNameParams,
  UpdateWatchlistParams,
  UpdatedAccountConfigurations,
  Watchlist,
  WhitelistedAddress,
  WhitelistedAddressParams,
  WithdrawalParams,
} from "../types/trade.ts";

import { ClientContext } from "../factory/createClient.ts";

export default ({ request }: ClientContext) => ({
  v2: {
    account: {
      get: () =>
        request<Account>({
          path: "/v2/account",
        }),
    },
    orders: {
      post: (options: CreateOrderOptions) =>
        request<Order>({
          path: "/v2/orders",
          method: "POST",
          data: options,
        }),
      get: (options?: PatchOrderOptions | string, nested?: boolean) => {
        let path = "/v2/orders";
        let params = {};

        if (typeof options === "string") {
          path += `/${options}`;

          if (nested !== undefined) {
            params = { nested };
          }
        } else if (typeof options === "object") {
          params = options;
        }

        return request<Order | Order[]>({
          path,
          method: "GET",
          params,
        });
      },
      delete: (orderId?: string) => {
        let path = "/v2/orders";

        if (orderId) {
          path += `/${orderId}`;
        }

        return request<{ id?: string; status?: string }[] | void>({
          path,
          method: "DELETE",
        });
      },
      patch: (orderId: string, options: PatchOrderOptions) =>
        request<Order>({
          path: `/v2/orders/${orderId}`,
          method: "PATCH",
          data: options,
        }),
    },
    positions: {
      get: (symbol_or_asset_id?: string) =>
        request<Position | Position[]>({
          path: symbol_or_asset_id
            ? `/v2/positions/${symbol_or_asset_id}`
            : "/v2/positions",
          method: "GET",
        }),
      delete: (params: ClosePositionOptions) =>
        request<Order[]>({
          path: params.symbol_or_asset_id
            ? `/v2/positions/${params.symbol_or_asset_id}`
            : "/v2/positions",
          method: "DELETE",
          params: params.symbol_or_asset_id
            ? { qty: params.qty, percentage: params.percentage }
            : { cancel_orders: params.cancel_orders },
        }),
      post: (symbol_or_contract_id: string) =>
        request<void>({
          path: `/v2/positions/${symbol_or_contract_id}/exercise`,
          method: "POST",
        }),
    },
    portfolioHistory: {
      get: (params?: PortfolioHistoryParams) =>
        request<PortfolioHistoryResponse>({
          path: "/v2/account/portfolio/history",
          method: "GET",
          params,
        }),
    },
    watchlists: {
      get: (watchlist_id?: string) =>
        request<Watchlist | Watchlist[]>({
          path: watchlist_id
            ? `/v2/watchlists/${watchlist_id}`
            : "/v2/watchlists",
          method: "GET",
        }),
      post: ({ name, symbols }: CreateWatchlistParams) =>
        request<Watchlist>({
          path: "/v2/watchlists",
          method: "POST",
          data: { name, symbols },
        }),
      put: ({
        watchlist_id,
        name,
        symbols,
      }: { watchlist_id: string } & UpdateWatchlistParams) =>
        request<Watchlist>({
          path: `/v2/watchlists/${watchlist_id}`,
          method: "PUT",
          data: { name, symbols },
        }),
      deleteById: ({ watchlist_id }: { watchlist_id: string }) =>
        request<void>({
          path: `/v2/watchlists/${watchlist_id}`,
          method: "DELETE",
        }),
      addAsset: ({
        watchlist_id,
        symbol,
      }: {
        watchlist_id: string;
        symbol: string;
      }) =>
        request<Watchlist>({
          path: `/v2/watchlists/${watchlist_id}`,
          method: "POST",
          data: { symbol },
        }),
      getByName: ({ name }: GetWatchlistByNameParams) =>
        request<Watchlist>({
          path: "/v2/watchlists:by_name",
          method: "GET",
          params: { name },
        }),
      updateByName: ({ name, newName, symbols }: UpdateWatchlistByNameParams) =>
        request<Watchlist>({
          path: "/v2/watchlists:by_name",
          method: "PUT",
          params: { name },
          data: { name: newName, symbols },
        }),
      addAssetByName: ({ name, symbol }: AddAssetToWatchlistParams) =>
        request<void>({
          path: "/v2/watchlists:by_name",
          method: "POST",
          params: { name },
          data: { symbol },
        }),
      deleteByName: ({ name }: DeleteWatchlistByNameParams) =>
        request<void>({
          path: "/v2/watchlists:by_name",
          method: "DELETE",
          params: { name },
        }),
      deleteSymbol: ({
        watchlistId,
        symbol,
      }: DeleteSymbolFromWatchlistParams) =>
        request<Watchlist>({
          path: `/v2/watchlists/${watchlistId}/${symbol}`,
          method: "DELETE",
        }),
    },
    accountConfigurations: {
      get: () =>
        request<AccountConfigurations>({
          path: "/v2/account/configurations",
          method: "GET",
        }),
      patch: (updatedConfig: UpdatedAccountConfigurations) =>
        request<void>({
          path: "/v2/account/configurations",
          method: "PATCH",
          data: updatedConfig,
        }),
    },
    activities: {
      get: (
        activityType?: string,
        options?: {
          date?: string;
          until?: string;
          after?: string;
          direction?: string;
          pageSize?: number;
          pageToken?: string;
          category?: string;
        }
      ) =>
        request<AccountActivity[]>({
          path: `/v2/account/activities${
            activityType ? `/${activityType}` : ""
          }`,
          method: "GET",
          params: {
            date: options?.date,
            until: options?.until,
            after: options?.after,
            direction: options?.direction,
            page_size: options?.pageSize,
            page_token: options?.pageToken,
            category: options?.category,
          },
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
          params: {
            start: options?.start,
            end: options?.end,
            date_type: options?.dateType,
          },
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
      getAll: (options?: {
        status?: string;
        asset_class?: string;
        exchange?: string;
        attributes?: string[];
      }) =>
        request<Asset[]>({
          path: "/v2/assets",
          method: "GET",
          params: {
            status: options?.status,
            asset_class: options?.asset_class,
            exchange: options?.exchange,
            attributes: options?.attributes?.join(","),
          },
        }),
      getAsset: (symbolOrAssetId: string) =>
        request<Asset>({
          path: `/v2/assets/${symbolOrAssetId}`,
          method: "GET",
        }),
    },
    options: {
      get: (queryParams: OptionContractsQueryParams, symbolOrId?: string) => {
        let path = "/v2/options/contracts";
        if (symbolOrId) {
          path += `/${symbolOrId}`;
        }
        return request<OptionContract | OptionContract[]>({
          path,
          method: "GET",
          params: queryParams,
        });
      },
    },
    corporateActions: {
      announcements: {
        get: (
          queryParams?: AnnouncementsQueryParams,
          announcementId?: string
        ) => {
          if (announcementId) {
            return request<CorporateActionAnnouncement>({
              path: `/v2/corporate_actions/announcements/${announcementId}`,
              method: "GET",
            });
          } else {
            return request<CorporateActionAnnouncement[]>({
              path: "/v2/corporate_actions/announcements",
              method: "GET",
              params: queryParams,
            });
          }
        },
      },
    },
    cryptoFunding: {
      getWallets: (asset?: string) =>
        request<CryptoFundingWallet | CryptoFundingWallet[]>({
          path: "/v2/wallets",
          method: "GET",
          params: { asset },
        }),

      requestWithdrawal: (withdrawalParams: WithdrawalParams) =>
        request<CryptoFundingTransfer>({
          path: "/v2/wallets/transfers",
          method: "POST",
          data: withdrawalParams,
        }),
      getTransfers: (transferId?: string) => {
        if (transferId) {
          return request<CryptoFundingTransfer>({
            path: `/v2/wallets/transfers/${transferId}`,
            method: "GET",
          });
        } else {
          return request<CryptoFundingTransfer[]>({
            path: "/v2/wallets/transfers",
            method: "GET",
          });
        }
      },
      getWhitelistedAddresses: () =>
        request<WhitelistedAddress[]>({
          path: "/v2/wallets/whitelists",
          method: "GET",
        }),
      requestWhitelistedAddress: (
        whitelistedAddressParams: WhitelistedAddressParams
      ) =>
        request<WhitelistedAddress>({
          path: "/v2/wallets/whitelists",
          method: "POST",
          data: whitelistedAddressParams,
        }),
      deleteWhitelistedAddress: (whitelistedAddressId: string) =>
        request<void>({
          path: `/v2/wallets/whitelists/${whitelistedAddressId}`,
          method: "DELETE",
        }),
      estimateTransactionFee: (transactionParams: TransactionParams) =>
        request<TransactionFeeResponse>({
          path: "/v2/wallets/fees/estimate",
          method: "GET",
          params: transactionParams,
        }),
    },
  },
});
