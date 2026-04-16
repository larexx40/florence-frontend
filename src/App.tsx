import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store/store.index"
import RootLayout from "@/layout/root-layout"
import AdminLayout from "@/layout/admin-layout"
import Home from "@/pages/home/home"
import Shop from "@/pages/shop/shop"
import ProductDetail from "@/pages/product/product-detail"
import About from "@/pages/about/about"
import Contact from "@/pages/contact/contact"
import Login from "@/pages/auth/login"
import ForgotPassword from "@/pages/auth/forgot-password"
import AdminDashboard from "@/pages/admin/dashboard/admin-dashboard"
import AdminProductsList from "@/pages/admin/products/admin-products-list"
import AdminCategoriesList from "@/pages/admin/categories/admin-categories-list"
import AdminCoupons from "@/pages/admin/coupons/admin-coupons"
import AdminSettings from "@/pages/admin/settings/admin-settings"
import AdminOrders from "@/pages/admin/orders/admin-orders"
import AdminUsers from "@/pages/admin/users/admin-users"
import AdminCustomers from "@/pages/admin/customers/admin-customers"
import AdminOptions from "@/pages/admin/options/admin-options"
import Account from "@/pages/account/account"
import ProtectedRoute from "@/components/auth/protected-route"

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsList />} />
            <Route path="categories" element={<AdminCategoriesList />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="options" element={<AdminOptions />} />
            <Route path="reports" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
