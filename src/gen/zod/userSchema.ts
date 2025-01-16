import type { UserType } from '../types/UserType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const userSchema = z.object({
  id: z.coerce.number().int().optional(),
  username: z.coerce.string().optional(),
  firstName: z.coerce.string().optional(),
  lastName: z.coerce.string().optional(),
  email: z.coerce.string().optional(),
  password: z.coerce.string().optional(),
  phone: z.coerce.string().optional(),
  userStatus: z.coerce.number().int().describe('User Status').optional(),
}) as unknown as ToZod<UserType>