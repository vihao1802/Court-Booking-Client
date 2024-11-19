import { QueryKeys } from "@/constants/query-keys";
import useSWR from "swr";
import { courtApi } from "@/api/court";

export function useGetCourtById({ courtId }: { courtId: string }) {
  const swrResponse = useSWR(
    [QueryKeys.GET_COURT_LIST, courtId],
    () => courtApi.getById(courtId),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: undefined,
    }
  );

  return swrResponse;
}
