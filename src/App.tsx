import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "@/store/store.index"
import RootLayout from "@/layout/root-layout"
import Home from "@/pages/home/home"
import Shop from "@/pages/shop/shop"
import ProductDetail from "@/pages/product/product-detail"
import About from "@/pages/about/about"
import Contact from "@/pages/contact/contact"
import Login from "@/pages/auth/login"

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
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
