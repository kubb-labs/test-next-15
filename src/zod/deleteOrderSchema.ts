import type { DeleteOrderPathParamsType, DeleteOrder400Type, DeleteOrder404Type, DeleteOrderMutationResponseType } from '../types/DeleteOrderType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deleteOrderPathParamsSchema = z.object({
  orderId: z.coerce.number().int().min(1).describe('ID of the order that needs to be deleted'),
}) as unknown as ToZod<DeleteOrderPathParamsType>

/**
 * @description Invalid ID supplied
 */
export const deleteOrder400Schema = z.unknown() as unknown as ToZod<DeleteOrder400Type>

/**
 * @description Order not found
 */
export const deleteOrder404Schema = z.unknown() as unknown as ToZod<DeleteOrder404Type>

export const deleteOrderMutationResponseSchema = z.unknown() as unknown as ToZod<DeleteOrderMutationResponseType>