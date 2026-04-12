import type { AdminUser, DashboardStats, Coupon, AdminCategory } from "@/@types/admin.type"

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 6659,
  revenueChange: 8.5,
  totalOrders: 9856,
  ordersChange: -2.3,
  totalProducts: 893,
  totalCustomers: 4600,
  customersChange: 5.2,
}

export const mockAdminUsers: AdminUser[] = [
  { id: "1", name: "Emay Walter", email: "emay@florence.com", role: "Admin", status: "Active", avatar: "/admin/assets/images/users/4.jpg", joinDate: "2024-01-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah@florence.com", role: "Manager", status: "Active", avatar: "/admin/assets/images/users/3.jpg", joinDate: "2024-03-20" },
  { id: "3", name: "Mike Chen", email: "mike@florence.com", role: "Editor", status: "Active", avatar: "/admin/assets/images/users/2.jpg", joinDate: "2024-06-10" },
  { id: "4", name: "Lisa Park", email: "lisa@florence.com", role: "Support", status: "Inactive", avatar: "/admin/assets/images/users/1.jpg", joinDate: "2024-08-05" },
  { id: "5", name: "Tom Rivera", email: "tom@florence.com", role: "Editor", status: "Active", avatar: "/admin/assets/images/users/5.jpg", joinDate: "2024-09-12" },
]

export const mockCoupons: Coupon[] = [
  { id: "1", code: "SUMMER25", discount: 25, type: "percentage", minPurchase: 50, startDate: "2025-06-01", endDate: "2025-08-31", status: "Scheduled", usageCount: 0, usageLimit: 500 },
  { id: "2", code: "WELCOME10", discount: 10, type: "percentage", minPurchase: 0, startDate: "2025-01-01", endDate: "2025-12-31", status: "Active", usageCount: 234, usageLimit: 1000 },
  { id: "3", code: "FLAT5", discount: 5, type: "fixed", minPurchase: 25, startDate: "2025-03-01", endDate: "2025-03-31", status: "Expired", usageCount: 89, usageLimit: 200 },
]

export const mockAdminCategories: AdminCategory[] = [
  { id: "1", name: "Tops", slug: "tops", parentId: null, image: "/images/cls-categories/fashion/top.jpg", status: "Active", productCount: 45 },
  { id: "2", name: "Accessories", slug: "accessories", parentId: null, image: "/images/cls-categories/fashion/accessories.jpg", status: "Active", productCount: 32 },
  { id: "3", name: "Sportwear", slug: "sportwear", parentId: null, image: "/images/cls-categories/fashion/sportwear.jpg", status: "Active", productCount: 28 },
  { id: "4", name: "Men", slug: "men", parentId: null, image: "/images/cls-categories/fashion/men.jpg", status: "Active", productCount: 56 },
  { id: "5", name: "Kids", slug: "kids", parentId: null, image: "/images/cls-categories/fashion/kid.jpg", status: "Inactive", productCount: 19 },
]

export const revenueData = [
  { month: "Jan", revenue: 4200, orders: 380 },
  { month: "Feb", revenue: 3800, orders: 350 },
  { month: "Mar", revenue: 5100, orders: 420 },
  { month: "Apr", revenue: 4600, orders: 400 },
  { month: "May", revenue: 5400, orders: 450 },
  { month: "Jun", revenue: 6200, orders: 520 },
  { month: "Jul", revenue: 5800, orders: 490 },
  { month: "Aug", revenue: 6500, orders: 540 },
  { month: "Sep", revenue: 5900, orders: 480 },
  { month: "Oct", revenue: 6100, orders: 510 },
  { month: "Nov", revenue: 7200, orders: 600 },
  { month: "Dec", revenue: 8000, orders: 680 },
]
