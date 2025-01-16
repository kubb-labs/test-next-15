import client from '@ssil/client/socio'
import type { GetPetByIdQueryResponseType, GetPetByIdPathParamsType, GetPetById400Type, GetPetById404Type } from '../types/GetPetByIdType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { QueryKey, QueryObserverOptions, UseQueryResult } from '@tanstack/react-query'
import { queryOptions, useQuery } from '@tanstack/react-query'

export const getPetByIdQueryKey = (petId: GetPetByIdPathParamsType['petId']) => [{ url: '/pet/:petId', params: { petId: petId } }] as const

export type GetPetByIdQueryKey = ReturnType<typeof getPetByIdQueryKey>

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

export function getPetByIdQueryOptions(petId: GetPetByIdPathParamsType['petId'], config: Partial<RequestConfig> = {}) {
  const queryKey = getPetByIdQueryKey(petId)
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
export function useGetPetById<TData = GetPetByIdQueryResponseType, TQueryData = GetPetByIdQueryResponseType, TQueryKey extends QueryKey = GetPetByIdQueryKey>(
  petId: GetPetByIdPathParamsType['petId'],
  options: {
    query?: Partial<QueryObserverOptions<GetPetByIdQueryResponseType, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>, TData, TQueryData, TQueryKey>>
    client?: Partial<RequestConfig>
  } = {},
) {
  const { query: queryOptions, client: config = {} } = options ?? {}
  const queryKey = queryOptions?.queryKey ?? getPetByIdQueryKey(petId)

  const query = useQuery({
    ...(getPetByIdQueryOptions(petId, config) as unknown as QueryObserverOptions),
    queryKey,
    ...(queryOptions as unknown as Omit<QueryObserverOptions, 'queryKey'>),
  }) as UseQueryResult<TData, ResponseErrorConfig<GetPetById400Type | GetPetById404Type>> & { queryKey: TQueryKey }

  query.queryKey = queryKey as TQueryKey

  return query
}