import type { OrderType } from './OrderType'

/**
 * @description successful operation
 */
export type PlaceOrder200Type = OrderType

/**
 * @description Invalid Order
 */
export type PlaceOrder400Type = unknown

/**
 * @description order placed for purchasing the pet
 */
export type PlaceOrderMutationRequestType = OrderType

export type PlaceOrderMutationResponseType = PlaceOrder200Type

export type PlaceOrderTypeMutation = {
  Response: PlaceOrder200Type
  Request: PlaceOrderMutationRequestType
  Errors: PlaceOrder400Type
}