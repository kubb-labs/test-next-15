import client from '@ssil/client/socio'
import type {
  UpdatePetWithFormMutationRequestType,
  UpdatePetWithFormMutationResponseType,
  UpdatePetWithFormPathParamsType,
  UpdatePetWithForm405Type,
} from '../types/UpdatePetWithFormType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getUpdatePetWithFormUrl({ petId }: { petId: UpdatePetWithFormPathParamsType['petId'] }) {
  return `/pet/${petId}` as const
}

/**
 * @summary Updates a pet in the store with form data
 * {@link /pet/:petId}
 */
export async function updatePetWithForm(
  { petId }: { petId: UpdatePetWithFormPathParamsType['petId'] },
  data?: UpdatePetWithFormMutationRequestType,
  config: Partial<RequestConfig<UpdatePetWithFormMutationRequestType>> = {},
) {
  const res = await client<UpdatePetWithFormMutationResponseType, ResponseErrorConfig<UpdatePetWithForm405Type>, UpdatePetWithFormMutationRequestType>({
    method: 'POST',
    url: getUpdatePetWithFormUrl({ petId }).toString(),
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...config.headers },
    ...config,
  })
  return res.data
}