import { courtApi } from '@/api/court'
import { QueryKeys } from '@/constants/query-keys'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePutDeleteCourt() {
	const { mutate } = useSWRConfig()

	async function PutDeleteCourt(courtId: string) {
		try {			
			const newCourt = await courtApi.deleteCourt(courtId)

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COURT_LIST),
				undefined,
				{ revalidate: true }
			);
			return newCourt
		} catch (error: AxiosError | any) {
			console.log('Failed to put delete court:', error?.response.data.message);
		}
	}

	return PutDeleteCourt
}