import type { UserType } from './UserType'

export type GetUserByNamePathParamsType = {
  /**
   * @description The name that needs to be fetched. Use user1 for testing.
   * @type string
   */
  username: string
}

/**
 * @description successful operation
 */
export type GetUserByName200Type = UserType

/**
 * @description Invalid username supplied
 */
export type GetUserByName400Type = unknown

/**
 * @description User not found
 */
export type GetUserByName404Type = unknown

export type GetUserByNameQueryResponseType = GetUserByName200Type

export type GetUserByNameTypeQuery = {
  Response: GetUserByName200Type
  PathParams: GetUserByNamePathParamsType
  Errors: GetUserByName400Type | GetUserByName404Type
}