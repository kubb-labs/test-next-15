import type { TagType } from '../types/TagType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const tagSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.coerce.string().optional(),
}) as unknown as ToZod<TagType>