import { reservationApi } from "@/api/reservation";
import { QueryKeys } from "@/constants/query-keys";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetMyReservationProps {
  options?: SWRConfiguration;
  enabled?: boolean;
}

export const useGetMyReservation = ({
  options,
  enabled
}:UseGetMyReservationProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_RESERVATION] : null,
    () => reservationApi.getMyReservation(),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
