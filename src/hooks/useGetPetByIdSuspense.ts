import client from '@ssil/client/socio'
import type { GetPetByIdQueryResponseType, GetPetByIdPathParamsType, GetPetById400Type, GetPetById404Type } from '../types/GetPetByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, UseSuspenseQueryOptions, UseSuspenseQueryResult } from '@tanstack/react-query'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

export const getPetByIdSuspenseQueryKey = (petId: GetPetByIdPathParamsType['petId']) => [{ url: '/pet/:petId', params: { petId: petId } }] as const

export type GetPetByIdSuspenseQueryKey = ReturnType<typeof getPetByIdSuspenseQueryKey>

/**
 * @description Returns a single pet
 * @summary Find pet by ID
 * {@link /pet/:petId}
 */
async function getPetById(petId: GetPetByIdPathParamsType['petId'], config: Partial<RequestConfig> = {}) {
  const res = await client<GetPetByIdQueryResponseType, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>, unknown>({
    method: 'GET',
    url: `/pet/${petId}`,
    ...config,
  })
  return res.data
}

export function getPetByIdSuspenseQueryOptions(petId: GetPetByIdPathParamsType['petId'], config: Partial<RequestConfig> = {}) {
  const queryKey = getPetByIdSuspenseQueryKey(petId)
  return queryOptions<GetPetByIdQueryResponseType, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>, GetPetByIdQueryResponseType, typeof queryKey>({
    enabled: !!petId,
    queryKey,
    queryFn: async ({ signal }) => {
      config.signal = signal
      return getPetById(petId, config)
    },
  })
}

/**
 * @description Returns a single pet
 * @summary Find pet by ID
 * {@link /pet/:petId}
 */
export function useGetPetByIdSuspense<
  TData = GetPetByIdQueryResponseType,
  TQueryData = GetPetByIdQueryResponseType,
  TQueryKey extends QueryKey = GetPetByIdSuspenseQueryKey,
>(
  petId: GetPetByIdPathParamsType['petId'],
  options: {
    query?: Partial<UseSuspenseQueryOptions<GetPetByIdQueryResponseType, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>, TData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPetByIdSuspenseQueryKey(petId)

  const query = useSuspenseQuery({
    ...(getPetByIdSuspenseQueryOptions(petId, config) as unknown as UseSuspenseQueryOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<UseSuspenseQueryOptions, 'queryKey'>),
  }) as UseSuspenseQueryResult<TData, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}