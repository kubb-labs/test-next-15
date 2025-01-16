import type {
  DeletePetPathParamsType,
  DeletePetHeaderParamsType,
  DeletePet400Type,
  DeletePet404Type,
  DeletePetMutationResponseType,
} from '../types/DeletePetType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deletePetPathParamsSchema = z.object({
  petId: z.coerce.number().int().describe('Pet id to delete'),
}) as unknown as ToZod<DeletePetPathParamsType>

export const deletePetHeaderParamsSchema = z
  .object({
    api_key: z.coerce.string().optional(),
  })
  .optional() as unknown as ToZod<DeletePetHeaderParamsType>

/**
 * @description Invalid ID supplied
 */
export const deletePet400Schema = z.unknown() as unknown as ToZod<DeletePet400Type>

/**
 * @description Pet not found
 */
export const deletePet404Schema = z.unknown() as unknown as ToZod<DeletePet404Type>

export const deletePetMutationResponseSchema = z.unknown() as unknown as ToZod<DeletePetMutationResponseType>