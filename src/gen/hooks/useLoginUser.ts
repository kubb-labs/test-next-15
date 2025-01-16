import client from '@ssil/client/socio'
import type { LoginUserQueryResponseType, LoginUserQueryParamsType, LoginUser400Type } from '../types/LoginUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const loginUserQueryKey = (params: LoginUserQueryParamsType) => [{ url: '/user/login' }, ...(params ? [params] : [])] as const

export type LoginUserQueryKey = ReturnType<typeof loginUserQueryKey>

/**
 * @summary Logs user into the system
 * {@link /user/login}
 */
async function loginUser(params: LoginUserQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, unknown>({ method: 'GET', url: `/user/login`, params, ...config })
  return res.data
}

export function loginUserQueryOptions(params: LoginUserQueryParamsType, config: Partial<RequestConfig> = {}) {
  const queryKey = loginUserQueryKey(params)
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
export function useLoginUser<TData = LoginUserQueryResponseType, TQueryData = LoginUserQueryResponseType, TQueryKey extends QueryKey = LoginUserQueryKey>(
  params: LoginUserQueryParamsType,
  options: {
    query?: Partial<QueryObserverOptions<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? loginUserQueryKey(params)

  const query = useQuery({
    ...(loginUserQueryOptions(params, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<LoginUser400Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}