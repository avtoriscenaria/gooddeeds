import { LSItems } from "src/constants";
import { api, HOST } from "src/constants/api";
import { LSGetter } from "./index";

interface IApi {
  method: string;
  url: string;
}

const __fetch = async (
  { method, url }: IApi,
  body: { [key: string]: any } = {},
  refreshToken?: string
) => {
  const access_token = LSGetter(LSItems.ACCESS_KEY);
  const res = await fetch(`${HOST}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken || access_token}`,
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());

  return res;
};

export const _fetch = async (
  apiInfo: IApi,
  body: { [key: string]: any } = {}
) => {
  const res = await __fetch(apiInfo, body);
  if (res.statusCode === 403) {
    const refreshToken = LSGetter(LSItems.REFRESH_KEY);
    let refreshRes = await __fetch(api.auth.refreshToken, {}, refreshToken);
    if (refreshRes.ok && refreshRes.data) {
      const { refresh_token, access_token } = refreshRes.data;
      localStorage.setItem(LSItems.ACCESS_KEY, access_token);
      localStorage.setItem(LSItems.REFRESH_KEY, refresh_token);
      return __fetch(apiInfo, body);
    }
    return refreshRes;
  }
  return res;
};
