import { useState } from "react"
import { Link } from "react-router-dom"
import { useForgotPasswordMutation } from "@/api/auth.api"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    
    try {
      const response = await forgotPassword({ email }).unwrap()
      if (response.status) {
        setIsSubmitted(true)
      } else {
        setErrorMsg(response.message || "Failed to send reset email")
      }
    } catch (error: any) {
      setErrorMsg(error.data?.message || error.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-[#F5F0EB]">
        <div className="max-w-md w-full mx-auto">
          {/* Back link */}
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#8B7355] mb-10 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
          
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-2xl font-serif text-[#2D2A26]">Everything Florence</h1>
          </div>
          
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-[#2D2A26] mb-2">Reset Password</h2>
            <p className="text-[#6B6560] text-sm">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>
          
          {/* Success state */}
          {isSubmitted ? (
            <div className="p-6 bg-[#8B7355]/10 border border-[#8B7355]/20 rounded-2xl">
              <p className="text-[#2D2A26] font-medium mb-2">Check your email</p>
              <p className="text-[#6B6560] text-sm mb-4">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
              <Link 
                to="/login" 
                className="text-[#8B7355] hover:text-[#6B5A4A] font-medium text-sm transition-colors"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <>
              {/* Error Message */}
              {errorMsg && (
                <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 text-[#DC2626] rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
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
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-[#8B7355] hover:bg-[#6B5A4A] text-white font-medium rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#8B7355]/20"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
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
