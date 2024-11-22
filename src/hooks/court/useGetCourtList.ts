import { QueryKeys } from '@/constants/query-keys';
import { Pagination } from '@/models/api';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { courtApi } from '@/api/court';

export interface UseCourtListProps {
    typeId: string,
    params: Partial<Pagination>,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useGetCourtList({typeId, params, options, enabled = true}: UseCourtListProps) {
    const swrResponse = useSWR(
        enabled && Boolean(typeId)? [QueryKeys.GET_COURT_LIST, typeId ,params] : null,
        () => courtApi.getByCourtType(typeId, params),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
    )

    return swrResponse;
}