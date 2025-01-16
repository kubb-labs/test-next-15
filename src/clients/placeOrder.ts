import client from '@ssil/client/socio'
import type { PlaceOrderMutationRequestType, PlaceOrderMutationResponseType, PlaceOrder400Type } from '../types/PlaceOrderType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getPlaceOrderUrl() {
  return `/store/order` as const
}

/**
 * @summary Place an order for a pet
 * {@link /store/order}
 */
export async function placeOrder(data?: PlaceOrderMutationRequestType, config: Partial<RequestConfig<PlaceOrderMutationRequestType>> = {}) {
  const res = await client<PlaceOrderMutationResponseType, ResponseErrorConfig<PlaceOrder400Type>, PlaceOrderMutationRequestType>({
    method: 'POST',
    url: getPlaceOrderUrl().toString(),
    data,
    ...config,
  })
  return res.data
}