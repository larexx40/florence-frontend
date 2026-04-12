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
import AdminDashboard from "@/pages/admin/dashboard/admin-dashboard"
import AdminProducts from "@/pages/admin/products/admin-products"
import AdminOrders from "@/pages/admin/orders/admin-orders"
import AdminUsers from "@/pages/admin/users/admin-users"
import AdminCategories from "@/pages/admin/categories/admin-categories"
import AdminCoupons from "@/pages/admin/coupons/admin-coupons"
import AdminSettings from "@/pages/admin/settings/admin-settings"

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="add-product" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="add-category" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="order-detail" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="add-user" element={<AdminUsers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="create-coupon" element={<AdminCoupons />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="reports" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
