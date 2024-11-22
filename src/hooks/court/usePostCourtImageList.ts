import { courtApi } from '@/api/court'
import { QueryKeys } from '@/constants/query-keys'
import { CourtRequest } from '@/models/court'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePostCourtImageList() {
	const { mutate } = useSWRConfig()

	async function PostCourtImageList(courtId: string, imageList: FormData) {
		try {
			const newCourtImageList = await courtApi.createCourtImageList(courtId, imageList)

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COURT_LIST),
				undefined,
				{ revalidate: true }
			);

			return newCourtImageList
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return PostCourtImageList
}