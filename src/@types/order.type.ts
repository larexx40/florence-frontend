export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Approved"

export interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  date: string
  items: number
  total: number
  status: OrderStatus
  paymentMethod: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  color?: string
  size?: string
}
