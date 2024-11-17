import { authApi } from "@/api/auth";
import { UnauthorizedError } from "@/api/http-errors";
import { LoginRequest } from "@/models/auth";
import { User } from "@/models/user";
import useSWR, { SWRConfiguration } from "swr";


function getAuthenticatedUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "");
  } catch (error) {
    return null;
  }
}

export function useAuthenticatedUser(options?: Partial<SWRConfiguration>) {
  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR(
    "authenticated_user",
    async () => {
      try {
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
      initialData: getAuthenticatedUser(),
      ...options,
      revalidateOnFocus: false,
    }
  );

  /*   async function login(payload: LoginRequest) {
    await authApi.login(payload);
    await mutate();
  }
 */
  async function logout(token: string) {
    await authApi.logout(token);
    mutate(null, false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    user,
    isLoading,
    error,
    mutate,
    logout,
  };
}
