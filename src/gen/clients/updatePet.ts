import client from '@ssil/client/socio'
import type { UpdatePetMutationRequestType, UpdatePetMutationResponseType, UpdatePet400Type, UpdatePet404Type, UpdatePet405Type } from '../types/UpdatePetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getUpdatePetUrl() {
  return `/pet` as const
}

/**
 * @summary Update an existing pet
 * {@link /pet}
 */
export async function updatePet(data: UpdatePetMutationRequestType, config: Partial<RequestConfig<UpdatePetMutationRequestType>> = {}) {
  const res = await client<
    UpdatePetMutationResponseType,
    ResponseErrorConfig<UpdatePet400Type | UpdatePet404Type | UpdatePet405Type>,
    UpdatePetMutationRequestType
  >({ method: 'PUT', url: getUpdatePetUrl().toString(), data, ...config })
  return res.data
}