import { courtApi } from "@/api/court";
import { QueryKeys } from "@/constants/query-keys";
import useSWR, { SWRConfiguration } from "swr";

interface GetAvailableDateProps {
  courtId: string;
  options?: Partial<SWRConfiguration>;
}

export function useGetAvailableDate({
  courtId,
  options,
}: GetAvailableDateProps) {
  const swrResponse = useSWR<string[]>(
    [QueryKeys.GET_COURT_LIST, "useGetAvailableDate"],
    () => courtApi.getAvailableDate(courtId),
    { ...options }
  );

  return swrResponse;
}
