import type { UserRole } from "./auth.type"

export interface UserDto {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  businessName?: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  firstName: string
  lastName: string
  email: string
  role?: UserRole
  phone?: string
  businessName?: string
}

export interface UpdateUserDto {
  firstName?: string
  lastName?: string
  phone?: string
  businessName?: string
}

export interface ChangeUserRoleDto {
  userId: string
  role: UserRole
}

export interface SetupAccountDto {
  password: string
  confirmPassword: string
  firstName?: string
  lastName?: string
  phone: string
  businessName?: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface AwardStoreCreditDto {
  amount: number
  note?: string
}

export interface SendUserEmailDto {
  subject: string
  message: string
}

export interface UserStatsResponseDto {
  totalOrders: number
  totalSpent: number
  storeCreditBalance: number
  lastOrderAt?: string
}

export interface UsersListResponseDto {
  users: UserDto[]
  pagination: PaginatedDataDto
}

export interface PaginatedDataDto {
  total: number
  page: number
  limit: number
  totalPages: number
}
