import type { PetType } from './PetType'

/**
 * @description Invalid ID supplied
 */
export type UpdatePet400Type = unknown

/**
 * @description Pet not found
 */
export type UpdatePet404Type = unknown

/**
 * @description Validation exception
 */
export type UpdatePet405Type = unknown

/**
 * @description Pet object that needs to be added to the store
 */
export type UpdatePetMutationRequestType = PetType

export type UpdatePetMutationResponseType = unknown

export type UpdatePetTypeMutation = {
  Response: any
  Request: UpdatePetMutationRequestType
  Errors: UpdatePet400Type | UpdatePet404Type | UpdatePet405Type
}