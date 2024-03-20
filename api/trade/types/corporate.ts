export interface CorporateActionAnnouncement {
  id: string;
  corporate_actions_id: string;
  ca_type: string;
  ca_sub_type: string;
  initiating_symbol: string;
  initiating_original_cusip: string;
  target_symbol: string;
  target_original_cusip: string;
  declaration_date: string;
  expiration_date: string;
  record_date: string;
  payable_date: string;
  cash: string;
  old_rate: string;
  new_rate: string;
}

export interface AnnouncementsQueryParams {
  ca_types?: string;
  since?: string;
  until?: string;
  symbol?: string;
  cusip?: string;
  date_type?: string;
}
