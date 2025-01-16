import type { UserType } from './UserType'

/**
 * @description successful operation
 */
export type CreateUsersWithListInputErrorType = unknown

/**
 * @description List of user object
 */
export type CreateUsersWithListInputMutationRequestType = UserType[]

export type CreateUsersWithListInputMutationResponseType = unknown

export type CreateUsersWithListInputTypeMutation = {
  Response: any
  Request: CreateUsersWithListInputMutationRequestType
  Errors: any
}