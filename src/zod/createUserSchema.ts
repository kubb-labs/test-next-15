import type { CreateUserErrorType, CreateUserMutationRequestType, CreateUserMutationResponseType } from '../types/CreateUserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const createUserErrorSchema = z.unknown() as unknown as ToZod<CreateUserErrorType>

/**
 * @description Created user object
 */
export const createUserMutationRequestSchema = z.lazy(() => userSchema) as unknown as ToZod<CreateUserMutationRequestType>

export const createUserMutationResponseSchema = z.unknown() as unknown as ToZod<CreateUserMutationResponseType>