import client from '@ssil/client/socio'
import type { CreateUserMutationRequestType, CreateUserMutationResponseType } from '../types/CreateUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getCreateUserUrl() {
  return `/user` as const
}

/**
 * @description This can only be done by the logged in user.
 * @summary Create user
 * {@link /user}
 */
export async function createUser(data?: CreateUserMutationRequestType, config: Partial<RequestConfig<CreateUserMutationRequestType>> = {}) {
  const res = await client<CreateUserMutationResponseType, ResponseErrorConfig<Error>, CreateUserMutationRequestType>({
    method: 'POST',
    url: getCreateUserUrl().toString(),
    data,
    ...config,
  })
  return res.data
}