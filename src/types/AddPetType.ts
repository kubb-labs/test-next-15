import type { PetType } from './PetType'

/**
 * @description Invalid input
 */
export type AddPet405Type = unknown

/**
 * @description Pet object that needs to be added to the store
 */
export type AddPetMutationRequestType = PetType

export type AddPetMutationResponseType = unknown

export type AddPetTypeMutation = {
  Response: any
  Request: AddPetMutationRequestType
  Errors: AddPet405Type
}