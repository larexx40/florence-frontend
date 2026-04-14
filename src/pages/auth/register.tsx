import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import Cookies from "js-cookie"
import { login } from "@/store/slices/auth.slice"
import { useRegisterMutation } from "@/api/auth.api"
import Button from "@/ui/button/button"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerMutation, { isLoading }] = useRegisterMutation()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match")
      return
    }
    
    try {
      const response = await registerMutation({ name, email, password }).unwrap()
      
      // Store token in cookies
      Cookies.set("token", response.token, { expires: 7 })
      
      // Update Redux state
      dispatch(login(response.user))
      
      navigate("/")
    } catch (error: any) {
      setErrorMsg(error.data?.message || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cgrey-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <img src="/images/logo/logo.png" alt="Everything Florence" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <p className="text-sm text-cdark-500 mt-1">Sign up to get started with Everything Florence.</p>
        </div>
        
        {errorMsg && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="John Doe"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="********"
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="********"
              required
              disabled={isLoading}
            />
          </div>
          <Button variant="primary" className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm text-cdark-500 mt-4">
          Already have an account? <a href="/login" className="text-cblue-600 font-medium hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
