import client from '@ssil/client/socio'
import type { CreateUsersWithArrayInputMutationRequestType, CreateUsersWithArrayInputMutationResponseType } from '../types/CreateUsersWithArrayInputType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createUsersWithArrayInputMutationKey = () => [{ url: '/user/createWithArray' }] as const

export type CreateUsersWithArrayInputMutationKey = ReturnType<typeof createUsersWithArrayInputMutationKey>

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithArray}
 */
async function createUsersWithArrayInput(
  data?: CreateUsersWithArrayInputMutationRequestType,
  config: Partial<RequestConfig<CreateUsersWithArrayInputMutationRequestType>> = {},
) {
  const res = await client<CreateUsersWithArrayInputMutationResponseType, ResponseErrorConfig<Error>, CreateUsersWithArrayInputMutationRequestType>({
    method: 'POST',
    url: `/user/createWithArray`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithArray}
 */
export function useCreateUsersWithArrayInput(
  options: {
    mutation?: UseMutationOptions<
      CreateUsersWithArrayInputMutationResponseType,
      ResponseErrorConfig<Error>,
      { data?: CreateUsersWithArrayInputMutationRequestType }
    >
    client?: Partial<RequestConfig<CreateUsersWithArrayInputMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createUsersWithArrayInputMutationKey()

  return useMutation<CreateUsersWithArrayInputMutationResponseType, ResponseErrorConfig<Error>, { data?: CreateUsersWithArrayInputMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return createUsersWithArrayInput(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}