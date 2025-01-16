import client from '@ssil/client/socio'
import type { GetInventoryQueryResponseType } from '../types/GetInventoryType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getGetInventoryUrl() {
  return `/store/inventory` as const
}

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export async function getInventory(config: Partial<RequestConfig> = {}) {
  const res = await client<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, unknown>({
    method: 'GET',
    url: getGetInventoryUrl().toString(),
    ...config,
  })
  return res.data
}