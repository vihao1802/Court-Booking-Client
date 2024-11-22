import { courtApi } from '@/api/court'
import { QueryKeys } from '@/constants/query-keys'
import { CourtRequest } from '@/models/court'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePutCourt() {
	const { mutate } = useSWRConfig()

	async function usePutCourt(courtId: string,courtData: CourtRequest) {
		try {			
			const newCourt = await courtApi.updateCourt(courtId, courtData)

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COURT_LIST),
				undefined,
				{ revalidate: true }
			);
			return newCourt
		} catch (error: AxiosError | any) {
			console.log('Failed to put court:', error?.response.data.message);
		}
	}

	return usePutCourt
}