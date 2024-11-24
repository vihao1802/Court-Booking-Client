import { reservationApi } from "@/api/reservation";
import { statisticApi } from "@/api/statistic";
import { QueryKeys } from "@/constants/query-keys";
import { Dayjs } from "dayjs";
import useSWR, { SWRConfiguration } from "swr";


export interface UseGetNewUserProps {
  options?: SWRConfiguration;
  enabled?: boolean;
  startDate: Dayjs;
  endDate: Dayjs;
}

export const UseGetNewUser = ({
  options,
  enabled,
  startDate,
    endDate,

}:UseGetNewUserProps) => {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_STATISTIC_NEW_USER] : null,
    () => statisticApi.getTotalUser(startDate,endDate),
    {   
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return {...swrResponse};
};
