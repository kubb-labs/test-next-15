import type {
  GetOrderByIdPathParamsType,
  GetOrderById200Type,
  GetOrderById400Type,
  GetOrderById404Type,
  GetOrderByIdQueryResponseType,
} from '../types/GetOrderByIdType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { orderSchema } from './orderSchema'
import { z } from 'zod'

export const getOrderByIdPathParamsSchema = z.object({
  orderId: z.coerce.number().int().min(1).max(10).describe('ID of pet that needs to be fetched'),
}) as unknown as ToZod<GetOrderByIdPathParamsType>

/**
 * @description successful operation
 */
export const getOrderById200Schema = z.lazy(() => orderSchema) as unknown as ToZod<GetOrderById200Type>

/**
 * @description Invalid ID supplied
 */
export const getOrderById400Schema = z.unknown() as unknown as ToZod<GetOrderById400Type>

/**
 * @description Order not found
 */
export const getOrderById404Schema = z.unknown() as unknown as ToZod<GetOrderById404Type>

export const getOrderByIdQueryResponseSchema = z.lazy(() => getOrderById200Schema) as unknown as ToZod<GetOrderByIdQueryResponseType>