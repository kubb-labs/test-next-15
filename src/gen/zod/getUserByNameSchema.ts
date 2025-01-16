import type {
  GetUserByNamePathParamsType,
  GetUserByName200Type,
  GetUserByName400Type,
  GetUserByName404Type,
  GetUserByNameQueryResponseType,
} from '../types/GetUserByNameType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

export const getUserByNamePathParamsSchema = z.object({
  username: z.coerce.string().describe('The name that needs to be fetched. Use user1 for testing. '),
}) as unknown as ToZod<GetUserByNamePathParamsType>

/**
 * @description successful operation
 */
export const getUserByName200Schema = z.lazy(() => userSchema) as unknown as ToZod<GetUserByName200Type>

/**
 * @description Invalid username supplied
 */
export const getUserByName400Schema = z.unknown() as unknown as ToZod<GetUserByName400Type>

/**
 * @description User not found
 */
export const getUserByName404Schema = z.unknown() as unknown as ToZod<GetUserByName404Type>

export const getUserByNameQueryResponseSchema = z.lazy(() => getUserByName200Schema) as unknown as ToZod<GetUserByNameQueryResponseType>