import client from '@ssil/client/socio'
import type {
  DeletePetMutationResponseType,
  DeletePetPathParamsType,
  DeletePetHeaderParamsType,
  DeletePet400Type,
  DeletePet404Type,
} from '../types/DeletePetType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getDeletePetUrl({ petId }: { petId: DeletePetPathParamsType['petId'] }) {
  return `/pet/${petId}` as const
}

/**
 * @summary Deletes a pet
 * {@link /pet/:petId}
 */
export async function deletePet(
  { petId }: { petId: DeletePetPathParamsType['petId'] },
  headers?: DeletePetHeaderParamsType,
  config: Partial<RequestConfig> = {},
) {
  const res = await client<DeletePetMutationResponseType, ResponseErrorConfig<DeletePet400Type | DeletePet404Type>, unknown>({
    method: 'DELETE',
    url: getDeletePetUrl({ petId }).toString(),
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res.data
}