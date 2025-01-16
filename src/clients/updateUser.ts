import client from '@ssil/client/socio'
import type {
  UpdateUserMutationRequestType,
  UpdateUserMutationResponseType,
  UpdateUserPathParamsType,
  UpdateUser400Type,
  UpdateUser404Type,
} from '../types/UpdateUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getUpdateUserUrl({ username }: { username: UpdateUserPathParamsType['username'] }) {
  return `/user/${username}` as const
}

/**
 * @description This can only be done by the logged in user.
 * @summary Updated user
 * {@link /user/:username}
 */
export async function updateUser(
  { username }: { username: UpdateUserPathParamsType['username'] },
  data?: UpdateUserMutationRequestType,
  config: Partial<RequestConfig<UpdateUserMutationRequestType>> = {},
) {
  const res = await client<UpdateUserMutationResponseType, ResponseErrorConfig<UpdateUser400Type | UpdateUser404Type>, UpdateUserMutationRequestType>({
    method: 'PUT',
    url: getUpdateUserUrl({ username }).toString(),
    data,
    ...config,
  })
  return res.data
}