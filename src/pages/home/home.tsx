import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { mockProducts } from "@/mockdata/product/products"
import { collectionCategories } from "@/mockdata/category/categories"
import { categoryTabs } from "@/mockdata/category/categories"
import { heroSlides } from "@/mockdata/slider/sliders"
import ProductCard from "@/components/shared/product-card"
import Button from "@/ui/button/button"
import Icon, { HEROICONS } from "@/ui/icons/icon"
import { cn } from "@/lib/utils"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeCategoryTab, setActiveCategoryTab] = useState("women")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]
  const bestSellers = mockProducts.slice(0, 6)
  const todaysPicks = mockProducts.slice(6)
  const activeCategories = categoryTabs.find((t) => t.value === activeCategoryTab)?.categories || []

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-cdark-900">
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              idx === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <img src={s.image} alt={s.heading} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className={cn(
              "absolute inset-0 flex items-center",
              s.alignment === "right" ? "justify-end" : "justify-start"
            )}>
              <div className="container mx-auto px-4">
                <div className={cn(
                  "max-w-lg",
                  s.alignment === "right" && "ml-auto"
                )}>
                  <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4" dangerouslySetInnerHTML={{ __html: s.heading.replace(" ", "<br/>") }} />
                  <p className="text-lg text-white/80 mb-6">{s.subheading}</p>
                  <Link to={s.ctaLink}>
                    <Button variant="primary" className="bg-white text-cdark-900 hover:bg-cdark-100">
                      {s.ctaText}
                      <Icon icon={HEROICONS.ARROW_RIGHT} size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                idx === currentSlide ? "bg-white" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </section>

      {/* Top Bar Marquee */}
      <div className="bg-cdark-900 text-white py-2 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {["Return extended to 60 days", "Life-time Guarantee", "Limited-Time Offer"].map((text, i) => (
            <span key={i} className="mx-8 text-sm flex items-center gap-4">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-cblue-400" />
            </span>
          ))}
          {["Return extended to 60 days", "Life-time Guarantee", "Limited-Time Offer"].map((text, i) => (
            <span key={`dup-${i}`} className="mx-8 text-sm flex items-center gap-4">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-cblue-400" />
            </span>
          ))}
        </div>
      </div>

      {/* Collection Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {collectionCategories.map((cat) => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="group relative overflow-hidden rounded-lg aspect-square">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white text-cdark-900 px-4 py-2 rounded-lg text-sm font-medium group-hover:bg-cblue-600 group-hover:text-white transition-colors">
                    {cat.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-12 bg-cgrey-50">
        <div className="container mx-auto px-4">
          <h4 className="text-2xl font-semibold text-center mb-8">Best Sellers</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Countdown */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden h-[400px]">
            <img src="/images/banner/fashion-1.jpg" alt="Summer Sale" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <div>
                <p className="text-lg font-medium text-white/80 mb-2">SUMMER SALE</p>
                <h2 className="text-5xl font-semibold text-white mb-2">50% OFF</h2>
                <p className="text-md font-medium text-white/80 mb-6">WITH PROMOTE CODE: 12D34E</p>
                <Link to="/shop">
                  <Button variant="primary" className="bg-white text-cdark-900 hover:bg-cdark-100">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Tab */}
      <section className="py-12 bg-cgrey-50">
        <div className="container mx-auto px-4">
          <h4 className="text-2xl font-semibold text-center mb-6">Categories</h4>
          <div className="flex justify-center gap-4 mb-8">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategoryTab(tab.value)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-medium transition-colors",
                  activeCategoryTab === tab.value
                    ? "bg-cblue-600 text-white"
                    : "bg-white text-cdark-700 hover:bg-cdark-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {activeCategories.map((cat) => (
              <Link key={cat.id} to={`/shop?category=${cat.slug}`} className="group text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-3">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-sm font-medium text-cdark-700 group-hover:text-cblue-600 transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Picks */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h4 className="text-2xl font-semibold text-center mb-8">Today&apos;s Picks</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {todaysPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-cgrey-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "/images/section/icon-ship.svg", title: "Free Shipping", desc: "On orders over $50" },
              { icon: "/images/section/icon-return.svg", title: "Easy Returns", desc: "60-day return policy" },
              { icon: "/images/section/icon-quality.svg", title: "Quality Guarantee", desc: "Premium products only" },
              { icon: "/images/section/icon-prices.svg", title: "Best Prices", desc: "Competitive pricing" },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <img src={feature.icon} alt={feature.title} className="w-12 h-12 mb-3" />
                <h6 className="font-semibold text-cdark-900 mb-1">{feature.title}</h6>
                <p className="text-sm text-cdark-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-semibold mb-3">Sign Up to Our Newsletter</h4>
          <p className="text-cdark-500 mb-6">Be the first to get the latest news about trends, promotions, and much more!</p>
          <form className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-3 rounded-l-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
            />
            <button type="submit" className="px-6 py-3 bg-cblue-600 text-white rounded-r-lg hover:bg-cblue-700 text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
