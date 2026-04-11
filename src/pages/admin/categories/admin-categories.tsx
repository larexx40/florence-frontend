import { Link } from "react-router-dom"
import { mockAdminCategories } from "@/mockdata/admin/admin"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"

export default function AdminCategories() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">Category List</h4>
        <Link to="/admin/add-category">
          <Button variant="primary">Add Category</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cdark-200">
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Image</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Name</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Slug</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Products</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAdminCategories.map((cat) => (
              <tr key={cat.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                <td className="py-3 px-2">
                  <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="py-3 px-2 font-medium text-cdark-900">{cat.name}</td>
                <td className="py-3 px-2 text-cdark-500">{cat.slug}</td>
                <td className="py-3 px-2 text-cdark-600">{cat.productCount}</td>
                <td className="py-3 px-2"><StatusBadge status={cat.status} /></td>
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
