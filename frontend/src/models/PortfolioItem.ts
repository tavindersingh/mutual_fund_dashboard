export interface PortfolioItem {
  portfolio_schemeCode: string;
  fund_schemeName: string;
  fundHistory_netAssetValue: number;
  fundHouse_id: number;
  fundHouse_name: string;
  fundSchemeType_id: number;
  fundSchemeType_name: string;
  totalUnits: number;
  totalOriginalPrice: number;
  totalCurrentValue: number;
}
