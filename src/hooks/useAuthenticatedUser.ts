import { authApi } from "@/api/auth";
import { UnauthorizedError } from "@/api/http-errors";
import { LoginRequest } from "@/models/auth";
import { User } from "@/models/user";
import useSWR, { SWRConfiguration } from "swr";

export function useAuthenticatedUser(options?: Partial<SWRConfiguration>) {
  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "authenticated_user",
    async () => {
      try {
        if (localStorage.getItem("token") === null) {
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
      // revalidateOnFocus: false,
    }
  );

  const firstLoading = user === undefined && error === undefined;

  async function login(payload: LoginRequest) {
    const res = await authApi.login(payload);
    await mutate();
    return res;
  }

  async function logout() {
    const token = localStorage.getItem("token");
    if (token) {
      await authApi.logout(token);
    }
    mutate(null, false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    user,
    firstLoading,
    error,
    mutate,
    login,
    logout,
  };
}