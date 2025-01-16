import client from '@ssil/client/socio'
import type { CreateUsersWithListInputMutationRequestType, CreateUsersWithListInputMutationResponseType } from '../types/CreateUsersWithListInputType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const createUsersWithListInputMutationKey = () => [{ url: '/user/createWithList' }] as const

export type CreateUsersWithListInputMutationKey = ReturnType<typeof createUsersWithListInputMutationKey>

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithList}
 */
async function createUsersWithListInput(
  data?: CreateUsersWithListInputMutationRequestType,
  config: Partial<RequestConfig<CreateUsersWithListInputMutationRequestType>> = {},
) {
  const res = await client<CreateUsersWithListInputMutationResponseType, ResponseErrorConfig<Error>, CreateUsersWithListInputMutationRequestType>({
    method: 'POST',
    url: `/user/createWithList`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @summary Creates list of users with given input array
 * {@link /user/createWithList}
 */
export function useCreateUsersWithListInput(
  options: {
    mutation?: UseMutationOptions<
      CreateUsersWithListInputMutationResponseType,
      ResponseErrorConfig<Error>,
      { data?: CreateUsersWithListInputMutationRequestType }
    >
    client?: Partial<RequestConfig<CreateUsersWithListInputMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? createUsersWithListInputMutationKey()

  return useMutation<CreateUsersWithListInputMutationResponseType, ResponseErrorConfig<Error>, { data?: CreateUsersWithListInputMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return createUsersWithListInput(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}