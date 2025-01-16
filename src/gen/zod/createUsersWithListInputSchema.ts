import type {
  CreateUsersWithListInputErrorType,
  CreateUsersWithListInputMutationRequestType,
  CreateUsersWithListInputMutationResponseType,
} from '../types/CreateUsersWithListInputType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const createUsersWithListInputErrorSchema = z.unknown() as unknown as ToZod<CreateUsersWithListInputErrorType>

/**
 * @description List of user object
 */
export const createUsersWithListInputMutationRequestSchema = z.array(z.lazy(() => userSchema)) as unknown as ToZod<CreateUsersWithListInputMutationRequestType>

export const createUsersWithListInputMutationResponseSchema = z.unknown() as unknown as ToZod<CreateUsersWithListInputMutationResponseType>