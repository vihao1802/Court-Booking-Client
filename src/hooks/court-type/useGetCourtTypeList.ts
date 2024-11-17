import useSWR from 'swr';
import { courtTypeApi } from '@/api/court-type';
import { QueryKeys } from '@/constants/query-keys';

export function useGetCourtTypeList(params: {isdisabled: number}) {
    const swrResponse = useSWR([QueryKeys.GET_COURT_LIST],
        () => courtTypeApi.getActiveCourtTypes(params),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
		}
    )

    return swrResponse;
}