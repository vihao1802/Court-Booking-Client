import { UnauthorizedError } from "@/api/http-errors";
import { reservationApi } from "@/api/reservation";
import { QueryKeys } from "@/constants/query-keys";
import { UpdateReservationRequest } from "@/models/reservation";
import useSWR, { SWRConfiguration } from "swr";

export interface UseGetReservationByIdProps {
  reservationId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useGetReservationById({
  reservationId,
  options,
  enabled = true,
}: UseGetReservationByIdProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_RESERVATION, reservationId] : null,
    () => reservationApi.getReservationById(reservationId),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {swrResponse};
}
