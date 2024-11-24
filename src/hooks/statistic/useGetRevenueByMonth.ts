import { reservationApi } from "@/api/reservation";
import { statisticApi } from "@/api/statistic";
import { QueryKeys } from "@/constants/query-keys";
import { Dayjs } from "dayjs";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetRevenueByMonthProps {
  options?: SWRConfiguration;
  enabled?: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

export const UseGetRevenueByMonth = ({
  options,
  enabled,
  startDate,
    endDate,

}:UseGetRevenueByMonthProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_STATISTIC_REVENUE_BY_MONTH] : null,
    () => statisticApi.getTotalRevenueByMonth(startDate,endDate),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
