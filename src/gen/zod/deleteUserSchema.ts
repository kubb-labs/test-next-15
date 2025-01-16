import type { DeleteUserPathParamsType, DeleteUser400Type, DeleteUser404Type, DeleteUserMutationResponseType } from '../types/DeleteUserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deleteUserPathParamsSchema = z.object({
  username: z.coerce.string().describe('The name that needs to be deleted'),
}) as unknown as ToZod<DeleteUserPathParamsType>

/**
 * @description Invalid username supplied
 */
export const deleteUser400Schema = z.unknown() as unknown as ToZod<DeleteUser400Type>

/**
 * @description User not found
 */
export const deleteUser404Schema = z.unknown() as unknown as ToZod<DeleteUser404Type>

export const deleteUserMutationResponseSchema = z.unknown() as unknown as ToZod<DeleteUserMutationResponseType>