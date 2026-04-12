export default function About() {
  const highlights = [
    {
      icon: "/images/section/icon-quality.svg",
      title: "Wholesale Focus",
      desc: "We supply fashion and lifestyle items in wholesale quantities for resellers and bulk buyers.",
    },
    {
      icon: "/images/section/icon-shop.svg",
      title: "Wide Product Range",
      desc: "From bags, slippers, and heels to souvenirs, kitchen gadgets, and accessories.",
    },
    {
      icon: "/images/section/icon-ship.svg",
      title: "Fast Ordering Channels",
      desc: "Shop through our website, join our Telegram wholesale group, or chat with the team directly.",
    },
  ]

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
            Everything Florence is a wholesale store in Ibadan built for customers who want reliable access to
            trendy fashion and lifestyle products at reseller-friendly prices. We serve bulk buyers looking for
            items that move fast and stay affordable.
          </p>
          <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
          <p className="text-cdark-600 mb-4">
            Our mission is to make wholesale shopping easier for business owners by offering a broad mix of
            everyday bestsellers including bags, slippers, heels, souvenirs, kitchen gadgets, and accessories.
            We focus on practical products, fair pricing, and simple ordering channels.
          </p>
          <h2 className="text-xl font-semibold mb-3">Who We Serve</h2>
          <p className="text-cdark-600 mb-4">
            Everything Florence is focused on wholesale customers. Our store is designed for resellers, vendors,
            and shoppers buying in quantity, with a clear no-end-user policy across our public channels.
          </p>
          <h2 className="text-xl font-semibold mb-3">Visit or Connect With Us</h2>
          <p className="text-cdark-600 mb-4">
            You can visit us at No 7 Abimbola Way, opposite Kazzy Studio, Felele, Ibadan, browse products on our
            online store, or stay updated through Telegram and social media.
          </p>
          <h2 className="text-xl font-semibold mb-3">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {highlights.map((item) => (
              <div key={item.title} className="text-center p-6 bg-cgrey-50 rounded-xl">
                <img src={item.icon} alt={item.title} className="w-10 h-10 mx-auto mb-3" />
                <h6 className="font-semibold mb-1">{item.title}</h6>
                <p className="text-sm text-cdark-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://everythingflorences.myshopify.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cdark-200 p-4 hover:border-cblue-500 transition-colors"
            >
              <h6 className="font-semibold mb-1">Shop Online</h6>
              <p className="text-sm text-cdark-500">Browse our current products on the storefront.</p>
            </a>
            <a
              href="https://t.me/everythingflorencewholesales"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cdark-200 p-4 hover:border-cblue-500 transition-colors"
            >
              <h6 className="font-semibold mb-1">Join Our Telegram Group</h6>
              <p className="text-sm text-cdark-500">Get updates, product drops, and wholesale community access.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
