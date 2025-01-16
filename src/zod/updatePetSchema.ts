import type { UpdatePet400Type, UpdatePet404Type, UpdatePet405Type, UpdatePetMutationRequestType, UpdatePetMutationResponseType } from '../types/UpdatePetType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { petSchema } from './petSchema'
import { z } from 'zod'

/**
 * @description Invalid ID supplied
 */
export const updatePet400Schema = z.unknown() as unknown as ToZod<UpdatePet400Type>

/**
 * @description Pet not found
 */
export const updatePet404Schema = z.unknown() as unknown as ToZod<UpdatePet404Type>

/**
 * @description Validation exception
 */
export const updatePet405Schema = z.unknown() as unknown as ToZod<UpdatePet405Type>

/**
 * @description Pet object that needs to be added to the store
 */
export const updatePetMutationRequestSchema = z.lazy(() => petSchema) as unknown as ToZod<UpdatePetMutationRequestType>

export const updatePetMutationResponseSchema = z.unknown() as unknown as ToZod<UpdatePetMutationResponseType>