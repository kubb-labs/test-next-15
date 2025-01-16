import type { PetType } from './PetType'

export type GetPetByIdPathParamsType = {
  /**
   * @description ID of pet to return
   * @type integer, int64
   */
  petId: number
}

/**
 * @description successful operation
 */
export type GetPetById200Type = PetType

/**
 * @description Invalid ID supplied
 */
export type GetPetById400Type = unknown

/**
 * @description Pet not found
 */
export type GetPetById404Type = unknown

export type GetPetByIdQueryResponseType = GetPetById200Type

export type GetPetByIdTypeQuery = {
  Response: GetPetById200Type
  PathParams: GetPetByIdPathParamsType
  Errors: GetPetById400Type | GetPetById404Type
}