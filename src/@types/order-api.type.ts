// Order DTOs matching API spec

export type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "PARTIALLY_FULFILLED" | "REFUNDED"
export type PaymentStatus = "UNPAID" | "PAID" | "PARTIAL" | "REFUNDED" | "CREDITED"
export type PaymentMethod = "PAYSTACK" | "BANK_TRANSFER" | "CASH_ON_DELIVERY"

export interface OrderItemInputDto {
  variantId: string
  quantity: number
}

export interface InlineAddressDto {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  cityId?: string
  country?: string
  postalCode?: string
}

export interface PlaceOrderDto {
  email: string
  addressId?: string
  address?: InlineAddressDto
  items: OrderItemInputDto[]
  paymentMethod: PaymentMethod
  logisticsId?: string
  notes?: string
}

export interface UpdateOrderStatusDto {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
}

// Query params for orders
export interface OrderQueryParams {
  status?: OrderStatus
  paymentStatus?: PaymentStatus
  customerId?: string
  page?: number
  limit?: number
  sortBy?: "createdAt" | "total"
  sortOrder?: "asc" | "desc"
}
