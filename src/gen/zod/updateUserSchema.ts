import type {
  UpdateUserPathParamsType,
  UpdateUser400Type,
  UpdateUser404Type,
  UpdateUserMutationRequestType,
  UpdateUserMutationResponseType,
} from '../types/UpdateUserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

export const updateUserPathParamsSchema = z.object({
  username: z.coerce.string().describe('name that need to be updated'),
}) as unknown as ToZod<UpdateUserPathParamsType>

/**
 * @description Invalid user supplied
 */
export const updateUser400Schema = z.unknown() as unknown as ToZod<UpdateUser400Type>

/**
 * @description User not found
 */
export const updateUser404Schema = z.unknown() as unknown as ToZod<UpdateUser404Type>

/**
 * @description Updated user object
 */
export const updateUserMutationRequestSchema = z.lazy(() => userSchema) as unknown as ToZod<UpdateUserMutationRequestType>

export const updateUserMutationResponseSchema = z.unknown() as unknown as ToZod<UpdateUserMutationResponseType>