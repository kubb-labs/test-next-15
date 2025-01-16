import client from '@ssil/client/socio'
import type { UpdatePetMutationRequestType, UpdatePetMutationResponseType, UpdatePet400Type, UpdatePet404Type, UpdatePet405Type } from '../types/UpdatePetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const updatePetMutationKey = () => [{ url: '/pet' }] as const

export type UpdatePetMutationKey = ReturnType<typeof updatePetMutationKey>

/**
 * @summary Update an existing pet
 * {@link /pet}
 */
async function updatePet(data: UpdatePetMutationRequestType, config: Partial<RequestConfig<UpdatePetMutationRequestType>> = {}) {
  const res = await client<
    UpdatePetMutationResponseType,
    ResponseErrorConfig<UpdatePet400Type | UpdatePet404Type | UpdatePet405Type>,
    UpdatePetMutationRequestType
  >({ method: 'PUT', url: `/pet`, data, ...config })
  return res.data
}

/**
 * @summary Update an existing pet
 * {@link /pet}
 */
export function useUpdatePet(
  options: {
    mutation?: UseMutationOptions<
      UpdatePetMutationResponseType,
      ResponseErrorConfig<UpdatePet400Type | UpdatePet404Type | UpdatePet405Type>,
      { data: UpdatePetMutationRequestType }
    >
    client?: Partial<RequestConfig<UpdatePetMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updatePetMutationKey()

  return useMutation<
    UpdatePetMutationResponseType,
    ResponseErrorConfig<UpdatePet400Type | UpdatePet404Type | UpdatePet405Type>,
    { data: UpdatePetMutationRequestType }
  >({
    mutationFn: async ({ data }) => {
      return updatePet(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}