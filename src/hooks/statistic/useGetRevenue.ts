import { reservationApi } from "@/api/reservation";
import { statisticApi } from "@/api/statistic";
import { QueryKeys } from "@/constants/query-keys";
import { Dayjs } from "dayjs";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetRevenueProps {
  options?: SWRConfiguration;
  enabled?: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

export const UseGetRevenue = ({
  options,
  enabled,
  startDate,
    endDate,

}:UseGetRevenueProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_STATISTIC_REVENUE] : null,
    () => statisticApi.getTotalRevenue(startDate,endDate),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
