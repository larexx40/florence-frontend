import { Link } from "react-router-dom"
import { mockCoupons } from "@/mockdata/admin/admin"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"

export default function AdminCoupons() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">Coupon List</h4>
        <Link to="/admin/create-coupon">
          <Button variant="primary">Create Coupon</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cdark-200">
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Code</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Discount</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Min Purchase</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Usage</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Dates</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCoupons.map((coupon) => (
              <tr key={coupon.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                <td className="py-3 px-2 font-mono font-medium text-cdark-900">{coupon.code}</td>
                <td className="py-3 px-2 text-cdark-700">
                  {coupon.type === "percentage" ? `${coupon.discount}%` : `$${coupon.discount}`}
                </td>
                <td className="py-3 px-2 text-cdark-600">${coupon.minPurchase}</td>
                <td className="py-3 px-2 text-cdark-600">{coupon.usageCount}/{coupon.usageLimit}</td>
                <td className="py-3 px-2 text-cdark-500 text-xs">{coupon.startDate} — {coupon.endDate}</td>
                <td className="py-3 px-2"><StatusBadge status={coupon.status} /></td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600" title="Edit">
                      <i className="ri-pencil-line" />
                    </button>
                    <button className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-error-600" title="Delete">
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
