import type { GetInventory200Type, GetInventoryQueryResponseType } from '../types/GetInventoryType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const getInventory200Schema = z.object({}).catchall(z.coerce.number().int()) as unknown as ToZod<GetInventory200Type>

export const getInventoryQueryResponseSchema = z.lazy(() => getInventory200Schema) as unknown as ToZod<GetInventoryQueryResponseType>