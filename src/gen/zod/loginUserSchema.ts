import type { LoginUserQueryParamsType, LoginUser200Type, LoginUser400Type, LoginUserQueryResponseType } from '../types/LoginUserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const loginUserQueryParamsSchema = z.object({
  username: z.coerce.string().describe('The user name for login'),
  password: z.coerce.string().describe('The password for login in clear text'),
}) as unknown as ToZod<LoginUserQueryParamsType>

/**
 * @description successful operation
 */
export const loginUser200Schema = z.coerce.string() as unknown as ToZod<LoginUser200Type>

/**
 * @description Invalid username/password supplied
 */
export const loginUser400Schema = z.unknown() as unknown as ToZod<LoginUser400Type>

export const loginUserQueryResponseSchema = z.lazy(() => loginUser200Schema) as unknown as ToZod<LoginUserQueryResponseType>