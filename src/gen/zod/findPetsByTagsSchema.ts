import type { FindPetsByTagsQueryParamsType, FindPetsByTags200Type, FindPetsByTags400Type, FindPetsByTagsQueryResponseType } from '../types/FindPetsByTagsType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { petSchema } from './petSchema'
import { z } from 'zod'

export const findPetsByTagsQueryParamsSchema = z.object({
  tags: z.array(z.coerce.string()).describe('Tags to filter by'),
}) as unknown as ToZod<FindPetsByTagsQueryParamsType>

/**
 * @description successful operation
 */
export const findPetsByTags200Schema = z.array(z.lazy(() => petSchema)) as unknown as ToZod<FindPetsByTags200Type>

/**
 * @description Invalid tag value
 */
export const findPetsByTags400Schema = z.unknown() as unknown as ToZod<FindPetsByTags400Type>

export const findPetsByTagsQueryResponseSchema = z.lazy(() => findPetsByTags200Schema) as unknown as ToZod<FindPetsByTagsQueryResponseType>