// Product DTOs matching API spec

export interface CreateProductDto {
  name: string
  description?: string
  basePrice: number
  compareAtPrice?: number
  costPerUnit?: number
  sku?: string
  barcode?: string
  trackInventory: boolean
  stockQuantity?: number
  lowStockThreshold?: number
  isActive: boolean
  slug?: string
  metaTitle?: string
  metaDescription?: string
  categoryId?: string
  discountId?: string
}

export interface UpdateProductDto {
  name?: string
  description?: string
  basePrice?: number
  compareAtPrice?: number
  costPerUnit?: number
  sku?: string
  barcode?: string
  trackInventory?: boolean
  stockQuantity?: number
  lowStockThreshold?: number
  isActive?: boolean
  slug?: string
  metaTitle?: string
  metaDescription?: string
  categoryId?: string
  discountId?: string
}

export interface AttachImageDto {
  imageId: string
  position?: number
  altText?: string
}

export interface AddProductOptionDto {
  optionId: string
  position?: number
}

export interface UpdateProductOptionDto {
  position?: number
}

export interface AddOptionValueDto {
  value: string
  position?: number
}

export interface UpdateOptionValueDto {
  value?: string
  position?: number
}

// Query params
export interface ProductQueryParams {
  search?: string
  categoryId?: string
  sortBy?: "name" | "createdAt"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
  includeInactive?: boolean
  all?: boolean
}
