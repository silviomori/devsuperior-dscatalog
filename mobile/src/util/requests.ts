import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { ILoginData } from "../@types";
const Buffer = require("buffer").Buffer;

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? "http://10.0.2.2:8080";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "dscatalog";
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "dscatalog123";
const basicHeader = () =>
  "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64");

export const requestBackend = (config: AxiosRequestConfig) => {
  return axios({ ...config, baseURL: BASE_URL });
};

export const requestBackendLogin = (loginData: ILoginData) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: basicHeader(),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: "password",
  });

  return axios({
    method: "POST",
    baseURL: BASE_URL,
    url: "/oauth/token",
    data,
    headers,
  });
};
