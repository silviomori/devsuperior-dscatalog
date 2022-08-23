import jwtDecode from "jwt-decode";
import { IRole } from "../@types";
import { getAuthData } from "./storage";

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: IRole[];
};

export const getTokenData = async (): Promise<TokenData | undefined> => {
  const authData = await getAuthData();
  return authData ? (jwtDecode(authData.access_token) as TokenData) : undefined;
};
