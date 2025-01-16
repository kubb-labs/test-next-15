import client from '@ssil/client/socio'
import type { DeleteOrderMutationResponseType, DeleteOrderPathParamsType, DeleteOrder400Type, DeleteOrder404Type } from '../types/DeleteOrderType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getDeleteOrderUrl({ orderId }: { orderId: DeleteOrderPathParamsType['orderId'] }) {
  return `/store/order/${orderId}` as const
}

/**
 * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 * @summary Delete purchase order by ID
 * {@link /store/order/:orderId}
 */
export async function deleteOrder({ orderId }: { orderId: DeleteOrderPathParamsType['orderId'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<DeleteOrderMutationResponseType, ResponseErrorConfig<DeleteOrder400Type | DeleteOrder404Type>, unknown>({
    method: 'DELETE',
    url: getDeleteOrderUrl({ orderId }).toString(),
    ...config,
  })
  return res.data
}