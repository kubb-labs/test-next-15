import type { UserType } from './UserType'

export type UpdateUserPathParamsType = {
  /**
   * @description name that need to be updated
   * @type string
   */
  username: string
}

/**
 * @description Invalid user supplied
 */
export type UpdateUser400Type = unknown

/**
 * @description User not found
 */
export type UpdateUser404Type = unknown

/**
 * @description Updated user object
 */
export type UpdateUserMutationRequestType = UserType

export type UpdateUserMutationResponseType = unknown

export type UpdateUserTypeMutation = {
  Response: any
  Request: UpdateUserMutationRequestType
  PathParams: UpdateUserPathParamsType
  Errors: UpdateUser400Type | UpdateUser404Type
}