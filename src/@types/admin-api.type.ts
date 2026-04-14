import type { UserRole } from "./auth.type"

export interface AddAdminDto {
  firstName: string
  lastName: string
  email: string
}

export interface UpdateAdminProfileDto {
  password: string
  confirmPassword: string
  firstName?: string
  lastName?: string
  phone: string
  businessName?: string
}

export interface ChangeUserRoleDto {
  userId: string
  role: UserRole
}

// Dashboard stats
export interface DashboardStatsDto {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  pendingOrders: number
  lowStockProducts: number
}
