import { QueryKeys } from '@/constants/query-keys';
import { AvailableCourtPagination} from '@/models/api';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { courtApi } from '@/api/court';

export interface UseAvailableCourtsProps {
    typeId: string,
    params: AvailableCourtPagination,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useGetAvailableCourts({typeId, params, options, enabled = true}: UseAvailableCourtsProps) {
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_COURT_LIST, typeId ,params] : null,
        () => courtApi.getAvailaleCourtByTypeAndDateTime(typeId, params),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
    )

    return swrResponse;
}