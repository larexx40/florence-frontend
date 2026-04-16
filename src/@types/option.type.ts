// Category Option (from GET /categories/{categoryId}/options)
export interface CategoryOptionDto {
  id: string
  categoryId: string
  name: string
  position: number
  isRequired: boolean
  createdAt: string
  updatedAt: string
}

// Create category option (POST /categories/{categoryId}/options)
export interface CreateCategoryOptionDto {
  name: string
  position?: number
  isRequired?: boolean
}

// Update category option (PATCH /categories/{categoryId}/options/{optionId})
export interface UpdateCategoryOptionDto {
  name?: string
  position?: number
  isRequired?: boolean
}

// Product Option Value (nested in ProductOptionDto)
export interface ProductOptionValueDto {
  id: string
  productOptionId: string
  value: string
  displayName?: string | null
  colorHex?: string | null
  position: number
  createdAt: string
  updatedAt: string
}

// Product Option (from GET /products/{productId}/options)
export interface ProductOptionDto {
  id: string
  productId: string
  categoryOptionId: string
  position: number
  categoryOption: {
    id: string
    name: string
    position: number
  }
  values: ProductOptionValueDto[]
  createdAt: string
  updatedAt: string
}

// Create product option (POST /products/{productId}/options)
export interface CreateProductOptionDto {
  categoryOptionId: string
  position?: number
}

// Update product option (PATCH /products/{productId}/options/{optionId})
export interface UpdateProductOptionDto {
  position?: number
}

// Create product option value (POST /products/{productId}/options/{optionId}/values)
export interface CreateProductOptionValueDto {
  value: string
  displayName?: string
  colorHex?: string
  position?: number
}

// Update product option value (PATCH /products/{productId}/options/{optionId}/values/{valueId})
export interface UpdateProductOptionValueDto {
  value?: string
  displayName?: string
  colorHex?: string
  position?: number
}
