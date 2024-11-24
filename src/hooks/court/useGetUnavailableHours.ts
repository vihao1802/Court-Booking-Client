import { courtApi } from "@/api/court";
import useSWR, { SWRConfiguration } from "swr";

interface GetUnavailableHoursProps {
  courtId: string;
  date: string;
  options?: Partial<SWRConfiguration>;
}

export function useGetUnavailableHour({
  courtId,
  date,
  options,
}: GetUnavailableHoursProps) {
  const swrResponse = useSWR<string[]>(
    `get_unavailable_hours`,
    () => courtApi.getUnavailableHours(courtId, date),
    {
      ...options,
    }
  );

  return swrResponse;
}
