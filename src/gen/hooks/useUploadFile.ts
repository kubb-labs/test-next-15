import client from '@ssil/client/socio'
import type { UploadFileMutationRequestType, UploadFileMutationResponseType, UploadFilePathParamsType } from '../types/UploadFileType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

export const uploadFileMutationKey = () => [{ url: '/pet/{petId}/uploadImage' }] as const

export type UploadFileMutationKey = ReturnType<typeof uploadFileMutationKey>

/**
 * @summary uploads an image
 * {@link /pet/:petId/uploadImage}
 */
async function uploadFile(
  petId: UploadFilePathParamsType['petId'],
  data?: UploadFileMutationRequestType,
  config: Partial<RequestConfig<UploadFileMutationRequestType>> = {},
) {
  const formData = new FormData()
  if (data) {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof typeof data]
      if (typeof key === 'string' && (typeof value === 'string' || value instanceof Blob)) {
        formData.append(key, value)
      }
    })
  }
  const res = await client<UploadFileMutationResponseType, ResponseErrorConfig<Error>, UploadFileMutationRequestType>({
    method: 'POST',
    url: `/pet/${petId}/uploadImage`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
    ...config,
  })
  return res.data
}

/**
 * @summary uploads an image
 * {@link /pet/:petId/uploadImage}
 */
export function useUploadFile(
  options: {
    mutation?: UseMutationOptions<
      UploadFileMutationResponseType,
      ResponseErrorConfig<Error>,
      { petId: UploadFilePathParamsType['petId']; data?: UploadFileMutationRequestType }
    >
    client?: Partial<RequestConfig<UploadFileMutationRequestType>>
  } = {},
) {
  const { mutation: mutationOptions, client: config = {} } = options ?? {}
  const mutationKey = mutationOptions?.mutationKey ?? uploadFileMutationKey()

  return useMutation<
    UploadFileMutationResponseType,
    ResponseErrorConfig<Error>,
    { petId: UploadFilePathParamsType['petId']; data?: UploadFileMutationRequestType }
  >({
    mutationFn: async ({ petId, data }) => {
      return uploadFile(petId, data, config)
    },
    mutationKey,
    ...mutationOptions,
  })
}