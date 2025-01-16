import client from '@ssil/client/socio'
import type { GetUserByNameQueryResponseType, GetUserByNamePathParamsType, GetUserByName400Type, GetUserByName404Type } from '../types/GetUserByNameType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getUserByNameQueryKey = (username: GetUserByNamePathParamsType['username']) =>
  [{ url: '/user/:username', params: { username: username } }] as const

export type GetUserByNameQueryKey = ReturnType<typeof getUserByNameQueryKey>

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

export function getUserByNameQueryOptions(username: GetUserByNamePathParamsType['username'], config: Partial<RequestConfig> = {}) {
  const queryKey = getUserByNameQueryKey(username)
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
export function useGetUserByName<
  TData = GetUserByNameQueryResponseType,
  TQueryData = GetUserByNameQueryResponseType,
  TQueryKey extends QueryKey = GetUserByNameQueryKey,
>(
  username: GetUserByNamePathParamsType['username'],
  options: {
    query?: Partial<
      QueryObserverOptions<GetUserByNameQueryResponseType, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>, TData, TQueryData, TQueryKey>
    >
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getUserByNameQueryKey(username)

  const query = useQuery({
    ...(getUserByNameQueryOptions(username, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}