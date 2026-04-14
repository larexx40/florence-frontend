import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store.index"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login, but save where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access if specified
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    // User doesn't have required role
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
