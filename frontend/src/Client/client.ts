/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

let storeInstance: any = null;
export const setStoreInstance = (store: any) => {
  storeInstance = store;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (storeInstance) {
      const state = storeInstance.getState();
      const token = state.token?.token || state.token?.access_token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.status === 204) return null;
    return res.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    const data: any = error.response?.data || {};
    let errorMessage = "Api Error";

    if (Array.isArray(data.message)) {
      errorMessage = data.message.join(", "); // 👈 NestJS validation array
    } else if (typeof data.message === "string") {
      errorMessage = data.message;
    } else if (data.error) {
      errorMessage = data.error;
    }

    throw new Error(errorMessage);
  },
);

export const ApiClient = async <T = any>(
  endpoint: string,
  options: any = {},
): Promise<T> => {
  const { params, headers, ...restOptions } = options;
  const config: AxiosRequestConfig = {
    url: endpoint,
    params,
    headers,
    ...restOptions,
  };
  const res = await axiosInstance.request<any, T>(config);

  return res as T;
};
