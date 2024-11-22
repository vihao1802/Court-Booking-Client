import { QueryKeys } from '@/constants/query-keys';
import { Pagination } from '@/models/api';
import useSWR from 'swr';
import { userApi } from '@/api/user';


export function useGetUserList(params: Pagination) {
    const swrResponse = useSWR(
     [QueryKeys.GET_USER_LIST, params] ,
        () => userApi.getAll(params),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
		}
    )

    return swrResponse;
}