import client from '@ssil/client/socio'
import type { CreateUserMutationRequestType, CreateUserMutationResponseType } from '../types/CreateUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createUserMutationKey = () => [{ url: '/user' }] as const

export type CreateUserMutationKey = ReturnType<typeof createUserMutationKey>

/**
 * @description This can only be done by the logged in user.
 * @summary Create user
 * {@link /user}
 */
async function createUser(data?: CreateUserMutationRequestType, config: Partial<RequestConfig<CreateUserMutationRequestType>> = {}) {
  const res = await client<CreateUserMutationResponseType, ResponseErrorConfig<Error>, CreateUserMutationRequestType>({
    method: 'POST',
    url: `/user`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @description This can only be done by the logged in user.
 * @summary Create user
 * {@link /user}
 */
export function useCreateUser(
  options: {
    mutation?: UseMutationOptions<CreateUserMutationResponseType, ResponseErrorConfig<Error>, { data?: CreateUserMutationRequestType }>
    client?: Partial<RequestConfig<CreateUserMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createUserMutationKey()

  return useMutation<CreateUserMutationResponseType, ResponseErrorConfig<Error>, { data?: CreateUserMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return createUser(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}