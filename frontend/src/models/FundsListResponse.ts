import { Fund } from "./Fund";

export interface FundsListResponse {
  success: boolean;
  funds: Fund[];
}
