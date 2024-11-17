import { Error } from "@/types/interfaces";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    if (token && config.url !== "/auth/login") {
      config.headers.Authorization = `Bearer ${token.replace(/^"|"$/g, "")}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: Error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      console.error("Status Code:", error.response.status);

      if (error.response.status === 401) {
        console.error("Unauthorized request - redirecting to login");
        toast.error("Vui lòng đăng nhập để tiếp tục");
        window.location.href = "/sign-in";
      } else if (error.response.status === 404) {
        console.error("Resource not found");
        window.location.href = "/";
      } else if (error.response.status >= 500) {
        console.error("Server error, please try again later");
      }
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
