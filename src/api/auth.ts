import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/models/auth";
import axiosInstance from "./axios-instance";
import { User } from "@/models/user";
import { get } from "http";

const prefix = "/auth";

export const authApi = {
  async login(request: LoginRequest) {
    const res = await axiosInstance.post<LoginResponse>(
      `${prefix}/login`,
      request
    );
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

  async refresh(request: RefreshTokenRequest) {
    console.log("2: refresh: " + request.token);

    const res = await axiosInstance.post<RefreshTokenResponse>(
      `${prefix}/refresh-token`,
      request
    );

    console.log("3: refresh: " + res);

    if (res.status === 400 || res.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/sign-in";
      return;
    }

    localStorage.setItem("token", JSON.stringify(res.data.token));
    return res.data;
  },

  async getAuthenticatedUser() {
    console.log("getAuthenticatedUser");

    if (localStorage.getItem("token") === null) {
      return null;
    }
    const res = await axiosInstance.get<User>("/users/my-info");

    console.log("getAuthenticatedUser: res: " + res);

    if (res.status === 400 || res.status === 401) {
      // getAuthenticatedUser: status 400 or 401, refresh token and try again

      await this.refresh({
        token: localStorage.getItem("token") as string,
      });

      this.getAuthenticatedUser();
    }

    return res.data;
  },
};
