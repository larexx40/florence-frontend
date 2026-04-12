import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { mockProducts } from "@/mockdata/product/products"
import { collectionCategories } from "@/mockdata/category/categories"
import { categoryTabs } from "@/mockdata/category/categories"
import { heroSlides } from "@/mockdata/slider/sliders"
import ProductCard from "@/components/shared/product-card"
import SocialLinks from "@/components/shared/social-links"
import { BUSINESS_DETAILS } from "@/constants/business"
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

  const bestSellers = mockProducts.slice(0, 6)
  const todaysPicks = mockProducts.slice(6)
  const activeCategories = categoryTabs.find((t) => t.value === activeCategoryTab)?.categories || []
  const quickActions = [
    {
      title: "Wholesale Orders",
      desc: "Chat with us directly for reseller orders and bulk enquiries.",
      href: BUSINESS_DETAILS.whatsappOrderUrl,
      cta: "Order on WhatsApp",
    },
    {
      title: "Visit the Shop",
      desc: BUSINESS_DETAILS.address,
      href: BUSINESS_DETAILS.mapUrl,
      cta: "Get Directions",
    },
    {
      title: "Stay Updated",
      desc: "Join our Telegram community and follow new arrivals across our social pages.",
      href: BUSINESS_DETAILS.telegramUrl,
      cta: "Join Telegram",
    },
  ]

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[520px] sm:h-[620px] md:h-[700px] overflow-hidden bg-cdark-900">
        {heroSlides.map((s, idx) => (
          <div
            key={s.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              idx === currentSlide ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
            )}
          >
            <img
              src={s.image}
              alt={s.heading}
              className={cn(
                "w-full h-full object-cover",
                idx === 0 && "object-[72%_center] sm:object-center",
                idx === 1 && "object-[68%_center] sm:object-center",
                idx === 2 && "object-[92%_center] sm:object-center"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20 sm:bg-black/30" />
            <div className={cn(
              "absolute inset-0 flex items-end sm:items-center",
              s.alignment === "right" ? "justify-end" : "justify-start"
            )}>
              <div className="container mx-auto px-4 pb-12 sm:pb-0">
                <div className={cn(
                  "max-w-sm rounded-2xl bg-black/30 p-5 backdrop-blur-[2px] sm:max-w-lg sm:rounded-none sm:bg-transparent sm:p-0 sm:backdrop-blur-0",
                  s.alignment === "right" && "ml-auto"
                )}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 sm:mb-3 sm:text-sm sm:tracking-[0.28em]">Wholesale Store in Ibadan</p>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-3 sm:mb-4">
                    Everything Florence
                  </h2>
                  <p className="text-sm sm:text-lg text-white/80 mb-2 sm:mb-3">{BUSINESS_DETAILS.description}</p>
                  <p className="text-xs sm:text-sm text-white/70 mb-5 sm:mb-6">{BUSINESS_DETAILS.productSummary}</p>
                  <Link to="/shop">
                    <Button variant="primary" className="w-full sm:w-auto bg-white text-cdark-900 hover:bg-cdark-100">
                      Shop Now
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
          {["Wholesale only", "Bags, slippers, heels, gadgets, and accessories", "Join our Telegram group for updates"].map((text, i) => (
            <span key={i} className="mx-8 text-sm flex items-center gap-4">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-cblue-400" />
            </span>
          ))}
          {["Wholesale only", "Bags, slippers, heels, gadgets, and accessories", "Join our Telegram group for updates"].map((text, i) => (
            <span key={`dup-${i}`} className="mx-8 text-sm flex items-center gap-4">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-cblue-400" />
            </span>
          ))}
        </div>
      </div>

      <section className="bg-cgrey-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cdark-200 bg-white p-6 transition-colors hover:border-cblue-500"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cblue-600">{item.title}</p>
                <p className="mb-4 text-sm text-cdark-600">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-cdark-900">
                  {item.cta}
                  <Icon icon={HEROICONS.ARROW_RIGHT} size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

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
            <img src="/images/banner/fashion-1.jpg" alt="Everything Florence wholesale collection" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center">
              <div>
                <p className="text-lg font-medium text-white/80 mb-2">WHOLESALE COLLECTION</p>
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-2">Shop Trending Stock for Resale</h2>
                <p className="text-md font-medium text-white/80 mb-6">
                  Visit our store, order on WhatsApp, and subscribe for promotion alerts.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/shop">
                    <Button variant="primary" className="bg-white text-cdark-900 hover:bg-cdark-100">
                      Browse Products
                    </Button>
                  </Link>
                  <a href={BUSINESS_DETAILS.mapUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="border border-white/40 bg-white/10 text-white hover:bg-white/20">
                      Find the Store
                    </Button>
                  </a>
                </div>
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
              { icon: "/images/section/icon-shop.svg", title: "Wholesale Ready", desc: "Built for bulk buyers, vendors, and resellers." },
              { icon: "/images/section/icon-ship.svg", title: "Fast Ordering", desc: "Shop online or place quick orders on WhatsApp." },
              { icon: "/images/section/icon-quality.svg", title: "Everyday Bestsellers", desc: "Popular items across fashion and home essentials." },
              { icon: "/images/section/icon-prices.svg", title: "Reseller Pricing", desc: "Competitive rates for profitable restocking." },
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
          <h4 className="text-2xl font-semibold mb-3">Join Our Promo Mailing List</h4>
          <p className="text-cdark-500 mb-6">
            Subscribe for wholesale promo updates, restocks, and fresh product drops from Everything Florence.
          </p>
          <form
            action={BUSINESS_DETAILS.newsletterActionUrl}
            method="post"
            target="_blank"
            className="flex max-w-md mx-auto"
          >
            <input type="hidden" name="form_type" value="customer" />
            <input type="hidden" name="utf8" value="true" />
            <input type="hidden" name="contact[tags]" value="newsletter,website" />
            <input
              type="email"
              name="contact[email]"
              required
              placeholder="Email address"
              className="flex-1 px-4 py-3 rounded-l-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
            />
            <button type="submit" className="px-6 py-3 bg-cblue-600 text-white rounded-r-lg hover:bg-cblue-700 text-sm font-medium">
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </section>
    </div>
  )
}
