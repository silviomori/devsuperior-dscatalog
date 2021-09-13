const tokenKey = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_int: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const strAuthData = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(strAuthData) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
