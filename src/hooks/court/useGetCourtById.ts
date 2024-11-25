import { QueryKeys } from "@/constants/query-keys";
import useSWR from "swr";
import { courtApi } from "@/api/court";

export function useGetCourtById({
  courtId,
  enabled = true,
}: {
  courtId: string;
  enabled?: boolean;
}) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_COURT_LIST, courtId] : null,
    () => courtApi.getById(courtId),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      // fallbackData: null,
    }
  );

  return swrResponse;
}
