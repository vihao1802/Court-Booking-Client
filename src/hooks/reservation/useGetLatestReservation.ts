import { reservationApi } from "@/api/reservation";
import { statisticApi } from "@/api/statistic";
import { QueryKeys } from "@/constants/query-keys";
import { Dayjs } from "dayjs";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetLatestReservationProps {
  options?: SWRConfiguration;
  enabled?: boolean;
  limit?: number;
}

export const UseGetLatestReservation = ({
  options,
  enabled,
  limit=5,

}:UseGetLatestReservationProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_RESERVATION] : null,
    () => statisticApi.getLatestReservation(limit),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
