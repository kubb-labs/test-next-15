import type { LogoutUserErrorType, LogoutUserQueryResponseType } from '../types/LogoutUserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const logoutUserErrorSchema = z.unknown() as unknown as ToZod<LogoutUserErrorType>

export const logoutUserQueryResponseSchema = z.unknown() as unknown as ToZod<LogoutUserQueryResponseType>