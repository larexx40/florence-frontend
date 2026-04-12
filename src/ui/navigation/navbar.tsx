import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store/store.index"
import { toggleCart } from "@/store/slices/cart.slice"
import Icon, { HEROICONS } from "@/ui/icons/icon"
import { useState } from "react"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const dispatch = useDispatch()
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-cdark-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon icon={mobileOpen ? HEROICONS.CLOSE : HEROICONS.MENU} size={24} />
          </button>

          <Link to="/" className="flex-shrink-0">
            <img src="/images/logo/logo.png" alt="Everything Florence" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="text-sm font-medium text-cdark-700 hover:text-cblue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-cblue-600 transition-colors">
              <Icon icon={HEROICONS.SEARCH} size={20} />
            </button>
            <Link to="/account" className="p-2 hover:text-cblue-600 transition-colors">
              <Icon icon={HEROICONS.USER} size={20} />
            </Link>
            <Link to="/wishlist" className="p-2 hover:text-cblue-600 transition-colors">
              <Icon icon={HEROICONS.HEART} size={20} />
            </Link>
            <button className="p-2 relative hover:text-cblue-600 transition-colors" onClick={() => dispatch(toggleCart())}>
              <Icon icon={HEROICONS.CART} size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cblue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-cdark-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-sm font-medium text-cdark-700 hover:text-cblue-600"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
