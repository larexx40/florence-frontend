export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  compareAtPrice?: number
  image: string
  color: string
  size: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  count: number
}
