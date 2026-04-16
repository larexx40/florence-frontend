import { useState } from "react"
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/api/category.api"
import { Pencil, Trash2, X } from "lucide-react"
import Button from "@/ui/button/button"
import ImageUpload from "@/ui/image-upload/image-upload"
import EmptyState from "@/ui/empty-state/empty-state"
import { showSuccessToast, showErrorToast, showConfirmModal, showErrorModal } from "@/utils/swal"
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "@/@types/category.type"

export default function AdminCategories() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(null)

  // Form states
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: "",
    description: "",
    isActive: true,
    sortOrder: 0,
  })
  const [imageFile, setImageFile] = useState<File | string | null>(null)

  // API hooks
  const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery()
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()

  const categories = categoriesData?.data?.categories || []

  const buildFormData = () => {
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    if (formData.description) formDataToSend.append("description", formData.description)
    formDataToSend.append("isActive", String(formData.isActive))
    formDataToSend.append("sortOrder", String(formData.sortOrder))
    
    if (imageFile instanceof File) {
      formDataToSend.append("image", imageFile)
    } else if (typeof imageFile === "string" && imageFile) {
      formDataToSend.append("imageUrl", imageFile)
    }
    
    return formDataToSend
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const hasImage = imageFile !== null
      const body = hasImage ? buildFormData() : formData
      const response = await createCategory(body as CreateCategoryDto).unwrap()
      if (response.status) {
        showSuccessToast("Category created successfully!")
        setIsAddModalOpen(false)
        setFormData({ name: "", slug: "", description: "", isActive: true, sortOrder: 0 })
        setImageFile(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to create category")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create category")
    }
  }

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return

    try {
      const hasImage = imageFile !== null && (imageFile instanceof File || typeof imageFile === "string")
      let body: UpdateCategoryDto | FormData
      
      if (hasImage) {
        body = new FormData()
        const formDataToSend = body as FormData
        formDataToSend.append("name", formData.name)
        if (formData.description) formDataToSend.append("description", formData.description)
        formDataToSend.append("isActive", String(formData.isActive))
        formDataToSend.append("sortOrder", String(formData.sortOrder))
        
        if (imageFile instanceof File) {
          formDataToSend.append("image", imageFile)
        } else if (typeof imageFile === "string") {
          formDataToSend.append("imageUrl", imageFile)
        }
      } else {
        body = {
          name: formData.name,
          description: formData.description,
          isActive: formData.isActive,
          sortOrder: formData.sortOrder,
        }
      }
      
      const response = await updateCategory({ id: selectedCategory.id, body }).unwrap()
      if (response.status) {
        showSuccessToast("Category updated successfully!")
        setIsEditModalOpen(false)
        setSelectedCategory(null)
        setImageFile(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to update category")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to update category")
    }
  }

  const handleDeleteCategory = async (category: CategoryDto) => {
    const result = await showConfirmModal(
      "Delete Category",
      `Are you sure you want to delete "${category.name}"? This action cannot be undone.`,
      "Delete",
      "Cancel"
    )

    if (result.isConfirmed) {
      try {
        const response = await deleteCategory(category.id).unwrap()
        if (response.status) {
          showSuccessToast("Category deleted successfully!")
          refetch()
        } else {
          showErrorToast(response.message || "Failed to delete category")
        }
      } catch (error: any) {
        showErrorToast(error.data?.message || "Failed to delete category")
      }
    }
  }

  const handleToggleStatus = async (category: CategoryDto) => {
    try {
      const updateData: UpdateCategoryDto = { isActive: !category.isActive }
      const response = await updateCategory({ id: category.id, body: updateData }).unwrap()
      if (response.status) {
        showSuccessToast(`Category ${response.data?.isActive ? "activated" : "deactivated"} successfully!`)
        refetch()
      } else {
        showErrorToast(response.message || "Failed to update category status")
      }
    } catch (error: any) {
      showErrorToast(error.data?.message || "Failed to update category status")
    }
  }

  const openEditModal = (category: CategoryDto) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      isActive: category.isActive,
      sortOrder: category.sortOrder,
    })
    setImageFile(category.image || null)
    setIsEditModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({ name: "", slug: "", description: "", isActive: true, sortOrder: 0 })
    setImageFile(null)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedCategory(null)
    setImageFile(null)
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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-semibold">Category List</h4>
            <p className="text-sm text-cdark-500 mt-1">{categories.length} categories</p>
          </div>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            Add Category
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cdark-200">
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Image</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Name</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Slug</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Sort Order</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cdark-200">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8">
                    <EmptyState
                      title="No categories found"
                      description="Get started by creating your first category"
                    />
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-cgrey-50">
                    <td className="py-3 px-2">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-cgrey-200 flex items-center justify-center">
                          <i className="ri-image-line text-cdark-400" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2 font-medium text-cdark-900">{category.name}</td>
                    <td className="py-3 px-2 text-cdark-500">{category.slug}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => handleToggleStatus(category)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        category.isActive
                          ? "bg-success-50 text-success-700 hover:bg-success-100"
                          : "bg-error-50 text-error-700 hover:bg-error-100"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-cdark-600">{category.sortOrder}</td>
                    <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(category)}
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        disabled={isDeleting}
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-error-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    </td>
                  </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Category</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-cdark-500 hover:text-cdark-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <ImageUpload 
                    value={imageFile} 
                    onChange={setImageFile}
                    preview={selectedCategory?.image}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-cdark-300"
                  />
                  <label htmlFor="isActive" className="text-sm">Active</label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={closeAddModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Category"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Edit Category</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-cdark-500 hover:text-cdark-700"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image</label>
                  <ImageUpload 
                    value={imageFile} 
                    onChange={setImageFile}
                    preview={selectedCategory?.image}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-cdark-300"
                  />
                  <label htmlFor="editIsActive" className="text-sm">Active</label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={closeEditModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Category"}
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
