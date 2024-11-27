import { reservationApi } from "@/api/reservation";
import { userApi } from "@/api/user";
import { QueryKeys } from "@/constants/query-keys";
import { UpdateReservationRequest } from "@/models/reservation";
import { UpdateUserRequest } from "@/models/update-user";
import { UpdatePasswordRequest } from "@/models/update-password";
import useSWR, { SWRConfiguration } from "swr";

export function useUpdateUser() {
  const swrResponse = useSWR([QueryKeys.GET_AUTHENTICATED], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function updateUser(payload: UpdateUserRequest) {
    const res = await userApi.updateUser(payload);
    swrResponse.mutate({ revalidate: true });
    return res;
  }

  async function updateProfileImage(payload: FormData) {
    const res = await userApi.updateProfileImage(payload);
    swrResponse.mutate();
    return res;
  }

  async function updatePassword(payload: UpdatePasswordRequest) {
    const res = await userApi.updatePassword(payload);
    swrResponse.mutate();
    return res;
  }
  return { ...swrResponse, updateUser, updateProfileImage, updatePassword };
}
