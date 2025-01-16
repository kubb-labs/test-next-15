import client from '@ssil/client/socio'
import type { GetOrderByIdQueryResponseType, GetOrderByIdPathParamsType, GetOrderById400Type, GetOrderById404Type } from '../types/GetOrderByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getGetOrderByIdUrl({ orderId }: { orderId: GetOrderByIdPathParamsType['orderId'] }) {
  return `/store/order/${orderId}` as const
}

/**
 * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 * @summary Find purchase order by ID
 * {@link /store/order/:orderId}
 */
export async function getOrderById({ orderId }: { orderId: GetOrderByIdPathParamsType['orderId'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetOrderByIdQueryResponseType, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>, unknown>({
    method: 'GET',
    url: getGetOrderByIdUrl({ orderId }).toString(),
    ...config,
  })
  return res.data
}