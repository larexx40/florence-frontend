import { Link } from "react-router-dom"
import { mockAdminUsers } from "@/mockdata/admin/admin"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"

export default function AdminUsers() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">All Users</h4>
        <Link to="/admin/add-user">
          <Button variant="primary">Add User</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cdark-200">
              <th className="text-left py-3 px-2 font-medium text-cdark-500">User</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Email</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Role</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Join Date</th>
              <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockAdminUsers.map((user) => (
              <tr key={user.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                    <span className="font-medium text-cdark-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-cdark-600">{user.email}</td>
                <td className="py-3 px-2">
                  <span className="px-2 py-0.5 bg-cblue-50 text-cblue-700 rounded text-xs font-medium">{user.role}</span>
                </td>
                <td className="py-3 px-2"><StatusBadge status={user.status} /></td>
                <td className="py-3 px-2 text-cdark-500">{user.joinDate}</td>
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
