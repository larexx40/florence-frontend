import { Link } from "react-router-dom"
import { mockDashboardStats, revenueData } from "@/mockdata/admin/admin"
import { mockOrders } from "@/mockdata/order/orders"
import { mockProducts } from "@/mockdata/product/products"
import StatusBadge from "@/ui/badge/status-badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const statCards = [
  { label: "Total Revenue", value: `$${mockDashboardStats.totalRevenue.toLocaleString()}`, change: mockDashboardStats.revenueChange, color: "bg-cblue-50 text-cblue-700", icon: "ri-database-2-line" },
  { label: "Total Orders", value: mockDashboardStats.totalOrders.toLocaleString(), change: mockDashboardStats.ordersChange, color: "bg-error-50 text-error-700", icon: "ri-shopping-bag-3-line" },
  { label: "Total Products", value: mockDashboardStats.totalProducts.toLocaleString(), change: null, color: "bg-message-50 text-message-700", icon: "ri-chat-3-line", link: "/admin/add-product", linkLabel: "ADD NEW" },
  { label: "Total Customers", value: `${(mockDashboardStats.totalCustomers / 1000).toFixed(1)}k`, change: mockDashboardStats.customersChange, color: "bg-success-50 text-success-700", icon: "ri-user-add-line" },
]

export default function AdminDashboard() {
  const recentOrders = mockOrders.slice(0, 5)
  const bestSelling = mockProducts.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm border border-cdark-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cdark-500">{card.label}</p>
                <p className="text-2xl font-semibold text-cdark-900 mt-1">{card.value}</p>
                {card.change !== null && (
                  <span className={`text-xs font-medium mt-1 inline-block ${card.change >= 0 ? "text-success-600" : "text-error-600"}`}>
                    {card.change >= 0 ? "↑" : "↓"} {Math.abs(card.change)}%
                  </span>
                )}
                {card.linkLabel && (
                  <Link to={card.link!} className="text-xs font-medium text-cblue-600 hover:underline ml-2">
                    {card.linkLabel}
                  </Link>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                <i className={`${card.icon} text-xl`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cdark-100">
          <h4 className="text-lg font-semibold mb-4">Revenue Report</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-cdark-100">
          <h4 className="text-lg font-semibold mb-4">Best Selling Product</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cdark-100">
                  <th className="text-left py-2 font-medium text-cdark-500">Product</th>
                  <th className="text-left py-2 font-medium text-cdark-500">Price</th>
                  <th className="text-left py-2 font-medium text-cdark-500">Orders</th>
                  <th className="text-left py-2 font-medium text-cdark-500">Stock</th>
                </tr>
              </thead>
              <tbody>
                {bestSelling.map((p) => (
                  <tr key={p.id} className="border-b border-cdark-50">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-cdark-900">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-cdark-700">${p.price.toFixed(2)}</td>
                    <td className="py-3 text-cdark-700">{p.reviewCount}</td>
                    <td className="py-3 text-cdark-700">{p.inStock ? "In Stock" : "Out"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Recent Orders</h4>
          <Link to="/admin/orders" className="text-sm text-cblue-600 hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cdark-100">
                <th className="text-left py-2 font-medium text-cdark-500">Order #</th>
                <th className="text-left py-2 font-medium text-cdark-500">Customer</th>
                <th className="text-left py-2 font-medium text-cdark-500">Date</th>
                <th className="text-left py-2 font-medium text-cdark-500">Total</th>
                <th className="text-left py-2 font-medium text-cdark-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-cdark-50">
                  <td className="py-3 font-medium text-cdark-900">{order.orderNumber}</td>
                  <td className="py-3 text-cdark-700">{order.customer}</td>
                  <td className="py-3 text-cdark-500">{order.date}</td>
                  <td className="py-3 font-medium text-cdark-900">${order.total.toFixed(2)}</td>
                  <td className="py-3"><StatusBadge status={order.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
