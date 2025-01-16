import client from '@ssil/client/socio'
import type { LoginUserQueryResponseType, LoginUserQueryParamsType, LoginUser400Type } from '../types/LoginUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getLoginUserUrl() {
  return `/user/login` as const
}

/**
 * @summary Logs user into the system
 * {@link /user/login}
 */
export async function loginUser(params: LoginUserQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<LoginUserQueryResponseType, ResponseErrorConfig<LoginUser400Type>, unknown>({
    method: 'GET',
    url: getLoginUserUrl().toString(),
    params,
    ...config,
  })
  return res.data
}