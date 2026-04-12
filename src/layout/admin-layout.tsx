import { Outlet, Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Icon, { HEROICONS } from "@/ui/icons/icon"

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: "ri-home-line" },
  {
    label: "Products",
    children: [
      { label: "Products", href: "/admin/products" },
      { label: "Add New Product", href: "/admin/add-product" },
    ],
    icon: "ri-store-3-line",
  },
  {
    label: "Category",
    children: [
      { label: "Category List", href: "/admin/categories" },
      { label: "Add Category", href: "/admin/add-category" },
    ],
    icon: "ri-list-check-2",
  },
  {
    label: "Orders",
    children: [
      { label: "Order List", href: "/admin/orders" },
      { label: "Order Detail", href: "/admin/order-detail" },
    ],
    icon: "ri-archive-line",
  },
  {
    label: "Users",
    children: [
      { label: "All Users", href: "/admin/users" },
      { label: "Add User", href: "/admin/add-user" },
    ],
    icon: "ri-user-3-line",
  },
  {
    label: "Coupons",
    children: [
      { label: "Coupon List", href: "/admin/coupons" },
      { label: "Create Coupon", href: "/admin/create-coupon" },
    ],
    icon: "ri-price-tag-3-line",
  },
  { label: "Reports", href: "/admin/reports", icon: "ri-file-chart-line" },
  { label: "Settings", href: "/admin/settings", icon: "ri-settings-line" },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Products", "Orders"])
  const location = useLocation()

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => location.pathname === href

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
            <div key={item.label}>
              {"children" in item && item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-cdark-300 hover:text-white hover:bg-cdark-800 transition-colors"
                  >
                    <i className={cn(item.icon, "text-lg")} />
                    {sidebarOpen && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        <Icon
                          icon={HEROICONS.CHEVRON_DOWN}
                          size={14}
                          className={cn(
                            "transition-transform",
                            expandedMenus.includes(item.label) && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>
                  {sidebarOpen && expandedMenus.includes(item.label) && (
                    <div className="ml-7 border-l border-cdark-700">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors",
                            isActive(child.href)
                              ? "text-cblue-400 bg-cdark-800"
                              : "text-cdark-400 hover:text-white"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href!}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    isActive(item.href!)
                      ? "text-white bg-cdark-800"
                      : "text-cdark-300 hover:text-white hover:bg-cdark-800"
                  )}
                >
                  <i className={cn(item.icon, "text-lg")} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              )}
            </div>
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
