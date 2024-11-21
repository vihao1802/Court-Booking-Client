import { reservationApi } from "@/api/reservation";
import { userApi } from "@/api/user";
import { QueryKeys } from "@/constants/query-keys";
import { UpdateReservationRequest } from "@/models/reservation";
import { UpdatePasswordRequest, UpdateUserRequest } from "@/models/user";
import useSWR, { SWRConfiguration } from "swr";

export function useUpdateUser() {
  const swrResponse = useSWR([QueryKeys.GET_AUTHENTICATED], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function updateUser(
    payload: UpdateUserRequest
  ) {
    await userApi.updateUser(payload);
    swrResponse.mutate({ revalidate: true });
    return;
  }

  async function updateProfileImage(
    payload: FormData
  ) {
    const res = await userApi.updateProfileImage(payload);
    swrResponse.mutate();
    return res;
  }

  async function updatePassword(
    payload: UpdatePasswordRequest
  ) {
    const res = await userApi.updatePassword(payload);
    swrResponse.mutate();
    return res;
  }
  return { ...swrResponse, updateUser,updateProfileImage,updatePassword };
}