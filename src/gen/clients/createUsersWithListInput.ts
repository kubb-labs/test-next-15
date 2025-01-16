import client from '@ssil/client/socio'
import type { CreateUsersWithListInputMutationRequestType, CreateUsersWithListInputMutationResponseType } from '../types/CreateUsersWithListInputType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getCreateUsersWithListInputUrl() {
  return `/user/createWithList` as const
}

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithList}
 */
export async function createUsersWithListInput(
  data?: CreateUsersWithListInputMutationRequestType,
  config: Partial<RequestConfig<CreateUsersWithListInputMutationRequestType>> = {},
) {
  const res = await client<CreateUsersWithListInputMutationResponseType, ResponseErrorConfig<Error>, CreateUsersWithListInputMutationRequestType>({
    method: 'POST',
    url: getCreateUsersWithListInputUrl().toString(),
    data,
    ...config,
  })
  return res.data
}