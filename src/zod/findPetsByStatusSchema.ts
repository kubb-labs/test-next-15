import type {
  FindPetsByStatusQueryParamsType,
  FindPetsByStatus200Type,
  FindPetsByStatus400Type,
  FindPetsByStatusQueryResponseType,
} from '../types/FindPetsByStatusType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { petSchema } from './petSchema'
import { z } from 'zod'

export const findPetsByStatusQueryParamsSchema = z.object({
  status: z.array(z.enum(['available', 'pending', 'sold']).default('available')).describe('Status values that need to be considered for filter'),
}) as unknown as ToZod<FindPetsByStatusQueryParamsType>

/**
 * @description successful operation
 */
export const findPetsByStatus200Schema = z.array(z.lazy(() => petSchema)) as unknown as ToZod<FindPetsByStatus200Type>

/**
 * @description Invalid status value
 */
export const findPetsByStatus400Schema = z.unknown() as unknown as ToZod<FindPetsByStatus400Type>

export const findPetsByStatusQueryResponseSchema = z.lazy(() => findPetsByStatus200Schema) as unknown as ToZod<FindPetsByStatusQueryResponseType>