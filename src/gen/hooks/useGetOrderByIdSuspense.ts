import client from '@ssil/client/socio'
import type { GetOrderByIdQueryResponseType, GetOrderByIdPathParamsType, GetOrderById400Type, GetOrderById404Type } from '../types/GetOrderByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getOrderByIdSuspenseQueryKey = (orderId: GetOrderByIdPathParamsType['orderId']) =>
  [{ url: '/store/order/:orderId', params: { orderId: orderId } }] as const

export type GetOrderByIdSuspenseQueryKey = ReturnType<typeof getOrderByIdSuspenseQueryKey>

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

export function getOrderByIdSuspenseQueryOptions(orderId: GetOrderByIdPathParamsType['orderId'], config: Partial<RequestConfig> = {}) {
  const queryKey = getOrderByIdSuspenseQueryKey(orderId)
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
export function useGetOrderByIdSuspense<
  TData = GetOrderByIdQueryResponseType,
  TQueryData = GetOrderByIdQueryResponseType,
  TQueryKey extends QueryKey = GetOrderByIdSuspenseQueryKey,
>(
  orderId: GetOrderByIdPathParamsType['orderId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetOrderByIdQueryResponseType, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getOrderByIdSuspenseQueryKey(orderId)

  const query = useSuspenseQuery({
    ...(getOrderByIdSuspenseQueryOptions(orderId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetOrderById400Type | GetOrderById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}