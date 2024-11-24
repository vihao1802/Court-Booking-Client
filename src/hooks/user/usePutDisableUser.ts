import { userApi } from '@/api/user'
import { QueryKeys } from '@/constants/query-keys'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig } from 'swr'

export function usePutDisableUser() {
	const { mutate } = useSWRConfig()

	async function PutDisableUser(id: string,{ isDisabled }: { isDisabled: number }) {
		try {			
			const newUser = await userApi.disableUser(id, { isDisabled })

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_USER_LIST),
				undefined,
				{ revalidate: true }
			);
			return newUser
		} catch (error: AxiosError | any) {
			console.log('Failed to put disable user:', error?.response.data.message);
		}
	}

	return PutDisableUser
}