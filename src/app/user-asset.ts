export interface UserAsset {
  assetId: number;
  name: string;
  amount: number;
  currencyPreferenceAmount: number;
}

export interface UserAssetCreate {
  userId: number,
  assetId: number,
  amount: number
}
