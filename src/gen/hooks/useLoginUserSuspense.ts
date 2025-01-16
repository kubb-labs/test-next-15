import client from '@ssil/client/socio'
import type { LoginUserQueryResponseType, LoginUserQueryParamsType, LoginUser400Type } from '../types/LoginUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const loginUserSuspenseQueryKey = (params: LoginUserQueryParamsType) => [{ url: '/user/login' }, ...(params ? [params] : [])] as const

export type LoginUserSuspenseQueryKey = ReturnType<typeof loginUserSuspenseQueryKey>

/**
 * @summary Logs user into the system
 * {@link /user/login}
 */
async function loginUser(params: LoginUserQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, unknown>({ method: 'GET', url: `/user/login`, params, ...config })
  return res.data
}

export function loginUserSuspenseQueryOptions(params: LoginUserQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = loginUserSuspenseQueryKey(params)
  return queryOptions<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, LoginUserQueryResponseType, typeof queryKey>({
    enabled: !!params,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return loginUser(params, config)
    },
  })
}

/**
 * @summary Logs user into the system
 * {@link /user/login}
 */
export function useLoginUserSuspense<
  TData = LoginUserQueryResponseType,
  TQueryData = LoginUserQueryResponseType,
  TQueryKey extends QueryKey = LoginUserSuspenseQueryKey,
>(
  params: LoginUserQueryParamsType,
  options: {
    query?: Partial<UseSuspenseQueryOptions<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? loginUserSuspenseQueryKey(params)

  const query = useSuspenseQuery({
    ...(loginUserSuspenseQueryOptions(params, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<LoginUser400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}