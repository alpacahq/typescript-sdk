export interface CryptoFundingWallet {
  chain: string;
  address: string;
  created_at: string;
}

export interface WhitelistedAddressParams {
  address: string;
  asset: string;
}
export interface WhitelistedAddress {
  id: string;
  chain: string;
  asset: string;
  address: string;
  status: "ACTIVE" | "PENDING";
  created_at: string; // Timestamp (RFC3339) of account creation
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface WithdrawalParams {
  amount: string;
  address: string;
  asset: string;
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface CryptoFundingQueryParams {
  asset?: string;
}

export interface CryptoFundingResponse {
  wallets?: CryptoFundingWallet | CryptoFundingWallet[];
  transfers?: CryptoFundingTransfer[];
}

export interface CryptoFundingWallet {
  chain: string;
  address: string;
  created_at: string; // Timestamp (RFC3339) of account creation
}

export interface WithdrawalParams {
  amount: string;
  address: string;
  asset: string;
}

export interface CryptoFundingTransfer {
  id: string;
  tx_hash: string;
  direction: "INCOMING" | "OUTGOING";
  status: "PROCESSING" | "FAILED" | "COMPLETE";
  amount: string;
  usd_value: string;
  network_fee: string;
  fees: string;
  chain: string;
  asset: string;
  from_address: string;
  to_address: string;
  created_at: string; // Timestamp (RFC3339) of transfer creation
}

export interface TransactionParams {
  asset: string;
  from_address: string;
  to_address: string;
  amount: string;
}

export interface TransactionFeeResponse {
  fee: string;
}
