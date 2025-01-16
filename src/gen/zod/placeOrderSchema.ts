import type { PlaceOrder200Type, PlaceOrder400Type, PlaceOrderMutationRequestType, PlaceOrderMutationResponseType } from '../types/PlaceOrderType'
import type { ToZod } from '@kubb/plugin-zod/utils'
import { orderSchema } from './orderSchema'
import { z } from 'zod'

/**
 * @description successful operation
 */
export const placeOrder200Schema = z.lazy(() => orderSchema) as unknown as ToZod<PlaceOrder200Type>

/**
 * @description Invalid Order
 */
export const placeOrder400Schema = z.unknown() as unknown as ToZod<PlaceOrder400Type>

/**
 * @description order placed for purchasing the pet
 */
export const placeOrderMutationRequestSchema = z.lazy(() => orderSchema) as unknown as ToZod<PlaceOrderMutationRequestType>

export const placeOrderMutationResponseSchema = z.lazy(() => placeOrder200Schema) as unknown as ToZod<PlaceOrderMutationResponseType>