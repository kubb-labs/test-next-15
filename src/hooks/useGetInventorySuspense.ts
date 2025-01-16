import client from '@ssil/client/socio'
import type { GetInventoryQueryResponseType } from '../types/GetInventoryType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getInventorySuspenseQueryKey = () => [{ url: '/store/inventory' }] as const

export type GetInventorySuspenseQueryKey = ReturnType<typeof getInventorySuspenseQueryKey>

/**
 * @description Returns a map of status codes to quantities
 * @summary Returns pet inventories by status
 * {@link /store/inventory}
 */
async function getInventory(config: Partial<RequestConfig> = {}) {
  const res = await client<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/store/inventory`, ...config })
  return res.data
}

export function getInventorySuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = getInventorySuspenseQueryKey()
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
export function useGetInventorySuspense<
  TData = GetInventoryQueryResponseType,
  TQueryData = GetInventoryQueryResponseType,
  TQueryKey extends QueryKey = GetInventorySuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetInventoryQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getInventorySuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(getInventorySuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}