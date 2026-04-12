import { Link } from "react-router-dom"
import { mockOrders } from "@/mockdata/order/orders"
import StatusBadge from "@/ui/badge/status-badge"

export default function AdminOrders() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">Order List</h4>
        <div className="flex gap-3">
          <select className="px-3 py-2 rounded-lg border border-cdark-200 text-sm bg-white focus:outline-none focus:border-cblue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cdark-200">
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Order #</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Customer</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Date</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Items</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Total</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Payment</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                <td className="py-3 px-2 font-medium text-cdark-900">{order.orderNumber}</td>
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-cdark-900">{order.customer}</p>
                    <p className="text-xs text-cdark-400">{order.email}</p>
                  </div>
                </td>
                <td className="py-3 px-2 text-cdark-600">{order.date}</td>
                <td className="py-3 px-2 text-cdark-600">{order.items}</td>
                <td className="py-3 px-2 font-medium text-cdark-900">${order.total.toFixed(2)}</td>
                <td className="py-3 px-2 text-cdark-600">{order.paymentMethod}</td>
                <td className="py-3 px-2"><StatusBadge status={order.status} /></td>
                <td className="py-3 px-2">
                  <Link to="/admin/order-detail" className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600" title="View">
                    <i className="ri-eye-line" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
