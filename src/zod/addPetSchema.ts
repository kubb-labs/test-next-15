import type { AddPet405Type, AddPetMutationRequestType, AddPetMutationResponseType } from '../types/AddPetType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { petSchema } from './petSchema'
import { z } from 'zod'

/**
 * @description Invalid input
 */
export const addPet405Schema = z.unknown() as unknown as ToZod<AddPet405Type>

/**
 * @description Pet object that needs to be added to the store
 */
export const addPetMutationRequestSchema = z.lazy(() => petSchema) as unknown as ToZod<AddPetMutationRequestType>

export const addPetMutationResponseSchema = z.unknown() as unknown as ToZod<AddPetMutationResponseType>