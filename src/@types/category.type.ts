export interface CategoryDto {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
  children?: CategoryDto[]
}

export interface CreateCategoryDto {
  name: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  isActive?: boolean
  sortOrder?: number
}

export interface UpdateCategoryDto {
  name?: string
  description?: string
  image?: string
  icon?: string
  parentId?: string
  isActive?: boolean
  sortOrder?: number
}

export interface CategoryListResponseDto {
  categories: CategoryDto[]
}

// Legacy types for frontend use
export interface Category {
  id: string
  name: string
  slug: string
  image: string
  type: "abs" | "circle"
}

export interface CategoryTab {
  label: string
  value: string
  categories: Category[]
}
