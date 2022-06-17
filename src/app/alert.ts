export interface Alert {
  id: number;
  value: number;
  currency: string;
  asset_name: string;
  asset_type: string;
}

export interface AlertCreate {
  value: number;
  currency: string;
  asset_name: string;
}
