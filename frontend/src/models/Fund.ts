import { FundHouse } from "./FundHouse";
import { FundSchemeType } from "./FundSchemeType";

export interface Fund {
  schemeCode: string;
  schemeName: string;
  fundHouse: FundHouse;
  fundSchemeType: FundSchemeType;
}
