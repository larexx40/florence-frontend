import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateCategoryMutation } from "@/api/category.api"
import { ArrowLeft } from "lucide-react"
import Button from "@/ui/button/button"
import ImageUpload from "@/ui/image-upload/image-upload"
import { showSuccessToast, showErrorModal } from "@/utils/swal"
import type { CreateCategoryDto } from "@/@types/category.type"

export default function AdminCategoriesCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: "",
    description: "",
    isActive: true,
    sortOrder: 0,
  })
  const [imageFile, setImageFile] = useState<File | string | null>(null)

  // API hooks
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const hasImage = imageFile !== null
      const body = hasImage ? buildFormData() : formData
      const response = await createCategory(body as CreateCategoryDto).unwrap()
      if (response.status) {
        showSuccessToast("Category created successfully!")
        navigate("/admin/categories")
      } else {
        showErrorModal("Error", response.message || "Failed to create category")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create category")
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/categories"
            className="p-2 hover:bg-cgrey-100 rounded-lg text-cdark-500 hover:text-cdark-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h4 className="text-xl font-semibold">Add New Category</h4>
            <p className="text-sm text-cdark-500 mt-1">Create a new category for your products</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
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
                rows={4}
                placeholder="Describe this category..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                min="0"
              />
              <p className="text-xs text-cdark-500 mt-1">Lower numbers appear first in the list</p>
            </div>
          </div>

          {/* Image and Settings */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Category Image</label>
              <ImageUpload
                value={imageFile}
                onChange={setImageFile}
              />
              <p className="text-xs text-cdark-500 mt-1">Upload a category image or provide an image URL</p>
            </div>

            {/* Settings */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-cdark-300 text-cblue-600 focus:ring-cblue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium">Active</label>
              </div>
              <p className="text-xs text-cdark-500">Inactive categories won't be visible to customers</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Link to="/admin/categories">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
          <Button variant="primary" type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Category"}
          </Button>
        </div>
      </form>
    </div>
  )
}