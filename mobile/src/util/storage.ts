import AsyncStorage from "@react-native-async-storage/async-storage";

const tokenKey = "authData";

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_int: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const saveAuthData = async (obj: LoginResponse) => {
  await AsyncStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = async () => {
  const authData = await AsyncStorage.getItem(tokenKey);
  return authData ? (JSON.parse(authData) as LoginResponse) : null;
};

export const removeAuthData = async () => {
  await AsyncStorage.removeItem(tokenKey);
};
