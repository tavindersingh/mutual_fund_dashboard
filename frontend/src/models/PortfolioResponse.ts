import { PortfolioItem } from "./PortfolioItem";

export interface PortfolioResponse {
  success: boolean;
  message: string;
  portfolio: PortfolioItem[];
}
