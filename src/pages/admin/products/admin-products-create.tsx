import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCreateProductMutation } from "@/api/product.api"
import { useGetCategoriesQuery } from "@/api/category.api"
import { X, Plus, ArrowLeft } from "lucide-react"
import Button from "@/ui/button/button"
import ImageUpload from "@/ui/image-upload/image-upload"
import { showSuccessToast, showErrorModal } from "@/utils/swal"
import type { CreateProductDto } from "@/@types/product-api.type"

export default function AdminProductsCreate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<CreateProductDto>({
    name: "",
    description: "",
    price: 0,
    compareAtPrice: null,
    categoryId: "",
    sku: "",
    barcode: null,
    inventoryQuantity: 0,
    isActive: true,
    isFeatured: false,
    images: [],
    weight: null,
    dimensions: null,
    metaTitle: null,
    metaDescription: null,
  })
  const [productImages, setProductImages] = useState<Array<File | string>>([])

  // API hooks
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery()
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()

  const categories = categoriesData?.data?.categories || []

  const buildProductFormData = (): FormData => {
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    if (formData.description) formDataToSend.append("description", formData.description)
    formDataToSend.append("price", String(formData.price))
    if (formData.compareAtPrice) formDataToSend.append("compareAtPrice", String(formData.compareAtPrice))
    formDataToSend.append("categoryId", formData.categoryId)
    formDataToSend.append("sku", formData.sku)
    if (formData.barcode) formDataToSend.append("barcode", formData.barcode)
    formDataToSend.append("inventoryQuantity", String(formData.inventoryQuantity))
    formDataToSend.append("isActive", String(formData.isActive))
    formDataToSend.append("isFeatured", String(formData.isFeatured))
    if (formData.weight) formDataToSend.append("weight", String(formData.weight))
    if (formData.metaTitle) formDataToSend.append("metaTitle", formData.metaTitle)
    if (formData.metaDescription) formDataToSend.append("metaDescription", formData.metaDescription)

    // Add images
    productImages.forEach((img, index) => {
      if (img instanceof File) {
        formDataToSend.append(`imageFiles[${index}]`, img)
      } else if (typeof img === "string") {
        formDataToSend.append(`imageUrls[${index}]`, img)
      }
    })

    return formDataToSend
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const hasImages = productImages.length > 0
      const body = hasImages ? buildProductFormData() : formData
      const response = await createProduct(body as CreateProductDto).unwrap()
      if (response.status) {
        showSuccessToast("Product created successfully!")
        navigate("/admin/products")
      } else {
        showErrorModal("Error", response.message || "Failed to create product")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create product")
    }
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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 hover:bg-cgrey-100 rounded-lg text-cdark-500 hover:text-cdark-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h4 className="text-xl font-semibold">Add New Product</h4>
            <p className="text-sm text-cdark-500 mt-1">Create a new product for your store</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Compare at Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.compareAtPrice || ""}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: parseFloat(e.target.value) || null })}
                  className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">SKU *</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.inventoryQuantity}
                  onChange={(e) => setFormData({ ...formData, inventoryQuantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Images and Settings */}
          <div className="space-y-4">
            {/* Images Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Images</label>
                <span className="text-xs text-cdark-500">{productImages.length} added</span>
              </div>
              <div className="space-y-2">
                {productImages.map((img, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-cgrey-50 rounded-lg">
                    <div className="flex-1">
                      <ImageUpload
                        value={img}
                        onChange={(newValue) => {
                          const newImages = [...productImages]
                          newImages[index] = newValue || ""
                          setProductImages(newImages)
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setProductImages(productImages.filter((_, i) => i !== index))}
                      className="p-1.5 text-cdark-500 hover:text-error-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setProductImages([...productImages, ""])}
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Image
                </Button>
              </div>
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-cdark-300 text-cblue-600 focus:ring-cblue-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium">Featured Product</label>
              </div>
            </div>

            {/* Additional Fields */}
            <div>
              <label className="block text-sm font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.01"
                value={formData.weight || ""}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || null })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Barcode</label>
              <input
                type="text"
                value={formData.barcode || ""}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value || null })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="border-t pt-6">
          <h5 className="text-lg font-medium mb-4">SEO Settings</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle || ""}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value || null })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Meta Description</label>
              <input
                type="text"
                value={formData.metaDescription || ""}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value || null })}
                className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Link to="/admin/products">
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </Link>
          <Button variant="primary" type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}