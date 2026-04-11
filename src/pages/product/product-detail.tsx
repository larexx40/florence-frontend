import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { mockProducts } from "@/mockdata/product/products"
import Button from "@/ui/button/button"
import Icon, { HEROICONS } from "@/ui/icons/icon"
import { cn } from "@/lib/utils"

export default function ProductDetail() {
  const { slug } = useParams()
  const product = mockProducts.find((p) => p.slug === slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Link to="/shop"><Button variant="primary">Back to Shop</Button></Link>
      </div>
    )
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="container mx-auto py-10 mt-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-cgrey mb-4">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors",
                    idx === selectedImage ? "border-cblue-600" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-cdark-900">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-cdark-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
                <span className="bg-error-100 text-error-700 text-sm font-medium px-2 py-0.5 rounded">{discount}% Off</span>
              </>
            )}
          </div>

          <p className="text-cdark-600 mb-6">{product.description}</p>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">
                Color: <span className="text-cdark-500">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(idx)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      idx === selectedColor ? "border-cblue-600 scale-110" : "border-cdark-200"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">
                Size: <span className="text-cdark-500">{selectedSize || "Select"}</span>
              </p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "border-cblue-600 bg-cblue-50 text-cblue-700"
                        : "border-cdark-200 hover:border-cdark-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-cdark-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-cdark-50"
              >
                <Icon icon={HEROICONS.MINUS} size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-cdark-50"
              >
                <Icon icon={HEROICONS.PLUS} size={16} />
              </button>
            </div>
            <Button variant="primary" className="flex-1">Add to Cart</Button>
          </div>

          <Button variant="primary" className="w-full bg-cdark-900 hover:bg-cdark-800">
            Buy It Now
          </Button>
        </div>
      </div>
    </div>
  )
}
