import { reservationApi } from "@/api/reservation";
import { userApi } from "@/api/user";
import { QueryKeys } from "@/constants/query-keys";
import { UpdateReservationRequest } from "@/models/reservation";
import { UpdateUserRequest } from "@/models/user";
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
    await userApi.updateProfileImage(payload);
    swrResponse.mutate();
    return;
  }
  return { ...swrResponse, updateUser,updateProfileImage };
}
