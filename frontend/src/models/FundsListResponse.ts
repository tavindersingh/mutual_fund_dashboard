import { Fund } from "./Fund";
import { Meta } from "./Meta";

export interface FundsListResponse {
  success: boolean;
  funds: Fund[];
  meta: Meta;
}
