export type LoginUserQueryParamsType = {
  /**
   * @description The user name for login
   * @type string
   */
  username: string
  /**
   * @description The password for login in clear text
   * @type string
   */
  password: string
}

/**
 * @description successful operation
 */
export type LoginUser200Type = string

/**
 * @description Invalid username/password supplied
 */
export type LoginUser400Type = unknown

export type LoginUserQueryResponseType = LoginUser200Type

export type LoginUserTypeQuery = {
  Response: LoginUser200Type
  QueryParams: LoginUserQueryParamsType
  Errors: LoginUser400Type
}