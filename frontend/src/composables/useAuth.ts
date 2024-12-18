import { AxiosError } from "axios";
import { apiClient } from "../helpers/api_client";
import { BaseResponse } from "../models/BaseResponse";
import { TokenResponse } from "../models/TokensResponse";

export const useAuth = () => {
  const login = async (
    email: string,
    password: string
  ): Promise<TokenResponse> => {
    try {
      const response = await apiClient.post<TokenResponse>("/auth/login", {
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
    login,
    signup,
  };
};
