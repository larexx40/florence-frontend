import { Outlet, Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Icon, { HEROICONS } from "@/ui/icons/icon"

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "ri-home-line" },
  { label: "Products", href: "/admin/products", icon: "ri-store-3-line" },
  { label: "Categories", href: "/admin/categories", icon: "ri-list-check-2" },
  { label: "Orders", href: "/admin/orders", icon: "ri-archive-line" },
  { label: "Customers", href: "/admin/customers", icon: "ri-user-3-line" },
  { label: "Users", href: "/admin/users", icon: "ri-user-settings-line" },
  { label: "Coupons", href: "/admin/coupons", icon: "ri-price-tag-3-line" },
  { label: "Options", href: "/admin/options", icon: "ri-list-settings-line" },
  { label: "Reports", href: "/admin/reports", icon: "ri-file-chart-line" },
  { label: "Settings", href: "/admin/settings", icon: "ri-settings-line" },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin"
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-cgrey-50 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-cdark-900 text-white transition-all duration-300 flex flex-col",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-cdark-700">
          {sidebarOpen && (
            <Link to="/admin" className="flex items-center gap-2">
              <img src="/images/logo/logo.png" alt="EF Admin" className="h-8 w-auto brightness-0 invert" />
              <span className="text-sm font-semibold">Admin</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("p-2 hover:bg-cdark-800 rounded-lg", sidebarOpen && "ml-auto")}
          >
            <Icon icon={HEROICONS.MENU} size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                isActive(item.href)
                  ? "text-white bg-cdark-800"
                  : "text-cdark-300 hover:text-white hover:bg-cdark-800"
              )}
            >
              <i className={cn(item.icon, "text-lg")} />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 bg-white border-b border-cdark-200 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-cdark-900">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-cdark-500 hover:text-cblue-600 transition-colors">
              View Store
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cblue-100 flex items-center justify-center text-cblue-700 text-sm font-medium">
                A
              </div>
              {sidebarOpen && <span className="text-sm font-medium text-cdark-700">Admin</span>}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
