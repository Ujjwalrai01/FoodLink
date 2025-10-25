import { createSlice } from '@reduxjs/toolkit'

// Helper function to get cookie value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Helper function to set cookie
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
}

// Helper function to delete cookie
const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

const initialState = {
  user: null,
  accessToken: getCookie('accessToken') || null,
  refreshToken: getCookie('refreshToken') || null,
  isAuthenticated: !!getCookie('accessToken'),
  role: null,
  loading: false,
  error: null,
  // OTP related states
  otpSent: false,
  otpVerified: false,
  contactInfo: {}, // stores email/phone for OTP verification
  // Onboarding states
  isOnboardingComplete: false,
  onboardingStep: 0,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // OTP Request
    requestOtpStart: (state) => {
      state.loading = true
      state.error = null
      state.otpSent = false
    },
    requestOtpSuccess: (state, action) => {
      console.log(action)
      state.loading = false
      state.otpSent = true
      state.contactInfo = action.payload
    },
    requestOtpFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.otpSent = false
    },

    // OTP Verification
    verifyOtpStart: (state) => {
      state.loading = true
      state.error = null
    },
    verifyOtpSuccess: (state, action) => {
      console.log(action)
      state.loading = false
      state.isAuthenticated = true
      state.otpVerified = true
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.role = action.payload.user.role
      state.isOnboardingComplete = action.payload.user.isOnboardingComplete || false
      // payload.user.isOnboardingComplete
      // Set cookies
      setCookie('accessToken', action.payload.accessToken)
      setCookie('refreshToken', action.payload.refreshToken)
    },
    verifyOtpFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // Token refresh
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken
      setCookie('accessToken', action.payload.accessToken)
    },

    // Onboarding
    updateOnboardingStep: (state, action) => {
      state.onboardingStep = action.payload
    },
    completeOnboarding: (state, action) => {
      state.isOnboardingComplete = true
      state.user = { ...state.user, ...action.payload, isOnboardingComplete: true }
    },

    // Profile update
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },

    // Logout
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.role = null
      state.otpSent = false
      state.otpVerified = false
      state.contactInfo = null
      state.isOnboardingComplete = false
      state.onboardingStep = 0

      // Clear cookies
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
    },

    // Clear errors
    clearError: (state) => {
      state.error = null
    },

    // Reset OTP state
    resetOtpState: (state) => {
      state.otpSent = false
      state.otpVerified = false
      state.contactInfo = null
      state.error = null
    },
  },
})

export const {
  requestOtpStart,
  requestOtpSuccess,
  requestOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  refreshTokenSuccess,
  updateOnboardingStep,
  completeOnboarding,
  updateProfile,
  logout,
  clearError,
  resetOtpState
} = authSlice.actions

export default authSlice.reducer