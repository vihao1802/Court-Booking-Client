import { authApi } from "@/api/auth";
import { UnauthorizedError } from "@/api/http-errors";
import { QueryKeys } from "@/constants/query-keys";
import { LoginRequest } from "@/models/auth";
import { User, UserRequest } from "@/models/user";
import useSWR, { SWRConfiguration } from "swr";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function useAuthenticatedUser(options?: Partial<SWRConfiguration>) {
  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    QueryKeys.GET_AUTHENTICATED,
    async () => {
      try {
        if (
          cookies.get("token") === null ||
          cookies.get("token") === undefined
        ) {
          return null;
        }
        return await authApi.getAuthenticatedUser();
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return null;
        } else {
          throw error;
        }
      }
    },
    {
      // initialData: getAuthenticatedUser(),
      ...options,
    }
  );

  const firstLoading = user === undefined && error === undefined;

  async function login(payload: LoginRequest) {
    const res = await authApi.login(payload);
    let decoded = null;

    await mutate();
    if (res) {
      decoded = jwtDecode<{ scope: string }>(res.data.token);
    }
    return { ...res, scope: decoded?.scope };
  }

  async function logout() {
    const token = cookies.get("token");
    if (token) {
      await authApi.logout(token);
    }
    mutate(null, false);
    cookies.remove("token");
  }

  async function register(payload: UserRequest) {
    const res = await authApi.register(payload);
    return res;
  }

  return {
    user,
    firstLoading,
    error,
    mutate,
    login,
    logout,
    register,
  };
}
