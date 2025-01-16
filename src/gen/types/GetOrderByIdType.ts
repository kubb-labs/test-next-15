import type { OrderType } from './OrderType'

export type GetOrderByIdPathParamsType = {
  /**
   * @description ID of pet that needs to be fetched
   * @minLength 1
   * @maxLength 10
   * @type integer, int64
   */
  orderId: number
}

/**
 * @description successful operation
 */
export type GetOrderById200Type = OrderType

/**
 * @description Invalid ID supplied
 */
export type GetOrderById400Type = unknown

/**
 * @description Order not found
 */
export type GetOrderById404Type = unknown

export type GetOrderByIdQueryResponseType = GetOrderById200Type

export type GetOrderByIdTypeQuery = {
  Response: GetOrderById200Type
  PathParams: GetOrderByIdPathParamsType
  Errors: GetOrderById400Type | GetOrderById404Type
}