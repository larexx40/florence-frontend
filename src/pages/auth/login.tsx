import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "@/store/slices/auth.slice"
import Button from "@/ui/button/button"
import Icon, { HEROICONS } from "@/ui/icons/icon"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login({ name: "User", email }))
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cgrey-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm">
        <div className="text-center mb-8">
          <img src="/images/logo/logo.png" alt="Everything Florence" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Sign In</h2>
          <p className="text-sm text-cdark-500 mt-1">Welcome back! Enter your details below.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-cdark-200 text-sm focus:outline-none focus:border-cblue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <Button variant="primary" className="w-full" type="submit">Sign In</Button>
        </form>
        <p className="text-center text-sm text-cdark-500 mt-4">
          Don&apos;t have an account? <a href="/register" className="text-cblue-600 font-medium hover:underline">Create one</a>
        </p>
      </div>
    </div>
  )
}
