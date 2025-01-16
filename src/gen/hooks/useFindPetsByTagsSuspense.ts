import client from '@ssil/client/socio'
import type { FindPetsByTagsQueryResponseType, FindPetsByTagsQueryParamsType, FindPetsByTags400Type } from '../types/FindPetsByTagsType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const findPetsByTagsSuspenseQueryKey = (params: FindPetsByTagsQueryParamsType) => [{ url: '/pet/findByTags' }, ...(params ? [params] : [])] as const

export type FindPetsByTagsSuspenseQueryKey = ReturnType<typeof findPetsByTagsSuspenseQueryKey>

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

export function findPetsByTagsSuspenseQueryOptions(params: FindPetsByTagsQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = findPetsByTagsSuspenseQueryKey(params)
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
export function useFindPetsByTagsSuspense<
  TData = FindPetsByTagsQueryResponseType,
  TQueryData = FindPetsByTagsQueryResponseType,
  TQueryKey extends QueryKey = FindPetsByTagsSuspenseQueryKey,
>(
  params: FindPetsByTagsQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<FindPetsByTagsQueryResponseType, ResponseErrorConfig<FindPetsByTags400Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? findPetsByTagsSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(findPetsByTagsSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<FindPetsByTags400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}