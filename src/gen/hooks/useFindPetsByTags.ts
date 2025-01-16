import client from '@ssil/client/socio'
import type { FindPetsByTagsQueryResponseType, FindPetsByTagsQueryParamsType, FindPetsByTags400Type } from '../types/FindPetsByTagsType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const findPetsByTagsQueryKey = (params: FindPetsByTagsQueryParamsType) => [{ url: '/pet/findByTags' }, ...(params ? [params] : [])] as const

export type FindPetsByTagsQueryKey = ReturnType<typeof findPetsByTagsQueryKey>

/**
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags
 * {@link /pet/findByTags}
 * @deprecated
 */
async function findPetsByTags(params: FindPetsByTagsQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<FindPetsByTagsQueryResponseType, ResponseErrorConfig<FindPetsByTags400Type>, unknown>({
    method: 'GET',
    url: `/pet/findByTags`,
    params,
    ...config,
  })
  return res.data
}

export function findPetsByTagsQueryOptions(params: FindPetsByTagsQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = findPetsByTagsQueryKey(params)
  return queryOptions<FindPetsByTagsQueryResponseType, ResponseErrorConfig<FindPetsByTags400Type>, FindPetsByTagsQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return findPetsByTags(params, config)
    },
  })
}

/**
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags
 * {@link /pet/findByTags}
 * @deprecated
 */
export function useFindPetsByTags<
  TData = FindPetsByTagsQueryResponseType,
  TQueryData = FindPetsByTagsQueryResponseType,
  TQueryKey extends QueryKey = FindPetsByTagsQueryKey,
>(
  params: FindPetsByTagsQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<FindPetsByTagsQueryResponseType, ResponseErrorConfig<FindPetsByTags400Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByTagsQueryKey(params)

  const query = useQuery({
    ...(findPetsByTagsQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<FindPetsByTags400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}