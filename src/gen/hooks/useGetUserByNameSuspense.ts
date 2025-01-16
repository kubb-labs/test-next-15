import client from '@ssil/client/socio'
import type { GetUserByNameQueryResponseType, GetUserByNamePathParamsType, GetUserByName400Type, GetUserByName404Type } from '../types/GetUserByNameType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getUserByNameSuspenseQueryKey = (username: GetUserByNamePathParamsType['username']) =>
  [{ url: '/user/:username', params: { username: username } }] as const

export type GetUserByNameSuspenseQueryKey = ReturnType<typeof getUserByNameSuspenseQueryKey>

/**
 * @summary Get user by user name
 * {@link /user/:username}
 */
async function getUserByName(username: GetUserByNamePathParamsType['username'], config: Partial<RequestConfig> = {}) {
  const res = await client<GetUserByNameQueryResponseType, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>, unknown>({
    method: 'GET',
    url: `/user/${username}`,
    ...config,
  })
  return res.data
}

export function getUserByNameSuspenseQueryOptions(username: GetUserByNamePathParamsType['username'], config: Partial<RequestConfig> = {}) {
  const queryKey = getUserByNameSuspenseQueryKey(username)
  return queryOptions<
    GetUserByNameQueryResponseType,
    ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>,
    GetUserByNameQueryResponseType,
    typeof queryKey
  >({
    enabled: !!username,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getUserByName(username, config)
    },
  })
}

/**
 * @summary Get user by user name
 * {@link /user/:username}
 */
export function useGetUserByNameSuspense<
  TData = GetUserByNameQueryResponseType,
  TQueryData = GetUserByNameQueryResponseType,
  TQueryKey extends QueryKey = GetUserByNameSuspenseQueryKey,
>(
  username: GetUserByNamePathParamsType['username'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetUserByNameQueryResponseType, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserByNameSuspenseQueryKey(username)

  const query = useSuspenseQuery({
    ...(getUserByNameSuspenseQueryOptions(username, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}