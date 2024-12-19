import { defineStore } from "pinia";
import { ref } from "vue";
import { apiClient } from "../helpers/api_client";
import { BaseResponse } from "../models/BaseResponse";
import { CreatePortfolioItem } from "../models/CreatePortfolioItem";
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

  const addPortfolioItem = async (createPortfolioItem: CreatePortfolioItem) => {
    try {
      const response = await apiClient.post<BaseResponse>(
        "/portfolios/add",
        createPortfolioItem,
        {
          headers: {
            Authorization: `Bearer ${sessionStore.tokens?.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        await getUserPortfolio();
        return {
          success: true,
          message: "Portfolio item added successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to add portfolio item",
      };
    }
  };

  return {
    portfolio,
    getUserPortfolio,
    addPortfolioItem,
  };
});
