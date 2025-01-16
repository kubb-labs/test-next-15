import client from '@ssil/client/socio'
import type { GetPetByIdQueryResponseType, GetPetByIdPathParamsType, GetPetById400Type, GetPetById404Type } from '../types/GetPetByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getGetPetByIdUrl({ petId }: { petId: GetPetByIdPathParamsType['petId'] }) {
  return `/pet/${petId}` as const
}

/**
 * @description Returns a single pet
 * @summary Find pet by ID
 * {@link /pet/:petId}
 */
export async function getPetById({ petId }: { petId: GetPetByIdPathParamsType['petId'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetPetByIdQueryResponseType, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>, unknown>({
    method: 'GET',
    url: getGetPetByIdUrl({ petId }).toString(),
    ...config,
  })
  return res.data
}