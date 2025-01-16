import client from '@ssil/client/socio'
import type { AddPetMutationRequestType, AddPetMutationResponseType, AddPet405Type } from '../types/AddPetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const addPetMutationKey = () => [{ url: '/pet' }] as const

export type AddPetMutationKey = ReturnType<typeof addPetMutationKey>

/**
 * @summary Add a new pet to the store
 * {@link /pet}
 */
async function addPet(data: AddPetMutationRequestType, config: Partial<RequestConfig<AddPetMutationRequestType>> = {}) {
  const res = await client<AddPetMutationResponseType, ResponseErrorConfig<AddPet405Type>, AddPetMutationRequestType>({
    method: 'POST',
    url: `/pet`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @summary Add a new pet to the store
 * {@link /pet}
 */
export function useAddPet(
  options: {
    mutation?: UseMutationOptions<AddPetMutationResponseType, ResponseErrorConfig<AddPet405Type>, { data: AddPetMutationRequestType }>
    client?: Partial<RequestConfig<AddPetMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? addPetMutationKey()

  return useMutation<AddPetMutationResponseType, ResponseErrorConfig<AddPet405Type>, { data: AddPetMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return addPet(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}