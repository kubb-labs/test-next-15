import type { UserArrayType } from '../types/UserArrayType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { userSchema } from './userSchema'
import { z } from 'zod'

export const userArraySchema = z.array(z.lazy(() => userSchema)) as unknown as ToZod<UserArrayType>