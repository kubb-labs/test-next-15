export type DeleteUserPathParamsType = {
  /**
   * @description The name that needs to be deleted
   * @type string
   */
  username: string
}

/**
 * @description Invalid username supplied
 */
export type DeleteUser400Type = unknown

/**
 * @description User not found
 */
export type DeleteUser404Type = unknown

export type DeleteUserMutationResponseType = unknown

export type DeleteUserTypeMutation = {
  Response: any
  PathParams: DeleteUserPathParamsType
  Errors: DeleteUser400Type | DeleteUser404Type
}