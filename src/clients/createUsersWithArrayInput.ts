import client from '@ssil/client/socio'
import type { CreateUsersWithArrayInputMutationRequestType, CreateUsersWithArrayInputMutationResponseType } from '../types/CreateUsersWithArrayInputType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getCreateUsersWithArrayInputUrl() {
  return `/user/createWithArray` as const
}

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithArray}
 */
export async function createUsersWithArrayInput(
  data?: CreateUsersWithArrayInputMutationRequestType,
  config: Partial<RequestConfig<CreateUsersWithArrayInputMutationRequestType>> = {},
) {
  const res = await client<CreateUsersWithArrayInputMutationResponseType, ResponseErrorConfig<Error>, CreateUsersWithArrayInputMutationRequestType>({
    method: 'POST',
    url: getCreateUsersWithArrayInputUrl().toString(),
    data,
    ...config,
  })
  return res.data
}