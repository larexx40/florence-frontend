import { Outlet } from "react-router-dom"
import SocialLinks from "@/components/shared/social-links"
import { BUSINESS_DETAILS } from "@/constants/business"
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
                <li>{BUSINESS_DETAILS.address}</li>
                <li>Call: {BUSINESS_DETAILS.phone}</li>
                <li>WhatsApp only: {BUSINESS_DETAILS.whatsapp}</li>
                <li>Wholesale only. No end users.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Mailing List</h4>
              <p className="text-sm text-cdark-300 mb-3">Get promo drops, restock alerts, and wholesale updates in your inbox.</p>
              <form
                action={BUSINESS_DETAILS.newsletterActionUrl}
                method="post"
                target="_blank"
                className="space-y-3"
              >
                <input type="hidden" name="form_type" value="customer" />
                <input type="hidden" name="utf8" value="✓" />
                <input type="hidden" name="contact[tags]" value="newsletter,website" />
                <input
                  type="email"
                  name="contact[email]"
                  required
                  placeholder="Email address"
                  className="w-full px-3 py-2 rounded-lg bg-cdark-800 text-white text-sm border border-cdark-700 focus:outline-none focus:border-cblue-500"
                />
                <button type="submit" className="w-full px-4 py-2 bg-cblue-600 text-white rounded-lg hover:bg-cblue-700 text-sm">
                  Subscribe for Promotions
                </button>
              </form>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <p className="text-sm text-cdark-300 mb-3">Follow our socials and join the Telegram wholesale group.</p>
              <SocialLinks
                className="gap-2"
                itemClassName="border-cdark-700 bg-cdark-800 text-cdark-100 hover:border-cblue-500 hover:text-white"
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-cdark-300">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/shop" className="hover:text-white transition-colors">Our Store</a></li>
                <li><a href={BUSINESS_DETAILS.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Shopify Store</a></li>
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
