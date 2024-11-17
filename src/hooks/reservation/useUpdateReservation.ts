import { reservationApi } from "@/api/reservation";
import { QueryKeys } from "@/constants/query-keys";
import { UpdateReservationRequest } from "@/models/reservation";
import useSWR, { SWRConfiguration } from "swr";

interface UseUpdateReservationProps {
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useUpdateReservation({
  options,
  enabled = true,
}: UseUpdateReservationProps) {
  const swrResponse = useSWR(enabled ? [QueryKeys.GET_RESERVATION] : null, {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
    ...options,
  });

  async function updateReservation(
    id: string,
    payload: UpdateReservationRequest
  ) {
    const newReservation = await reservationApi.updateReservation(id, payload);
    swrResponse.mutate(newReservation);
    return newReservation;
  }

  return { ...swrResponse, updateReservation };
}
