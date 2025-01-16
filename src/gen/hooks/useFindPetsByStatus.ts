import client from '@ssil/client/socio'
import type { FindPetsByStatusQueryResponseType, FindPetsByStatusQueryParamsType, FindPetsByStatus400Type } from '../types/FindPetsByStatusType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const findPetsByStatusQueryKey = (params: FindPetsByStatusQueryParamsType) => [{ url: '/pet/findByStatus' }, ...(params ? [params] : [])] as const

export type FindPetsByStatusQueryKey = ReturnType<typeof findPetsByStatusQueryKey>

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

export function findPetsByStatusQueryOptions(params: FindPetsByStatusQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = findPetsByStatusQueryKey(params)
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
export function useFindPetsByStatus<
  TData = FindPetsByStatusQueryResponseType,
  TQueryData = FindPetsByStatusQueryResponseType,
  TQueryKey extends QueryKey = FindPetsByStatusQueryKey,
>(
  params: FindPetsByStatusQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<FindPetsByStatusQueryResponseType, ResponseErrorConfig<FindPetsByStatus400Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByStatusQueryKey(params)

  const query = useQuery({
    ...(findPetsByStatusQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FindPetsByStatus400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}