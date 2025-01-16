import client from '@ssil/client/socio'
import type { FindPetsByStatusQueryResponseType, FindPetsByStatusQueryParamsType, FindPetsByStatus400Type } from '../types/FindPetsByStatusType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getFindPetsByStatusUrl() {
  return `/pet/findByStatus` as const
}

/**
 * @description Multiple status values can be provided with comma separated strings
 * @summary Finds Pets by status
 * {@link /pet/findByStatus}
 */
export async function findPetsByStatus(params: FindPetsByStatusQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<FindPetsByStatusQueryResponseType, ResponseErrorConfig<FindPetsByStatus400Type>, unknown>({
    method: 'GET',
    url: getFindPetsByStatusUrl().toString(),
    params,
    ...config,
  })
  return res.data
}