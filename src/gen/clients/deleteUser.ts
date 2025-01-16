import client from '@ssil/client/socio'
import type { DeleteUserMutationResponseType, DeleteUserPathParamsType, DeleteUser400Type, DeleteUser404Type } from '../types/DeleteUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getDeleteUserUrl({ username }: { username: DeleteUserPathParamsType['username'] }) {
  return `/user/${username}` as const
}

/**
 * @description This can only be done by the logged in user.
 * @summary Delete user
 * {@link /user/:username}
 */
export async function deleteUser({ username }: { username: DeleteUserPathParamsType['username'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<DeleteUserMutationResponseType, ResponseErrorConfig<DeleteUser400Type | DeleteUser404Type>, unknown>({
    method: 'DELETE',
    url: getDeleteUserUrl({ username }).toString(),
    ...config,
  })
  return res.data
}