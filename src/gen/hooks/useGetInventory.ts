import client from '@ssil/client/socio'
import type { GetInventoryQueryResponseType } from '../types/GetInventoryType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getInventoryQueryKey = () => [{ url: '/store/inventory' }] as const

export type GetInventoryQueryKey = ReturnType<typeof getInventoryQueryKey>

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
async function getInventory(config: Partial<RequestConfig> = {}) {
  const res = await client<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/store/inventory`, ...config })
  return res.data
}

export function getInventoryQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = getInventoryQueryKey()
  return queryOptions<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, GetInventoryQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getInventory(config)
    },
  })
}

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
export function useGetInventory<
  TData = GetInventoryQueryResponseType,
  TQueryData = GetInventoryQueryResponseType,
  TQueryKey extends QueryKey = GetInventoryQueryKey,
>(
  options: {
    query?: Partial<QueryObserverOptions<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInventoryQueryKey()

  const query = useQuery({
    ...(getInventoryQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}