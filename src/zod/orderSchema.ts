import type { OrderType } from '../types/OrderType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const orderSchema = z.object({
  id: z.coerce.number().int().optional(),
  petId: z.coerce.number().int().optional(),
  quantity: z.coerce.number().int().optional(),
  shipDate: z.string().datetime().optional(),
  status: z.enum(['placed', 'approved', 'delivered']).describe('Order Status').optional(),
  complete: z.boolean().optional(),
}) as unknown as ToZod<OrderType>