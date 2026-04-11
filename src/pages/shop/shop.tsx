import { useState, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { mockProducts } from "@/mockdata/product/products"
import ProductCard from "@/components/shared/product-card"
import Button from "@/ui/button/button"
import Icon, { HEROICONS } from "@/ui/icons/icon"

const categories = ["All", "Tops", "Women", "Men", "Accessories"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState("Featured")
  const categoryParam = searchParams.get("category") || "All"
  const activeCategory = categories.find((c) => c.toLowerCase() === categoryParam.toLowerCase()) || "All"

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]
    if (activeCategory !== "All") {
      products = products.filter((p) => p.category === activeCategory || p.categorySlug === activeCategory.toLowerCase())
    }
    if (sortBy === "Price: Low to High") products.sort((a, b) => a.price - b.price)
    if (sortBy === "Price: High to Low") products.sort((a, b) => b.price - a.price)
    return products
  }, [activeCategory, sortBy])

  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category")
    } else {
      searchParams.set("category", cat.toLowerCase())
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="container mx-auto py-10 mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-8">Shop</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-cblue-600 text-white" : "bg-cdark-100 text-cdark-700 hover:bg-cdark-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-lg border border-cdark-200 text-sm bg-white focus:outline-none focus:border-cblue-500"
        >
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-cdark-500 mb-6">{filteredProducts.length} products</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-cdark-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
