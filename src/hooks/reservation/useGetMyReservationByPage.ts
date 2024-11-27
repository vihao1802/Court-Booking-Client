import { reservationApi } from "@/api/reservation";
import { QueryKeys } from "@/constants/query-keys";
import { Pagination } from "@/models/api";
import useSWR, { SWRConfiguration } from "swr";

export interface UseGetMyReservationProps {
  options?: SWRConfiguration;
  params: Partial<Pagination>;
  enabled?: boolean;
}

export const useGetMyReservationPage = ({
  options,
  enabled,
  params,
}: UseGetMyReservationProps) => {
  const swrResponse = useSWR(
    enabled &&  "get_my_reservation_page",
    () => reservationApi.getMyReservationPage(params),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );
  return { ...swrResponse };
};
