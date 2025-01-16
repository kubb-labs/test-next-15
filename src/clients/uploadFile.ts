import client from '@ssil/client/socio'
import type { UploadFileMutationRequestType, UploadFileMutationResponseType, UploadFilePathParamsType } from '../types/UploadFileType'
import type { RequestConfig, ResponseErrorConfig } from '@ssil/client/socio'

export function getUploadFileUrl({ petId }: { petId: UploadFilePathParamsType['petId'] }) {
  return `/pet/${petId}/uploadImage` as const
}

/**
 * @summary uploads an image
 * {@link /pet/:petId/uploadImage}
 */
export async function uploadFile(
  { petId }: { petId: UploadFilePathParamsType['petId'] },
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
    url: getUploadFileUrl({ petId }).toString(),
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
    ...config,
  })
  return res.data
}