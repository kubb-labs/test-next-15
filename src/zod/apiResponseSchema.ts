import type { ApiResponseType } from '../types/ApiResponseType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const apiResponseSchema = z.object({
  code: z.coerce.number().int().optional(),
  type: z.coerce.string().optional(),
  message: z.coerce.string().optional(),
}) as unknown as ToZod<ApiResponseType>