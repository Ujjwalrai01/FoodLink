import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import IndividualDashboard from '../pages/Dashboard/IndividualDashboard'
import NgoDashboard from '../pages/Dashboard/NgoDashboard'
import BusinessDashboard from '../pages/Dashboard/BusinessDashboard'
import VerifierDashboard from '../pages/Dashboard/VerifierDashboard'
import AdminDashboard from '../pages/Dashboard/AdminDashboard'
import AddFood from '../pages/Food/AddFood'
import FoodFeed from '../pages/Food/FoodFeed'
import FoodDetail from '../pages/Food/FoodDetail'
// import Profile from '../pages/Profile/Profile'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRouter() {
  const { isAuthenticated, role } = useSelector((state) => state.auth)

  const getDashboardByRole = () => {
    switch (role) {
      case 'individual':
        return <IndividualDashboard />
      case 'ngo':
        return <NgoDashboard />
      case 'business':
        return <BusinessDashboard />
      case 'verifier':
        return <VerifierDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <Navigate to="/login" />
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={getDashboardByRole()} />
        <Route path="/food/add" element={<AddFood />} />
        <Route path="/food/feed" element={<FoodFeed />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRouter