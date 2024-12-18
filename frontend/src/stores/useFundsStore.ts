import { defineStore } from "pinia";
import { ref } from "vue";
import { Fund } from "../models/Fund";
import { apiClient } from "../helpers/api_client";
import { FundsListResponse } from "../models/FundsListResponse";
import { BaseResponse } from "../models/BaseResponse";

export const useFundsStore = defineStore("funds", () => {
  const funds = ref<Fund[]>([]);

  const fetchFundsList = async (): Promise<BaseResponse> => {
    try {
      const response = await apiClient.get<FundsListResponse>("/funds");
      funds.value = response.data.funds;

      if (response.data.funds.length > 0) {
        return {
          success: true,
          message: "Funds list fetched successfully",
        };
      } else {
        return {
          success: false,
          message: "No funds found",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch funds list",
      };
    }
  };

  return {
    funds,
    fetchFundsList,
  };
});
