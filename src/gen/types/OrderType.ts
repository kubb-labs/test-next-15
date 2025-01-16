export const orderStatus = {
  placed: 'placed',
  approved: 'approved',
  delivered: 'delivered',
} as const

export type OrderStatusType = (typeof orderStatus)[keyof typeof orderStatus]

export type OrderType = {
  /**
   * @type integer | undefined, int64
   */
  id?: number
  /**
   * @type integer | undefined, int64
   */
  petId?: number
  /**
   * @type integer | undefined, int32
   */
  quantity?: number
  /**
   * @type string | undefined, date-time
   */
  shipDate?: string
  /**
   * @description Order Status
   * @type string | undefined
   */
  status?: OrderStatusType
  /**
   * @type boolean | undefined
   */
  complete?: boolean
}