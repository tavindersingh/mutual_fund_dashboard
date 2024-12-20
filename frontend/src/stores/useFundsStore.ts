import { defineStore } from "pinia";
import { ref } from "vue";
import { apiClient } from "../helpers/api_client";
import { toQueryString } from "../helpers/functions";
import { BaseResponse } from "../models/BaseResponse";
import { Fund } from "../models/Fund";
import { FundsListResponse } from "../models/FundsListResponse";
import { Meta } from "../models/Meta";
import { QueryFund } from "../models/QueryFund";
import { FundHouse } from "../models/FundHouse";
import { FundHousesListResponse } from "../models/FundHousesListResponse";

export const useFundsStore = defineStore("funds", () => {
  const funds = ref<Fund[]>([]);
  const fundHousesList = ref<FundHouse[]>([]);
  const meta = ref<Meta>({
    pageSize: 10,
    page: 1,
  });

  const fetchFundsList = async (
    queryFund: Partial<QueryFund>
  ): Promise<BaseResponse> => {
    try {
      const query = toQueryString(queryFund);

      const response = await apiClient.get<FundsListResponse>(
        `/funds?${query}`
      );
      funds.value = response.data.funds;
      meta.value = response.data.meta;

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

  const fetchFundHouseList = async (): Promise<BaseResponse> => {
    try {
      const response = await apiClient.get<FundHousesListResponse>(
        `/fund-houses`
      );

      fundHousesList.value = response.data.fundHousesList;

      return {
        success: true,
        message: "Fund house list fetched successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch fund house list",
      };
    }
  };

  return {
    funds,
    meta,
    fundHousesList,
    fetchFundsList,
    fetchFundHouseList,
  };
});
