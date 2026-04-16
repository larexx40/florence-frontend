import { useState } from "react"
import { mockCoupons } from "@/mockdata/admin/admin"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"
import EmptyState from "@/ui/empty-state/empty-state"
import { X, Plus } from "lucide-react"

export default function AdminCoupons() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-semibold">Coupon List</h4>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={16} className="mr-2" />
            Create Coupon
          </Button>
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
              {mockCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8">
                    <EmptyState
                      title="No coupons found"
                      description="Create coupons to offer discounts to your customers"
                    />
                  </td>
                </tr>
              ) : (
                mockCoupons.map((coupon) => (
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
                )))}
              </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Create Coupon</h3>
                  <p className="text-sm text-cdark-500 mt-1">Add a new discount coupon</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    placeholder="e.g. SUMMER20"
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Type</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500">
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Discount Value *</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Purchase</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Usage Limit</label>
                    <input
                      type="number"
                      placeholder="Unlimited"
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="secondary" type="button" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Create Coupon
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
