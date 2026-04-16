import { useState } from "react"
import { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useToggleUserActiveMutation } from "@/api/user.api"
import { Pencil, Trash2, X } from "lucide-react"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"
import { showSuccessToast, showErrorToast, showConfirmModal, showErrorModal } from "@/utils/swal"
import type { UserDto, CreateUserDto, UpdateUserDto } from "@/@types/user.type"

export default function AdminCustomers() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsIsEditModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null)
  
  // Form states
  const [formData, setFormData] = useState<CreateUserDto>({
    firstName: "",
    lastName: "",
    email: "",
    role: "CUSTOMER",
    phone: "",
    businessName: "",
  })

  // API hooks
  const { data: usersData, isLoading, refetch } = useGetUsersQuery({ page, limit })
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [toggleActive, { isLoading: isToggling }] = useToggleUserActiveMutation()

  // Filter only customer users
  const allUsers = usersData?.data?.users || []
  const users = allUsers.filter((user) => user.role === "CUSTOMER")
  const pagination = usersData?.data?.pagination

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await createUser(formData).unwrap()
      if (response.status) {
        showSuccessToast("Customer created successfully!")
        setIsAddModalOpen(false)
        setFormData({ firstName: "", lastName: "", email: "", role: "CUSTOMER", phone: "", businessName: "" })
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to create customer")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create customer")
    }
  }

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return
    
    try {
      const updateData: UpdateUserDto = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        businessName: formData.businessName,
      }
      const response = await updateUser({ id: selectedUser.id, body: updateData }).unwrap()
      if (response.status) {
        showSuccessToast("Customer updated successfully!")
        setIsIsEditModalOpen(false)
        setSelectedUser(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to update customer")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to update customer")
    }
  }

  const handleDeleteUser = async (user: UserDto) => {
    const result = await showConfirmModal(
      "Delete Customer",
      `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`,
      "Delete",
      "Cancel"
    )
    
    if (result.isConfirmed) {
      try {
        const response = await deleteUser(user.id).unwrap()
        if (response.status) {
          showSuccessToast("Customer deleted successfully!")
          refetch()
        } else {
          showErrorToast(response.message || "Failed to delete customer")
        }
      } catch (error: any) {
        showErrorToast(error.data?.message || "Failed to delete customer")
      }
    }
  }

  const handleToggleActive = async (user: UserDto) => {
    try {
      const response = await toggleActive(user.id).unwrap()
      if (response.status) {
        showSuccessToast(`Customer ${response.data?.isActive ? "activated" : "deactivated"} successfully!`)
        refetch()
      } else {
        showErrorToast(response.message || "Failed to toggle customer status")
      }
    } catch (error: any) {
      showErrorToast(error.data?.message || "Failed to toggle customer status")
    }
  }

  const openEditModal = (user: UserDto) => {
    setSelectedUser(user)
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
      businessName: user.businessName || "",
    })
    setIsIsEditModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cblue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-semibold">Customers</h4>
            <p className="text-sm text-cdark-500 mt-1">
              {users.length} customers
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            Add Customer
          </Button>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cdark-200">
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Customer</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Email</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Phone</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Join Date</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-cblue-100 flex items-center justify-center text-cblue-700 font-medium text-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <span className="font-medium text-cdark-900">{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-cdark-600">{user.email}</td>
                  <td className="py-3 px-2 text-cdark-600">{user.phone || "—"}</td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleToggleActive(user)}
                      disabled={isToggling}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        user.isActive 
                          ? "bg-success-50 text-success-700 hover:bg-success-100" 
                          : "bg-error-50 text-error-700 hover:bg-error-100"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-3 px-2 text-cdark-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        disabled={isDeleting}
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-error-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-cdark-500">
              Showing {((page - 1) * limit) + 1} - {Math.min(page * limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border border-cdark-200 rounded-lg text-sm hover:bg-cgrey-50 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm text-cdark-600">
                Page {page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 border border-cdark-200 rounded-lg text-sm hover:bg-cgrey-50 disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Customer</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-cdark-500 hover:text-cdark-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Customer"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Edit Customer</h3>
                <button
                  onClick={() => setIsIsEditModalOpen(false)}
                  className="text-cdark-500 hover:text-cdark-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditUser} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={() => setIsIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
