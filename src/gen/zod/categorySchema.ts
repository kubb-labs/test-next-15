import type { CategoryType } from '../types/CategoryType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const categorySchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.coerce.string().optional(),
}) as unknown as ToZod<CategoryType>