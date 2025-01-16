import client from '@ssil/client/socio'
import type { AddPetMutationRequestType, AddPetMutationResponseType, AddPet405Type } from '../types/AddPetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getAddPetUrl() {
  return `/pet` as const
}

/**
 * @summary Add a new pet to the store
 * {@link /pet}
 */
export async function addPet(data: AddPetMutationRequestType, config: Partial<RequestConfig<AddPetMutationRequestType>> = {}) {
  const res = await client<AddPetMutationResponseType, ResponseErrorConfig<AddPet405Type>, AddPetMutationRequestType>({
    method: 'POST',
    url: getAddPetUrl().toString(),
    data,
    ...config,
  })
  return res.data
}