import client from '@ssil/client/socio'
import type { LogoutUserQueryResponseType } from '../types/LogoutUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const logoutUserQueryKey = () => [{ url: '/user/logout' }] as const

export type LogoutUserQueryKey = ReturnType<typeof logoutUserQueryKey>

/**
 * @summary Logs out current logged in user session
 * {@link /user/logout}
 */
async function logoutUser(config: Partial<RequestConfig> = {}) {
  const res = await client<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/user/logout`, ...config })
  return res.data
}

export function logoutUserQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = logoutUserQueryKey()
  return queryOptions<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, LogoutUserQueryResponseType, typeof queryKey>({
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return logoutUser(config)
    },
  })
}

/**
 * @summary Logs out current logged in user session
 * {@link /user/logout}
 */
export function useLogoutUser<TData = LogoutUserQueryResponseType, TQueryData = LogoutUserQueryResponseType, TQueryKey extends QueryKey = LogoutUserQueryKey>(
  options: {
    query?: Partial<QueryObserverOptions<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logoutUserQueryKey()

  const query = useQuery({
    ...(logoutUserQueryOptions(config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}