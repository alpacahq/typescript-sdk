export interface OptionContractsQueryParams {
  underlying_symbols?: string;
  status?: string;
  active?: boolean;
  expiration_date?: string;
  expiration_date_gte?: string;
  expiration_date_lte?: string;
  root_symbol?: string;
  type?: string;
  style?: string;
  strike_price_gte?: number;
  strike_price_lte?: number;
  page_token?: string;
  limit?: number;
}

export interface OptionContract {
  id: string;
  symbol: string;
  name: string;
  status: string;
  tradable: boolean;
  expiration_date: string;
  root_symbol?: string;
  underlying_symbol: string;
  underlying_asset_id: string;
  type: string;
  style: string;
  strike_price: string;
  size: string;
  open_interest?: string;
  open_interest_date?: string;
  close_price?: string;
  close_price_date?: string;
  next_page_token: string | null;
}
