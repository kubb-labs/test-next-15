import type { PetType } from '../types/PetType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { categorySchema } from './categorySchema'
import { tagSchema } from './tagSchema'
import { z } from 'zod'

export const petSchema = z.object({
  id: z.coerce.number().int().optional(),
  category: z.lazy(() => categorySchema).optional(),
  name: z.coerce.string(),
  photoUrls: z.array(z.coerce.string()),
  tags: z.array(z.lazy(() => tagSchema)).optional(),
  status: z.enum(['available', 'pending', 'sold']).describe('pet status in the store').optional(),
}) as unknown as ToZod<PetType>