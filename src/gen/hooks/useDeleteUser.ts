import client from '@ssil/client/socio'
import type { DeleteUserMutationResponseType, DeleteUserPathParamsType, DeleteUser400Type, DeleteUser404Type } from '../types/DeleteUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteUserMutationKey = () => [{ url: '/user/{username}' }] as const

export type DeleteUserMutationKey = ReturnType<typeof deleteUserMutationKey>

/**
 * @description This can only be done by the logged in user.
 * @summary Delete user
 * {@link /user/:username}
 */
async function deleteUser(username: DeleteUserPathParamsType['username'], config: Partial<RequestConfig> = {}) {
  const res = await client<DeleteUserMutationResponseType, ResponseErrorConfig<DeleteUser400Type | DeleteUser404Type>, unknown>({
    method: 'DELETE',
    url: `/user/${username}`,
    ...config,
  })
  return res.data
}

/**
 * @description This can only be done by the logged in user.
 * @summary Delete user
 * {@link /user/:username}
 */
export function useDeleteUser(
  options: {
    mutation?: UseMutationOptions<
      DeleteUserMutationResponseType,
      ResponseErrorConfig<DeleteUser400Type | DeleteUser404Type>,
      { username: DeleteUserPathParamsType['username'] }
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteUserMutationKey()

  return useMutation<
    DeleteUserMutationResponseType,
    ResponseErrorConfig<DeleteUser400Type | DeleteUser404Type>,
    { username: DeleteUserPathParamsType['username'] }
  >({
    mutationFn: async ({ username }) => {
      return deleteUser(username, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}