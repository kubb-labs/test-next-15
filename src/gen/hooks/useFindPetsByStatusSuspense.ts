import client from '@ssil/client/socio'
import type { FindPetsByStatusQueryResponseType, FindPetsByStatusQueryParamsType, FindPetsByStatus400Type } from '../types/FindPetsByStatusType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const findPetsByStatusSuspenseQueryKey = (params: FindPetsByStatusQueryParamsType) =>
  [{ url: '/pet/findByStatus' }, ...(params ? [params] : [])] as const

export type FindPetsByStatusSuspenseQueryKey = ReturnType<typeof findPetsByStatusSuspenseQueryKey>

/**
 * @description Multiple status values can be provided with comma separated strings
 * @summary Finds Pets by status
 * {@link /pet/findByStatus}
 */
async function findPetsByStatus(params: FindPetsByStatusQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<FindPetsByStatusQueryResponseType, ResponseErrorConfig<FindPetsByStatus400Type>, unknown>({
    method: 'GET',
    url: `/pet/findByStatus`,
    params,
    ...config,
  })
  return res.data
}

export function findPetsByStatusSuspenseQueryOptions(params: FindPetsByStatusQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = findPetsByStatusSuspenseQueryKey(params)
  return queryOptions<FindPetsByStatusQueryResponseType, ResponseErrorConfig<FindPetsByStatus400Type>, FindPetsByStatusQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findPetsByStatus(params, config)
    },
  })
}

/**
 * @description Multiple status values can be provided with comma separated strings
 * @summary Finds Pets by status
 * {@link /pet/findByStatus}
 */
export function useFindPetsByStatusSuspense<
  TData = FindPetsByStatusQueryResponseType,
  TQueryData = FindPetsByStatusQueryResponseType,
  TQueryKey extends QueryKey = FindPetsByStatusSuspenseQueryKey,
>(
  params: FindPetsByStatusQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<FindPetsByStatusQueryResponseType, ResponseErrorConfig<FindPetsByStatus400Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByStatusSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(findPetsByStatusSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindPetsByStatus400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}