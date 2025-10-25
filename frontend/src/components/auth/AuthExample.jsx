import { useAuth } from '../../hooks/useAuth'
import LogoutButton from './LogoutButton'

const AuthExample = () => {
  const {
    user,
    isAuthenticated,
    isOnboardingComplete,
    role,
    loading,
    isIndividual,
    isBusiness,
    isOrg
  } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please login to continue</div>
  }

  if (!isOnboardingComplete) {
    return <div>Please complete your onboarding</div>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
      
      <div className="space-y-2 mb-4">
        <p><strong>Email/Phone:</strong> {user?.email || user?.phone}</p>
        <p><strong>Role:</strong> {role}</p>
        <p><strong>Entity Type:</strong> {user?.entityType}</p>
        {user?.address && <p><strong>Address:</strong> {user.address}</p>}
        {user?.businessName && <p><strong>Business:</strong> {user.businessName}</p>}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Role-based content:</h3>
        {isIndividual && <p className="text-blue-600">Individual user content</p>}
        {isBusiness && <p className="text-green-600">Business user content</p>}
        {isOrg && <p className="text-purple-600">Organization user content</p>}
      </div>

      <LogoutButton className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" />
    </div>
  )
}

export default AuthExample