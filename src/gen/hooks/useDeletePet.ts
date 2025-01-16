import client from '@ssil/client/socio'
import type {
  DeletePetMutationResponseType,
  DeletePetPathParamsType,
  DeletePetHeaderParamsType,
  DeletePet400Type,
  DeletePet404Type,
} from '../types/DeletePetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deletePetMutationKey = () => [{ url: '/pet/{petId}' }] as const

export type DeletePetMutationKey = ReturnType<typeof deletePetMutationKey>

/**
 * @summary Deletes a pet
 * {@link /pet/:petId}
 */
async function deletePet(petId: DeletePetPathParamsType['petId'], headers?: DeletePetHeaderParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<DeletePetMutationResponseType, ResponseErrorConfig<DeletePet400Type | DeletePet404Type>, unknown>({
    method: 'DELETE',
    url: `/pet/${petId}`,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}

/**
 * @summary Deletes a pet
 * {@link /pet/:petId}
 */
export function useDeletePet(
  options: {
    mutation?: UseMutationOptions<
      DeletePetMutationResponseType,
      ResponseErrorConfig<DeletePet400Type | DeletePet404Type>,
      { petId: DeletePetPathParamsType['petId']; headers?: DeletePetHeaderParamsType }
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deletePetMutationKey()

  return useMutation<
    DeletePetMutationResponseType,
    ResponseErrorConfig<DeletePet400Type | DeletePet404Type>,
    { petId: DeletePetPathParamsType['petId']; headers?: DeletePetHeaderParamsType }
  >({
    mutationFn: async ({ petId, headers }) => {
      return deletePet(petId, headers, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}