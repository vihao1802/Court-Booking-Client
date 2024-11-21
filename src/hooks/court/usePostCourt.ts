import { courtApi } from '@/api/court'
import { QueryKeys } from '@/constants/query-keys'
import { CourtRequest } from '@/models/court'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePostCourt() {

	async function usePostCourt(courtData: CourtRequest) {
		try {
			const newCourt = await courtApi.createCourt(courtData)
			return newCourt
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error?.response.data.message);
		}
	}

	return usePostCourt
}