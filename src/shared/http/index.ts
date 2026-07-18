import axios from "axios";

const baseURL = "http://localhost:5000/api";

export const $host = axios.create({ baseURL });
export const $authHost = axios.create({ baseURL });

$authHost.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});
