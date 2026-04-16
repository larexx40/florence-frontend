import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { Eye, EyeOff } from "lucide-react"
import { showErrorModal, showSuccessToast } from "@/utils/swal"
import { login } from "@/store/slices/auth.slice"
import { useLoginMutation } from "@/api/auth.api"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginMutation, { isLoading }] = useLoginMutation()
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await loginMutation({ email, password }).unwrap()
      
      if (!response.status) {
        showErrorModal('Login Failed', response.message || "Login failed")
        return
      }
      
      const { accessToken, refreshToken, user } = response.data
      
      const expiresDays = rememberMe ? 30 : 7
      Cookies.set("token", accessToken, { expires: expiresDays })
      Cookies.set("refreshToken", refreshToken, { expires: 30 })
      
      dispatch(login({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
      }))
      
      // Show success toast
      showSuccessToast(`Welcome back, ${user.firstName}!`)
      
      const isAdmin = ["SUPER_ADMIN", "ADMIN", "SUPPORT", "LOGISTICS"].includes(user.role)
      if (isAdmin) {
        navigate("/admin")
      } else {
        navigate(from, { replace: true })
      }
    } catch (error: any) {
      showErrorModal(
        'Login Failed',
        error.data?.message || error.message || "Invalid credentials. Please try again."
      )
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-[#F5F0EB]">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-2xl font-serif text-[#2D2A26]">Everything Florence</h1>
          </div>
          
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-[#2D2A26] mb-2">Welcome Back</h2>
            <p className="text-[#6B6560] text-sm">Sign in to your account to continue</p>
          </div>
          
          
          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-white border-0 rounded-2xl text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 transition-all"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>
            
            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[#6B6560] uppercase tracking-wide mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white border-0 rounded-2xl text-[#2D2A26] placeholder-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/30 transition-all"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A29E] hover:text-[#6B6560] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D4CFC9] text-[#8B7355] focus:ring-[#8B7355]/30"
                />
                <span className="text-sm text-[#6B6560]">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#8B7355] hover:text-[#6B5A4A] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#8B7355] hover:bg-[#6B5A4A] text-white font-medium rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#8B7355]/20"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          {/* Footer */}
          <p className="text-center text-sm text-[#6B6560] mt-8">
            Don&apos;t have an account?{" "}
            <Link to="/contact" className="text-[#8B7355] hover:text-[#6B5A4A] font-medium underline underline-offset-4 transition-colors">
              Contact admin
            </Link>
          </p>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80')` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A26]/40 via-transparent to-transparent" />
        </div>
        
        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <blockquote className="text-white/90 text-lg font-light leading-relaxed max-w-md">
            &ldquo;Bringing the finest selection of products to your doorstep with care and elegance.&rdquo;
          </blockquote>
          <p className="text-white/70 text-sm mt-4">— Everything Florence Team</p>
        </div>
      </div>
    </div>
  )
}
