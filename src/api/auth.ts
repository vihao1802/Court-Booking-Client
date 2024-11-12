import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
} from "@/models/auth";
import axiosInstance from "./axios-instance";
import Cookies from "js-cookie";
import { User } from "@/models/user";

const prefix = "/auth";

export const authApi = {
  async login(request: LoginRequest) {
    const res = await axiosInstance.post(`${prefix}/login`, request);

    /* if (res.data.token) {
      Cookies.set("authToken", res.data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } */

    localStorage.setItem("token", JSON.stringify(res.data.token));
    return res;
  },

  logout(request: LogoutRequest) {
    return axiosInstance.post(`${prefix}/logout`, request);
  },

  refresh(request: RefreshTokenRequest) {
    return axiosInstance.post(`${prefix}/refresh-token`, request);
  },
  async getAuthenticatedUser() {
    const res = await axiosInstance.get<User>("/users/my-info");
    console.log(res);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  },
};
