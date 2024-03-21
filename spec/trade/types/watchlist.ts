export interface CreateWatchlistParams {
  name: string;
  symbols: string[] | null;
}

export interface AddAssetToWatchlistParams {
  name: string;
  symbol: string;
}

export interface DeleteSymbolFromWatchlistParams {
  watchlistId: string;
  symbol: string;
}

export interface DeleteWatchlistByNameParams {
  name: string;
}

export interface GetWatchlistByNameParams {
  name: string;
}

export interface UpdateWatchlistParams {
  name: string;
  symbols: string[] | null;
}

export interface UpdateWatchlistByNameParams {
  name: string;
  newName: string;
  symbols: string[] | null;
}

export interface Asset {
  id: string;
  class: string;
  exchange: string;
  symbol: string;
  name: string;
  status: string;
  tradable: boolean;
  marginable: boolean;
  shortable: boolean;
  easy_to_borrow: boolean;
  fractionable: boolean;
  maintenance_margin_requirement?: string;
  attributes?: string[];
}

export interface Watchlist {
  id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  assets: Asset[];
}
