import type { ApiResponseType } from './ApiResponseType'

export type UploadFilePathParamsType = {
  /**
   * @description ID of pet to update
   * @type integer, int64
   */
  petId: number
}

/**
 * @description successful operation
 */
export type UploadFile200Type = ApiResponseType

export type UploadFileMutationRequestType = {
  /**
   * @description Additional data to pass to server
   * @type string | undefined
   */
  additionalMetadata?: string
  /**
   * @description file to upload
   * @type string | undefined, binary
   */
  file?: Blob
}

export type UploadFileMutationResponseType = UploadFile200Type

export type UploadFileTypeMutation = {
  Response: UploadFile200Type
  Request: UploadFileMutationRequestType
  PathParams: UploadFilePathParamsType
  Errors: any
}