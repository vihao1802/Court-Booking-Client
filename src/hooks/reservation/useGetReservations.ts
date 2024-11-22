import { reservationApi } from "@/api/reservation";
import { QueryKeys } from "@/constants/query-keys";
import { ReservationPagination } from "@/models/api";
import useSWR, { SWRConfiguration } from "swr";

export interface UseGetReservations {
  params: ReservationPagination;
  options?: SWRConfiguration;
  enable?: boolean;
}

export function useGetReservations({
  params,
  options,
  enable = true,
}: UseGetReservations) {
  const swrResponse = useSWR(
    enable ? [QueryKeys.GET_RESERVATION, params] : null,
    () => reservationApi.getReservations(params),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );

  return swrResponse;
}