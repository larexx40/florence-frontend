import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation, useCreateCategoryMutation } from "@/api/category.api"
import { Pencil, Trash2, Eye, Plus, X } from "lucide-react"
import Button from "@/ui/button/button"
import EmptyState from "@/ui/empty-state/empty-state"
import ImageUpload from "@/ui/image-upload/image-upload"
import { showConfirmModal, showSuccessToast, showErrorModal } from "@/utils/swal"
import type { CategoryDto, CreateCategoryDto } from "@/@types/category.type"

const initialFormData: CreateCategoryDto = {
  name: "",
  description: "",
}

export default function AdminCategoriesList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [formData, setFormData] = useState<CreateCategoryDto>({ ...initialFormData })
  const [imageFile, setImageFile] = useState<File | string | null>(null)

  // API hooks
  const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation()
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()

  const categories = categoriesData?.data?.categories || []
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [categories, searchTerm]
  )

  const handleToggleStatus = async (category: CategoryDto) => {
    try {
      const response = await updateCategory({
        id: category.id,
        body: { isActive: !category.isActive }
      }).unwrap()
      if (response.status) {
        showSuccessToast(`Category ${category.isActive ? 'deactivated' : 'activated'} successfully!`)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to update category status")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to update category status")
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
          showErrorModal("Error", response.message || "Failed to delete category")
        }
      } catch (error: any) {
        showErrorModal("Error", error.data?.message || "Failed to delete category")
      }
    }
  }

  const buildFormData = () => {
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    if (formData.description) formDataToSend.append("description", formData.description)

    if (imageFile instanceof File) {
      formDataToSend.append("image", imageFile)
    } else if (typeof imageFile === "string" && imageFile) {
      formDataToSend.append("imageUrl", imageFile)
    }

    return formDataToSend
  }

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const hasImage = imageFile !== null
      const body = hasImage ? buildFormData() : formData
      const response = await createCategory(body as CreateCategoryDto).unwrap()
      if (response.status) {
        showSuccessToast("Category created successfully!")
        setIsCreateModalOpen(false)
        setFormData({ ...initialFormData })
        setImageFile(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to create category")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create category")
    }
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
    <>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-semibold">Categories List</h4>
            <p className="text-sm text-cdark-500 mt-1">{filteredCategories.length} categories</p>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cdark-200">
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Image</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Name</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Description</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Products</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8">
                    <EmptyState
                      title="No categories found"
                      description="Get started by creating your first category"
                    />
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                    <td className="py-3 px-2">
                      {category.imageUrl ? (
                        <img src={category.imageUrl} alt={category.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-cgrey-200 flex items-center justify-center text-cdark-400">
                          <i className="ri-image-line" />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2 font-medium text-cdark-900">{category.name}</td>
                    <td className="py-3 px-2 text-cdark-600 max-w-xs truncate">
                      {category.description || "No description"}
                    </td>
                    <td className="py-3 px-2 text-cdark-600">{category._count?.products || 0}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => handleToggleStatus(category)}
                        disabled={isUpdating}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          category.isActive
                            ? "bg-success-50 text-success-700 hover:bg-success-100"
                            : "bg-error-50 text-error-700 hover:bg-error-100"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/categories/${category.id}`}
                          className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/admin/categories/${category.id}/edit`}
                          className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Category Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Add New Category</h3>
                  <p className="text-sm text-cdark-500 mt-1">Create a new category for your products</p>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
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
                    placeholder="Describe this category..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category Image</label>
                  <ImageUpload
                    value={imageFile}
                    onChange={setImageFile}
                  />
                  <p className="text-xs text-cdark-500 mt-1">Upload a category image or provide an image URL</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="secondary" type="button" onClick={() => setIsCreateModalOpen(false)}>
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
    </>
  )
}
