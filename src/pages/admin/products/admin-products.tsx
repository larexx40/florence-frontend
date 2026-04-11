import { Link } from "react-router-dom"
import { mockProducts } from "@/mockdata/product/products"
import StatusBadge from "@/ui/badge/status-badge"
import Button from "@/ui/button/button"

export default function AdminProducts() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-cdark-100">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-semibold">Products List</h4>
        <div className="flex gap-3">
          <Button variant="secondary">Export</Button>
          <Link to="/admin/add-product">
            <Button variant="primary">Add Product</Button>
          </Link>
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
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-b border-cdark-50 hover:bg-cgrey-50 transition-colors">
                <td className="py-3 px-2">
                  <img src={product.images[0]} alt={product.name} className="w-12 h-14 rounded-lg object-cover" />
                </td>
                <td className="py-3 px-2 font-medium text-cdark-900">{product.name}</td>
                <td className="py-3 px-2 text-cdark-600">{product.category}</td>
                <td className="py-3 px-2 text-cdark-900 font-medium">${product.price.toFixed(2)}</td>
                <td className="py-3 px-2 text-cdark-600">{product.inStock ? "In Stock" : "Out of Stock"}</td>
                <td className="py-3 px-2">
                  <StatusBadge status={product.badge === "sale" ? "Sale" : product.badge === "trending" ? "Trending" : product.badge === "new" ? "New" : "Active"} />
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/product/${product.slug}`} className="p-1.5 hover:bg-cdark-100 rounded-lg text-cdark-500 hover:text-cblue-600" title="View">
                      <i className="ri-eye-line" />
                    </Link>
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
