import client from '@ssil/client/socio'
import type {
  UpdatePetWithFormMutationRequestType,
  UpdatePetWithFormMutationResponseType,
  UpdatePetWithFormPathParamsType,
  UpdatePetWithForm405Type,
} from '../types/UpdatePetWithFormType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const updatePetWithFormMutationKey = () => [{ url: '/pet/{petId}' }] as const

export type UpdatePetWithFormMutationKey = ReturnType<typeof updatePetWithFormMutationKey>

/**
 * @summary Updates a pet in the store with form data
 * {@link /pet/:petId}
 */
async function updatePetWithForm(
  petId: UpdatePetWithFormPathParamsType['petId'],
  data?: UpdatePetWithFormMutationRequestType,
  config: Partial<RequestConfig<UpdatePetWithFormMutationRequestType>> = {},
) {
  const res = await client<UpdatePetWithFormMutationResponseType, ResponseErrorConfig<UpdatePetWithForm405Type>, UpdatePetWithFormMutationRequestType>({
    method: 'POST',
    url: `/pet/${petId}`,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...config.headers },
    ...config,
  })
  return res.data
}

/**
 * @summary Updates a pet in the store with form data
 * {@link /pet/:petId}
 */
export function useUpdatePetWithForm(
  options: {
    mutation?: UseMutationOptions<
      UpdatePetWithFormMutationResponseType,
      ResponseErrorConfig<UpdatePetWithForm405Type>,
      { petId: UpdatePetWithFormPathParamsType['petId']; data?: UpdatePetWithFormMutationRequestType }
    >
    client?: Partial<RequestConfig<UpdatePetWithFormMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? updatePetWithFormMutationKey()

  return useMutation<
    UpdatePetWithFormMutationResponseType,
    ResponseErrorConfig<UpdatePetWithForm405Type>,
    { petId: UpdatePetWithFormPathParamsType['petId']; data?: UpdatePetWithFormMutationRequestType }
  >({
    mutationFn: async ({ petId, data }) => {
      return updatePetWithForm(petId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}