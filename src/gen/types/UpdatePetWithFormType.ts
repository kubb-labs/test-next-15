export type UpdatePetWithFormPathParamsType = {
  /**
   * @description ID of pet that needs to be updated
   * @type integer, int64
   */
  petId: number
}

/**
 * @description Invalid input
 */
export type UpdatePetWithForm405Type = unknown

export type UpdatePetWithFormMutationRequestType = {
  /**
   * @description Updated name of the pet
   * @type string | undefined
   */
  name?: string
  /**
   * @description Updated status of the pet
   * @type string | undefined
   */
  status?: string
}

export type UpdatePetWithFormMutationResponseType = unknown

export type UpdatePetWithFormTypeMutation = {
  Response: any
  Request: UpdatePetWithFormMutationRequestType
  PathParams: UpdatePetWithFormPathParamsType
  Errors: UpdatePetWithForm405Type
}