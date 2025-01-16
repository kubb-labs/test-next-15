import type { UserType } from './UserType'

/**
 * @description successful operation
 */
export type CreateUserErrorType = unknown

/**
 * @description Created user object
 */
export type CreateUserMutationRequestType = UserType

export type CreateUserMutationResponseType = unknown

export type CreateUserTypeMutation = {
  Response: any
  Request: CreateUserMutationRequestType
  Errors: any
}