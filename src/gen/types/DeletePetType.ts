export type DeletePetPathParamsType = {
  /**
   * @description Pet id to delete
   * @type integer, int64
   */
  petId: number
}

export type DeletePetHeaderParamsType = {
  /**
   * @type string | undefined
   */
  api_key?: string
}

/**
 * @description Invalid ID supplied
 */
export type DeletePet400Type = unknown

/**
 * @description Pet not found
 */
export type DeletePet404Type = unknown

export type DeletePetMutationResponseType = unknown

export type DeletePetTypeMutation = {
  Response: any
  PathParams: DeletePetPathParamsType
  HeaderParams: DeletePetHeaderParamsType
  Errors: DeletePet400Type | DeletePet404Type
}