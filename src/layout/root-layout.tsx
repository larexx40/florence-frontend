import { Outlet } from "react-router-dom"
import Navbar from "@/ui/navigation/navbar"

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-cdark-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Contact</h4>
              <ul className="space-y-2 text-sm text-cdark-300">
                <li>123 Yarran st, Punchbowl, NSW 2196, Australia</li>
                <li>(64) 8342 1245</li>
                <li>support@everythingflorence.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-sm text-cdark-300 mb-3">Get the latest news about trends, promotions, and much more!</p>
              <form className="flex">
                <input type="email" placeholder="Email address" className="flex-1 px-3 py-2 rounded-l-lg bg-cdark-800 text-white text-sm border border-cdark-700 focus:outline-none focus:border-cblue-500" />
                <button type="submit" className="px-4 py-2 bg-cblue-600 text-white rounded-r-lg hover:bg-cblue-700 text-sm">
                  →
                </button>
              </form>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm text-cdark-300">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/shop" className="hover:text-white transition-colors">Our Store</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-cdark-300">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policies</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="/returns" className="hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ&apos;s</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cdark-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cdark-400">Copyright © 2025 by <span className="font-medium text-white">Everything Florence.</span> All Rights Reserved.</p>
            <div className="flex items-center gap-3">
              <img src="/images/payment/Visa.png" alt="Visa" className="h-6" />
              <img src="/images/payment/Mastercard.png" alt="Mastercard" className="h-6" />
              <img src="/images/payment/ApplePay.png" alt="Apple Pay" className="h-6" />
              <img src="/images/payment/GooglePay.png" alt="Google Pay" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
