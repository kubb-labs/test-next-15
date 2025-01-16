import client from '@ssil/client/socio'
import type { LogoutUserQueryResponseType } from '../types/LogoutUserType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getLogoutUserUrl() {
  return `/user/logout` as const
}

/**
 * @summary Logs out current logged in user session
 * {@link /user/logout}
 */
export async function logoutUser(config: Partial<RequestConfig> = {}) {
  const res = await client<LogoutUserQueryResponseType, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: getLogoutUserUrl().toString(), ...config })
  return res.data
}