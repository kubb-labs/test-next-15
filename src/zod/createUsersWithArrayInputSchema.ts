import type {
  CreateUsersWithArrayInputErrorType,
  CreateUsersWithArrayInputMutationRequestType,
  CreateUsersWithArrayInputMutationResponseType,
} from '../types/CreateUsersWithArrayInputType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const createUsersWithArrayInputErrorSchema = z.unknown() as unknown as ToZod<CreateUsersWithArrayInputErrorType>

/**
 * @description List of user object
 */
export const createUsersWithArrayInputMutationRequestSchema = z.array(
  z.lazy(() => userSchema),
) as unknown as ToZod<CreateUsersWithArrayInputMutationRequestType>

export const createUsersWithArrayInputMutationResponseSchema = z.unknown() as unknown as ToZod<CreateUsersWithArrayInputMutationResponseType>