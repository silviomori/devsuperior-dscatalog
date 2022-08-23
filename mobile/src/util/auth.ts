import { getTokenData } from "./token";

export const isAuthenticated = async (): Promise<boolean> => {
  const tokenData = await getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};
