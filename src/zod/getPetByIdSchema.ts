import type { GetPetByIdPathParamsType, GetPetById200Type, GetPetById400Type, GetPetById404Type, GetPetByIdQueryResponseType } from '../types/GetPetByIdType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { petSchema } from './petSchema'
import { z } from 'zod'

export const getPetByIdPathParamsSchema = z.object({
  petId: z.coerce.number().int().describe('ID of pet to return'),
}) as unknown as ToZod<GetPetByIdPathParamsType>

/**
 * @description successful operation
 */
export const getPetById200Schema = z.lazy(() => petSchema) as unknown as ToZod<GetPetById200Type>

/**
 * @description Invalid ID supplied
 */
export const getPetById400Schema = z.unknown() as unknown as ToZod<GetPetById400Type>

/**
 * @description Pet not found
 */
export const getPetById404Schema = z.unknown() as unknown as ToZod<GetPetById404Type>

export const getPetByIdQueryResponseSchema = z.lazy(() => getPetById200Schema) as unknown as ToZod<GetPetByIdQueryResponseType>