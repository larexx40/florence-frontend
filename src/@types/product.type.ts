export interface Product {
  id: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  categorySlug: string
  colors: ProductColor[]
  sizes?: string[]
  badge?: ProductBadge
  description: string
  inStock: boolean
  rating: number
  reviewCount: number
}

export interface ProductColor {
  name: string
  value: string
  image: string
}

export type ProductBadge = "new" | "hot" | "trending" | "sale"

export interface ProductVariant {
  color: string
  size: string
  quantity: number
}
