import client from '@ssil/client/socio'
import type { PlaceOrderMutationRequestType, PlaceOrderMutationResponseType, PlaceOrder400Type } from '../types/PlaceOrderType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const placeOrderMutationKey = () => [{ url: '/store/order' }] as const

export type PlaceOrderMutationKey = ReturnType<typeof placeOrderMutationKey>

/**
 * @summary Place an order for a pet
 * {@link /store/order}
 */
async function placeOrder(data?: PlaceOrderMutationRequestType, config: Partial<RequestConfig<PlaceOrderMutationRequestType>> = {}) {
  const res = await client<PlaceOrderMutationResponseType, ResponseErrorConfig<PlaceOrder400Type>, PlaceOrderMutationRequestType>({
    method: 'POST',
    url: `/store/order`,
    data,
    ...config,
  })
  return res.data
}

/**
 * @summary Place an order for a pet
 * {@link /store/order}
 */
export function usePlaceOrder(
  options: {
    mutation?: UseMutationOptions<PlaceOrderMutationResponseType, ResponseErrorConfig<PlaceOrder400Type>, { data?: PlaceOrderMutationRequestType }>
    client?: Partial<RequestConfig<PlaceOrderMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? placeOrderMutationKey()

  return useMutation<PlaceOrderMutationResponseType, ResponseErrorConfig<PlaceOrder400Type>, { data?: PlaceOrderMutationRequestType }>({
    mutationFn: async ({ data }) => {
      return placeOrder(data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}