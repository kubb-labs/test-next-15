import client from '@ssil/client/socio'
import type { LogoutUserQueryResponseType } from '../types/LogoutUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const logoutUserSuspenseQueryKey = () => [{ url: '/user/logout' }] as const

export type LogoutUserSuspenseQueryKey = ReturnType<typeof logoutUserSuspenseQueryKey>

/**
 * @summary Logs out current logged in user session
 * {@link /user/logout}
 */
async function logoutUser(config: Partial<RequestConfig> = {}) {
  const res = await client<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: `/user/logout`, ...config })
  return res.data
}

export function logoutUserSuspenseQueryOptions(config: Partial<RequestConfig> = {}) {
  const queryKey = logoutUserSuspenseQueryKey()
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
export function useLogoutUserSuspense<
  TData = LogoutUserQueryResponseType,
  TQueryData = LogoutUserQueryResponseType,
  TQueryKey extends QueryKey = LogoutUserSuspenseQueryKey,
>(
  options: {
    query?: Partial<UseSuspenseQueryOptions<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? logoutUserSuspenseQueryKey()

  const query = useSuspenseQuery({
    ...(logoutUserSuspenseQueryOptions(config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<Error>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}