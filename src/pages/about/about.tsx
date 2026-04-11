export default function About() {
  return (
    <div className="container mx-auto py-10 mt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">About Us</h1>
        <div className="rounded-2xl overflow-hidden mb-8">
          <img src="/images/section/about.jpg" alt="About" className="w-full h-[400px] object-cover" />
        </div>
        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-3">Our Story</h2>
          <p className="text-cdark-600 mb-4">
            Everything Florence was born from a passion for bringing the finest fashion and lifestyle products
            to discerning customers worldwide. We believe that style should be accessible, sustainable, and
            always evolving.
          </p>
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-cdark-600 mb-4">
            To curate a collection that speaks to every individual&apos;s unique style, offering premium quality
            at competitive prices. We partner with trusted brands and artisans who share our commitment to
            craftsmanship and ethical practices.
          </p>
          <h2 className="text-xl font-semibold mb-3">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {[
              { icon: "/images/section/icon-quality.svg", title: "Premium Quality", desc: "Every product is carefully selected and quality-checked." },
              { icon: "/images/section/icon-ship.svg", title: "Fast Delivery", desc: "Free shipping on orders over $50 with express options." },
              { icon: "/images/section/icon-return.svg", title: "Easy Returns", desc: "60-day hassle-free return policy on all items." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-cgrey-50 rounded-xl">
                <img src={item.icon} alt={item.title} className="w-10 h-10 mx-auto mb-3" />
                <h6 className="font-semibold mb-1">{item.title}</h6>
                <p className="text-sm text-cdark-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
