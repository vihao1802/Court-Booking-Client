import { reservationApi } from "@/api/reservation";
import { statisticApi } from "@/api/statistic";
import { QueryKeys } from "@/constants/query-keys";
import { Dayjs } from "dayjs";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetBookingHourProps {
  options?: SWRConfiguration;
  enabled?: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

export const UseGetBookingHour = ({
  options,
  enabled,
  startDate,
    endDate,

}:UseGetBookingHourProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_STATISTIC_BOOKING_HOUR] : null,
    () => statisticApi.getTotalBookingHours(startDate,endDate),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
