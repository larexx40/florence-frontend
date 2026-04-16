import { useState } from "react"
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useAttachImageMutation, useUploadProductImageMutation } from "@/api/product.api"
import { useGetCategoriesQuery } from "@/api/category.api"
import { Pencil, Trash2, X, Eye, Plus } from "lucide-react"
import Button from "@/ui/button/button"
import ImageUpload from "@/ui/image-upload/image-upload"
import EmptyState from "@/ui/empty-state/empty-state"
import { showSuccessToast, showErrorToast, showConfirmModal, showErrorModal } from "@/utils/swal"
import type { ProductDto, CreateProductDto, UpdateProductDto } from "@/@types/product-api.type"

export default function AdminProducts() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null)

  // Form states
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
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false)

  // API hooks
  const { data: productsData, isLoading: isLoadingProducts, refetch } = useGetProductsQuery()
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery()
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()
  const [attachImage, { isLoading: isAttachingImage }] = useAttachImageMutation()
  const [uploadProductImage, { isLoading: isUploadingImage }] = useUploadProductImageMutation()

  const products = productsData?.data?.products || []
  const categories = categoriesData?.data?.categories || []

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    return category?.name || "Uncategorized"
  }

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const hasImages = productImages.length > 0
      const body = hasImages ? buildProductFormData() : formData
      const response = await createProduct(body as CreateProductDto).unwrap()
      if (response.status) {
        showSuccessToast("Product created successfully!")
        setIsAddModalOpen(false)
        setFormData({
          name: "", description: "", price: 0, compareAtPrice: null,
          categoryId: "", sku: "", barcode: null, inventoryQuantity: 0,
          isActive: true, isFeatured: false, images: [], weight: null,
          dimensions: null, metaTitle: null, metaDescription: null,
        })
        setProductImages([])
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to create product")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to create product")
    }
  }

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct) return

    try {
      const updateData: UpdateProductDto = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        compareAtPrice: formData.compareAtPrice,
        categoryId: formData.categoryId,
        inventoryQuantity: formData.inventoryQuantity,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      }
      const response = await updateProduct({ id: selectedProduct.id, body: updateData }).unwrap()
      if (response.status) {
        showSuccessToast("Product updated successfully!")
        setIsEditModalOpen(false)
        setSelectedProduct(null)
        refetch()
      } else {
        showErrorModal("Error", response.message || "Failed to update product")
      }
    } catch (error: any) {
      showErrorModal("Error", error.data?.message || "Failed to update product")
    }
  }

  const handleDeleteProduct = async (product: ProductDto) => {
    const result = await showConfirmModal(
      "Delete Product",
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`,
      "Delete",
      "Cancel"
    )

    if (result.isConfirmed) {
      try {
        const response = await deleteProduct(product.id).unwrap()
        if (response.status) {
          showSuccessToast("Product deleted successfully!")
          refetch()
        } else {
          showErrorToast(response.message || "Failed to delete product")
        }
      } catch (error: any) {
        showErrorToast(error.data?.message || "Failed to delete product")
      }
    }
  }

  const handleToggleStatus = async (product: ProductDto) => {
    try {
      const updateData: UpdateProductDto = { isActive: !product.isActive }
      const response = await updateProduct({ id: product.id, body: updateData }).unwrap()
      if (response.status) {
        showSuccessToast(`Product ${response.data?.isActive ? "activated" : "deactivated"} successfully!`)
        refetch()
      } else {
        showErrorToast(response.message || "Failed to update product status")
      }
    } catch (error: any) {
      showErrorToast(error.data?.message || "Failed to update product status")
    }
  }

  const openEditModal = (product: ProductDto) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      categoryId: product.categoryId,
      sku: product.sku,
      barcode: product.barcode,
      inventoryQuantity: product.inventoryQuantity,
      isActive: product.isActive,
      isFeatured: product.isFeatured,
      images: product.images || [],
      weight: product.weight,
      dimensions: product.dimensions,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
    })
    setProductImages([])
    setIsEditModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setFormData({
      name: "", description: "", price: 0, compareAtPrice: null,
      categoryId: "", sku: "", barcode: null, inventoryQuantity: 0,
      isActive: true, isFeatured: false, images: [], weight: null,
      dimensions: null, metaTitle: null, metaDescription: null,
    })
    setProductImages([])
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setSelectedProduct(null)
    setProductImages([])
  }

  if (isLoadingProducts || isLoadingCategories) {
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
            <h4 className="text-xl font-semibold">Products List</h4>
            <p className="text-sm text-cdark-500 mt-1">{products.length} products</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Export</Button>
            <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Add Product
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cdark-200">
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Image</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Product Name</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Category</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Price</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Stock</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Status</th>
                <th className="text-left py-3 px-2 font-medium text-cdark-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8">
                    <EmptyState
                      title="No products found"
                      description="Get started by creating your first product"
                    />
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                <tr key={product.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                  <td className="py-3 px-2">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-12 h-14 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-14 rounded-lg bg-cgrey-200 flex items-center justify-center text-cdark-400">
                        <i className="ri-image-line" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-2 font-medium text-cdark-900">{product.name}</td>
                  <td className="py-3 px-2 text-cdark-600">{getCategoryName(product.categoryId || "")}</td>
                  <td className="py-3 px-2 text-cdark-900 font-medium">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-cdark-600">{product.inventoryQuantity}</td>
                  <td className="py-3 px-2">
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        product.isActive
                          ? "bg-success-50 text-success-700 hover:bg-success-100"
                          : "bg-error-50 text-error-700 hover:bg-error-100"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
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

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add New Product</h3>
                <button onClick={closeAddModal} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Inventory Quantity</label>
                    <input
                      type="number"
                      value={formData.inventoryQuantity}
                      onChange={(e) => setFormData({ ...formData, inventoryQuantity: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded border-cdark-300"
                    />
                    <label htmlFor="isFeatured" className="text-sm">Featured</label>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Product"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Edit Product</h3>
                <button onClick={closeEditModal} className="text-cdark-500 hover:text-cdark-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleEditProduct} className="space-y-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Inventory Qty</label>
                    <input
                      type="number"
                      value={formData.inventoryQuantity}
                      onChange={(e) => setFormData({ ...formData, inventoryQuantity: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-cdark-200 focus:outline-none focus:border-cblue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="editIsFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded border-cdark-300"
                    />
                    <label htmlFor="editIsFeatured" className="text-sm">Featured</label>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button variant="secondary" onClick={closeEditModal}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Product"}
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
