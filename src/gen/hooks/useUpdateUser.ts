import client from '@ssil/client/socio'
import type {
  UpdateUserMutationRequestType,
  UpdateUserMutationResponseType,
  UpdateUserPathParamsType,
  UpdateUser400Type,
  UpdateUser404Type,
} from '../types/UpdateUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const updateUserMutationKey = () => [{ url: '/user/{username}' }] as const

export type UpdateUserMutationKey = ReturnType<typeof updateUserMutationKey>

/**
 * @description This can only be done by the logged in user.
 * @summary Updated user
 * {@link /user/:username}
 */
async function updateUser(
  username: UpdateUserPathParamsType['username'],
  data?: UpdateUserMutationRequestType,
  config: Partial<RequestConfig<UpdateUserMutationRequestType>> = {},
) {
  const res = await client<UpdateUserMutationResponseType, ResponseErrorConfig<UpdateUser400Type | UpdateUser404Type>, UpdateUserMutationRequestType>({
    method: 'PUT',
    url: `/user/${username}`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @description This can only be done by the logged in user.
 * @summary Updated user
 * {@link /user/:username}
 */
export function useUpdateUser(
  options: {
    mutation?: UseMutationOptions<
      UpdateUserMutationResponseType,
      ResponseErrorConfig<UpdateUser400Type | UpdateUser404Type>,
      { username: UpdateUserPathParamsType['username']; data?: UpdateUserMutationRequestType }
    >
    client?: Partial<RequestConfig<UpdateUserMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updateUserMutationKey()

  return useMutation<
    UpdateUserMutationResponseType,
    ResponseErrorConfig<UpdateUser400Type | UpdateUser404Type>,
    { username: UpdateUserPathParamsType['username']; data?: UpdateUserMutationRequestType }
  >({
    mutationFn: async ({ username, data }) => {
      return updateUser(username, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}