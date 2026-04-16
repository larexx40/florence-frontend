import { useState, useMemo } from "react"
import {
  useGetCategoryOptionsQuery,
  useCreateCategoryOptionMutation,
  useUpdateCategoryOptionMutation,
  useDeleteCategoryOptionMutation,
} from "@/api/option.api"
import { useGetCategoriesQuery } from "@/api/category.api"
import { Pencil, Trash2, X, Plus } from "lucide-react"
import Button from "@/ui/button/button"
import EmptyState from "@/ui/empty-state/empty-state"
import { showSuccessToast, showErrorToast, showConfirmModal, showErrorModal } from "@/utils/swal"
import type {
  CategoryOptionDto,
  CreateCategoryOptionDto,
} from "@/@types/option.type"

interface OptionWithCategory extends CategoryOptionDto {
  categoryName: string
}

export default function AdminOptions() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<OptionWithCategory | null>(null)
  const [formData, setFormData] = useState<CreateCategoryOptionDto & { categoryId?: string }>({ name: "", categoryId: "" })

  // API hooks
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery()
  const { data: optionsData, isLoading: isLoadingOptions, refetch } = useGetCategoryOptionsQuery(selectedCategoryId, {
    skip: !selectedCategoryId,
  })

  const [createOption, { isLoading: isCreating }] = useCreateCategoryOptionMutation()
  const [updateOption, { isLoading: isUpdating }] = useUpdateCategoryOptionMutation()
  const [deleteOption, { isLoading: isDeleting }] = useDeleteCategoryOptionMutation()

  const categories = categoriesData?.data?.categories || []

  // Get selected category name and options
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId)
  const options: OptionWithCategory[] = useMemo(() => {
    if (!optionsData?.data || !selectedCategory) return []
    return optionsData.data.map((option) => ({
      ...option,
      categoryName: selectedCategory.name,
    }))
  }, [optionsData, selectedCategory])

  const handleAddOption = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.categoryId) return

    try {
      const response = await createOption({
        categoryId: formData.categoryId,
        body: {
          name: formData.name,
          position: formData.position,
          isRequired: formData.isRequired,
        },
      }).unwrap()
      if (response.status) {
        showSuccessToast("Option created successfully!")
        setIsAddModalOpen(false)
        setFormData({ name: "", categoryId: "" })
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to create option")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create option")
    }
  }

  const handleEditOption = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOption || !selectedCategoryId) return

    try {
      const response = await updateOption({
        categoryId: selectedCategoryId,
        optionId: selectedOption.id,
        body: {
          name: formData.name,
          position: formData.position,
          isRequired: formData.isRequired,
        },
      }).unwrap()
      if (response.status) {
        showSuccessToast("Option updated successfully!")
        setIsEditModalOpen(false)
        setSelectedOption(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to update option")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to update option")
    }
  }

  const handleDeleteOption = async (option: OptionWithCategory) => {
    if (!selectedCategoryId) return
    
    const result = await showConfirmModal(
      "Delete Option",
      `Are you sure you want to delete "${option.name}"? This action cannot be undone.`,
      "Delete",
      "Cancel"
    )

    if (result.isConfirmed) {
      try {
        const response = await deleteOption({
          categoryId: selectedCategoryId,
          optionId: option.id,
        }).unwrap()
        if (response.status) {
          showSuccessToast("Option deleted successfully!")
          refetch()
        } else {
          showErrorToast(response.message || "Failed to delete option")
        }
      } catch (error: any) {
        showErrorToast(error.data?.message || "Failed to delete option")
      }
    }
  }

  const openEditModal = (option: OptionWithCategory) => {
    setSelectedOption(option)
    setFormData({
      name: option.name,
      position: option.position,
      isRequired: option.isRequired,
    })
    setIsEditModalOpen(true)
  }

  const openAddModal = () => {
    setFormData({ name: "", categoryId: selectedCategoryId || "" })
    setIsAddModalOpen(true)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategoryId(e.target.value)
  }

  if (isLoadingCategories) {
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
            <h4 className="text-xl font-semibold">Category Options</h4>
            <p className="text-sm text-cdark-500 mt-1">Manage options per category</p>
          </div>
          {selectedCategoryId && (
            <Button variant="primary" onClick={openAddModal}>
              <Plus size={16} className="mr-2" />
              Add Option
            </Button>
          )}
        </div>

        {/* Category Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Select Category</label>
          <select
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
          >
            <option value="">Choose a category...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {!selectedCategoryId ? (
          <EmptyState
            title="Select a category"
            description="Choose a category above to manage its options"
          />
        ) : isLoadingOptions ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cblue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cdark-200">
                  <th className="text-left py-3 px-2 font-medium text-cdark-500">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-cdark-500">Position</th>
                  <th className="text-left py-3 px-2 font-medium text-cdark-500">Required</th>
                  <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {options.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8">
                      <EmptyState
                        title="No options found"
                        description="Add options like Color, Size, etc. to this category"
                      />
                    </td>
                  </tr>
                ) : (
                  options.map((option) => (
                    <tr key={option.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-cdark-900">{option.name}</td>
                      <td className="py-3 px-2 text-cdark-600">{option.position}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${option.isRequired ? "bg-warning-50 text-warning-700" : "bg-cgrey-100 text-cdark-500"}`}>
                          {option.isRequired ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(option)}
                            className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteOption(option)}
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
        )}
      </div>

      {/* Add Option Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Option</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddOption} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  >
                    <option value="">Select a category...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Color, Size, Material"
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="number"
                    value={formData.position ?? 0}
                    onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isRequired"
                    checked={formData.isRequired || false}
                    onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                    className="rounded border-cdark-300"
                  />
                  <label htmlFor="isRequired" className="text-sm">Required before checkout</label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button variant="secondary" type="button" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Option"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Option Modal */}
      {isEditModalOpen && selectedOption && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Edit Option</h3>
                <button onClick={() => setIsEditModalOpen(false)} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditOption} className="space-y-4">
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
                  <label className="block text-sm font-medium mb-1">Position</label>
                  <input
                    type="number"
                    value={formData.position ?? 0}
                    onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    min="0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="editIsRequired"
                    checked={formData.isRequired || false}
                    onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                    className="rounded border-cdark-300"
                  />
                  <label htmlFor="editIsRequired" className="text-sm">Required before checkout</label>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                  <Button variant="secondary" type="button" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Option"}
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
