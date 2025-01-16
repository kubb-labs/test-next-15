import type { UploadFilePathParamsType, UploadFile200Type, UploadFileMutationRequestType, UploadFileMutationResponseType } from '../types/UploadFileType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { apiResponseSchema } from './apiResponseSchema'
import { z } from 'zod'

export const uploadFilePathParamsSchema = z.object({
  petId: z.coerce.number().int().describe('ID of pet to update'),
}) as unknown as ToZod<UploadFilePathParamsType>

/**
 * @description successful operation
 */
export const uploadFile200Schema = z.lazy(() => apiResponseSchema) as unknown as ToZod<UploadFile200Type>

export const uploadFileMutationRequestSchema = z.object({
  additionalMetadata: z.coerce.string().describe('Additional data to pass to server').optional(),
  file: z.instanceof(File).describe('file to upload').optional(),
}) as unknown as ToZod<UploadFileMutationRequestType>

export const uploadFileMutationResponseSchema = z.lazy(() => uploadFile200Schema) as unknown as ToZod<UploadFileMutationResponseType>