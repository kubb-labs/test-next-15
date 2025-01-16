import type {
  UpdatePetWithFormPathParamsType,
  UpdatePetWithForm405Type,
  UpdatePetWithFormMutationRequestType,
  UpdatePetWithFormMutationResponseType,
} from '../types/UpdatePetWithFormType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const updatePetWithFormPathParamsSchema = z.object({
  petId: z.coerce.number().int().describe('ID of pet that needs to be updated'),
}) as unknown as ToZod<UpdatePetWithFormPathParamsType>

/**
 * @description Invalid input
 */
export const updatePetWithForm405Schema = z.unknown() as unknown as ToZod<UpdatePetWithForm405Type>

export const updatePetWithFormMutationRequestSchema = z.object({
  name: z.coerce.string().describe('Updated name of the pet').optional(),
  status: z.coerce.string().describe('Updated status of the pet').optional(),
}) as unknown as ToZod<UpdatePetWithFormMutationRequestType>

export const updatePetWithFormMutationResponseSchema = z.unknown() as unknown as ToZod<UpdatePetWithFormMutationResponseType>