import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute() {
  const { isAuthenticated, isOnboardingComplete } = useSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  if (!isOnboardingComplete) {
    return <Navigate to="/onboarding" />
  }
  
  return <Outlet />
}

export default ProtectedRoute