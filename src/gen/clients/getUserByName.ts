import client from '@ssil/client/socio'
import type { GetUserByNameQueryResponseType, GetUserByNamePathParamsType, GetUserByName400Type, GetUserByName404Type } from '../types/GetUserByNameType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getGetUserByNameUrl({ username }: { username: GetUserByNamePathParamsType['username'] }) {
  return `/user/${username}` as const
}

/**
 * @summary Get user by user name
 * {@link /user/:username}
 */
export async function getUserByName({ username }: { username: GetUserByNamePathParamsType['username'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetUserByNameQueryResponseType, ResponseErrorConfig<GetUserByName400Type | GetUserByName404Type>, unknown>({
    method: 'GET',
    url: getGetUserByNameUrl({ username }).toString(),
    ...config,
  })
  return res.data
}