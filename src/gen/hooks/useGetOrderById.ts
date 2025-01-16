import client from '@ssil/client/socio'
import type { GetOrderByIdQueryResponseType, GetOrderByIdPathParamsType, GetOrderById400Type, GetOrderById404Type } from '../types/GetOrderByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getOrderByIdQueryKey = (orderId: GetOrderByIdPathParamsType['orderId']) =>
  [{ url: '/store/order/:orderId', params: { orderId: orderId } }] as const

export type GetOrderByIdQueryKey = ReturnType<typeof getOrderByIdQueryKey>

/**
 * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 * @summary Find purchase order by ID
 * {@link /store/order/:orderId}
 */
async function getOrderById(orderId: GetOrderByIdPathParamsType['orderId'], config: Partial<RequestConfig> = {}) {
  const res = await client<GetOrderByIdQueryResponseType, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>, unknown>({
    method: 'GET',
    url: `/store/order/${orderId}`,
    ...config,
  })
  return res.data
}

export function getOrderByIdQueryOptions(orderId: GetOrderByIdPathParamsType['orderId'], config: Partial<RequestConfig> = {}) {
  const queryKey = getOrderByIdQueryKey(orderId)
  return queryOptions<
    GetOrderByIdQueryResponseType,
    ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>,
    GetOrderByIdQueryResponseType,
    typeof queryKey
  >({
    enabled: !!orderId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getOrderById(orderId, config)
    },
  })
}

/**
 * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 * @summary Find purchase order by ID
 * {@link /store/order/:orderId}
 */
export function useGetOrderById<
  TData = GetOrderByIdQueryResponseType,
  TQueryData = GetOrderByIdQueryResponseType,
  TQueryKey extends QueryKey = GetOrderByIdQueryKey,
>(
  orderId: GetOrderByIdPathParamsType['orderId'],
  options: {
    query?: Partial<
      QueryObserverOptions<GetOrderByIdQueryResponseType, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getOrderByIdQueryKey(orderId)

  const query = useQuery({
    ...(getOrderByIdQueryOptions(orderId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}