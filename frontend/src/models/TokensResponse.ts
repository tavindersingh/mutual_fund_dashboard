import { Tokens } from "./Tokens";

export interface TokenResponse {
  success: boolean;
  message: string;
  tokens: Tokens;
}
