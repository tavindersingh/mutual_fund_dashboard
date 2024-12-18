import { defineStore } from "pinia";
import { ref } from "vue";
import { apiClient } from "../helpers/api_client";
import { BaseResponse } from "../models/BaseResponse";
import { PortfolioItem } from "../models/PortfolioItem";
import { PortfolioResponse } from "../models/PortfolioResponse";
import { useSessionStore } from "./useSessionStore";

export const usePortfolioStore = defineStore("portfolio", () => {
  const portfolio = ref<PortfolioItem[]>();
  const sessionStore = useSessionStore();

  const getUserPortfolio = async (): Promise<BaseResponse> => {
    try {
      const response = await apiClient.get<PortfolioResponse>(
        "/portfolios/user",
        {
          headers: {
            Authorization: `Bearer ${sessionStore.tokens?.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        portfolio.value = response.data.portfolio;
      }

      return {
        success: true,
        message: "Portfolio fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch portfolio",
      };
    }
  };

  return {
    portfolio,
    getUserPortfolio,
  };
});
