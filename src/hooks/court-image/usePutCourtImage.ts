import { courtImageApi} from '@/api/court-image'
import { QueryKeys } from '@/constants/query-keys'
import { CourtImageRequest } from '@/models/court-image'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePutCourtImage() {
	const { mutate } = useSWRConfig()

	async function PutCourtImage(courtId: string, request: FormData) {
		try {			
			const newCourtImage = await courtImageApi.updateCourtImage(courtId, request)

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COURT_LIST),
				undefined,
				{ revalidate: true }
			);
			return newCourtImage
		} catch (error: AxiosError | any) {
			console.log('Failed to put court image:', error?.response.data.message);
		}
	}

	return PutCourtImage
}