export type DeleteOrderPathParamsType = {
  /**
   * @description ID of the order that needs to be deleted
   * @minLength 1
   * @type integer, int64
   */
  orderId: number
}

/**
 * @description Invalid ID supplied
 */
export type DeleteOrder400Type = unknown

/**
 * @description Order not found
 */
export type DeleteOrder404Type = unknown

export type DeleteOrderMutationResponseType = unknown

export type DeleteOrderTypeMutation = {
  Response: any
  PathParams: DeleteOrderPathParamsType
  Errors: DeleteOrder400Type | DeleteOrder404Type
}