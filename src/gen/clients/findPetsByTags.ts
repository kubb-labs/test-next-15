import client from '@ssil/client/socio'
import type { FindPetsByTagsQueryResponseType, FindPetsByTagsQueryParamsType, FindPetsByTags400Type } from '../types/FindPetsByTagsType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getFindPetsByTagsUrl() {
  return `/pet/findByTags` as const
}

/**
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 * @summary Finds Pets by tags
 * {@link /pet/findByTags}
 * @deprecated
 */
export async function findPetsByTags(params: FindPetsByTagsQueryParamsType, config: Partial<RequestConfig> = {}) {
  const res = await client<FindPetsByTagsQueryResponseType, ResponseErrorConfig<FindPetsByTags400Type>, unknown>({
    method: 'GET',
    url: getFindPetsByTagsUrl().toString(),
    params,
    ...config,
  })
  return res.data
}