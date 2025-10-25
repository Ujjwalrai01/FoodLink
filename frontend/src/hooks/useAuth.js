import { useSelector } from 'react-redux'

export const useAuth = () => {
  const auth = useSelector(state => state.auth)
  
  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isOnboardingComplete: auth.isOnboardingComplete,
    role: auth.role,
    loading: auth.loading,
    error: auth.error,
    accessToken: auth.accessToken,
    
    // Helper functions
    isIndividual: auth.role === 'individual',
    isOrg: auth.role === 'org' || auth.role === 'ngo',
    isBusiness: auth.role === 'business' || auth.role === 'small_business',
    isVerifier: auth.role === 'verifier',
    isAdmin: auth.role === 'admin',
    
    // Auth flow states
    otpSent: auth.otpSent,
    otpVerified: auth.otpVerified,
    contactInfo: auth.contactInfo,
    onboardingStep: auth.onboardingStep
  }
}