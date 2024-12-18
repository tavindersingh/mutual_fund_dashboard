import { AxiosError } from "axios";
import { ref } from "vue";
import { apiClient } from "../helpers/api_client";
import { Tokens } from "../models/Tokens";
import { TokenResponse } from "../models/TokensResponse";
import { BaseResponse } from "../models/BaseResponse";

export const useAuth = () => {
  const isLoggedIn = ref(false);
  const tokens = ref<Tokens | undefined>(undefined);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<TokenResponse>("/auth/login", {
        email,
        password,
      });

      isLoggedIn.value = true;
      tokens.value = response.data.tokens;

      return response.data;
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return error.response?.data;
      }

      return {
        success: false,
        message: "An error occurred while logging in.",
      };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<BaseResponse>("/auth/signup", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error(error);

      if (error instanceof AxiosError) {
        return error.response?.data;
      }

      return {
        success: false,
        message: "An error occurred while logging in.",
      };
    }
  };

  return {
    isLoggedIn,
    tokens,
    login,
    signup,
  };
};
