export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  avatar: string
  joinDate: string
}

export interface DashboardStats {
  totalRevenue: number
  revenueChange: number
  totalOrders: number
  ordersChange: number
  totalProducts: number
  totalCustomers: number
  customersChange: number
}

export interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  minPurchase: number
  startDate: string
  endDate: string
  status: "Active" | "Expired" | "Scheduled"
  usageCount: number
  usageLimit: number
}

export interface AdminCategory {
  id: string
  name: string
  slug: string
  parentId: string | null
  image: string
  status: "Active" | "Inactive"
  productCount: number
}
