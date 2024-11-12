import axios from "axios";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  TooManyRequestsError,
} from "./http-errors";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.url !== "/login" && config.url !== "/logout") {
      config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, "")}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;

      switch (error.response?.status) {
        case 400:
          throw new BadRequestError(errorMessage);
        case 401:
          throw new UnauthorizedError(errorMessage);
        case 404:
          throw new NotFoundError(errorMessage);
        case 409:
          throw new ConflictError(errorMessage);
        case 429:
          throw new TooManyRequestsError(errorMessage);
        default:
          throw error;
      }
    }

    return Promise.reject(error);
  },
  { synchronous: true }
);

export default axiosInstance;
