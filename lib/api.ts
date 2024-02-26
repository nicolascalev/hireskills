import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "/",
});

export default api;

export const fetcherWithConfig = ([url, config]: [
  string,
  AxiosRequestConfig
]) => api.get(url, config).then((res) => res.data);

export const basicFetcher = (url:string) => api.get(url).then(res => res.data);
