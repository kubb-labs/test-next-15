import client from '@ssil/client/socio'
import type { DeleteOrderMutationResponseType, DeleteOrderPathParamsType, DeleteOrder400Type, DeleteOrder404Type } from '../types/DeleteOrderType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const deleteOrderMutationKey = () => [{ url: '/store/order/{orderId}' }] as const

export type DeleteOrderMutationKey = ReturnType<typeof deleteOrderMutationKey>

/**
 * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 * @summary Delete purchase order by ID
 * {@link /store/order/:orderId}
 */
async function deleteOrder(orderId: DeleteOrderPathParamsType['orderId'], config: Partial<RequestConfig> = {}) {
  const res = await client<DeleteOrderMutationResponseType, ResponseErrorConfig<DeleteOrder400Type | DeleteOrder404Type>, unknown>({
    method: 'DELETE',
    url: `/store/order/${orderId}`,
    ...config,
  })
  return res.data
}

/**
 * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 * @summary Delete purchase order by ID
 * {@link /store/order/:orderId}
 */
export function useDeleteOrder(
  options: {
    mutation?: UseMutationOptions<
      DeleteOrderMutationResponseType,
      ResponseErrorConfig<DeleteOrder400Type | DeleteOrder404Type>,
      { orderId: DeleteOrderPathParamsType['orderId'] }
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? deleteOrderMutationKey()

  return useMutation<
    DeleteOrderMutationResponseType,
    ResponseErrorConfig<DeleteOrder400Type | DeleteOrder404Type>,
    { orderId: DeleteOrderPathParamsType['orderId'] }
  >({
    mutationFn: async ({ orderId }) => {
      return deleteOrder(orderId, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}