import { authService } from '../services/authService'
import {
  requestOtpStart,
  requestOtpSuccess,
  requestOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  refreshTokenSuccess,
  completeOnboarding,
  updateProfile,
  logout as logoutAction
} from './authSlice'

// Request OTP action
export const requestOtp = (data) => async (dispatch) => {
  dispatch(requestOtpStart())

  try {
    const response = await authService.requestOtp(data)
    data.message = response.message
    dispatch(requestOtpSuccess(data))
    return { success: true, data: response }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to send OTP'
    dispatch(requestOtpFailure(errorMessage))
    return { success: false, error: errorMessage }
  }
}

// Verify OTP action
export const verifyOtp = (data) => async (dispatch) => {
  dispatch(verifyOtpStart())

  try {
    const response = await authService.verifyOtp(data)
    console.log('response from request', response)
    dispatch(verifyOtpSuccess({
      user: response.user,
      accessToken: response.tokens.accessToken,
      refreshToken: response.tokens.refreshToken
    }))
    return { success: true, data: response }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Invalid OTP'
    dispatch(verifyOtpFailure(errorMessage))
    return { success: false, error: errorMessage }
  }
}

// Refresh token action
export const refreshToken = (refreshToken) => async (dispatch) => {
  try {
    const response = await authService.refreshToken(refreshToken)
    dispatch(refreshTokenSuccess({
      accessToken: response.accessToken
    }))
    return { success: true, data: response }
  } catch (error) {
    // If refresh fails, logout user
    dispatch(logoutAction())
    return { success: false, error: 'Session expired' }
  }
}

// Complete onboarding action
export const completeOnboardingAction = (userId, onboardingData) => async (dispatch) => {
  try {
    const response = await authService.completeOnboarding(userId, onboardingData)
    dispatch(completeOnboarding(response.user || response))
    return { success: true, data: response }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to complete onboarding'
    return { success: false, error: errorMessage }
  }
}

// Update profile action
export const updateProfileAction = (profileData) => async (dispatch) => {
  try {
    const response = await authService.updateProfile(profileData)
    dispatch(updateProfile(response.user))
    return { success: true, data: response }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update profile'
    return { success: false, error: errorMessage }
  }
}

// Logout action
export const logout = () => async (dispatch) => {
  try {
    await authService.logout()
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    dispatch(logoutAction())
  }
}

// Initialize auth from cookies (for app startup)
export const initializeAuth = () => (dispatch) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')

  if (accessToken && refreshToken) {
    // Verify token and get user data
    authService.getProfile()
      .then(response => {
        dispatch(verifyOtpSuccess({
          user: response.user,
          accessToken,
          refreshToken
        }))
      })
      .catch(() => {
        // If profile fetch fails, try to refresh token
        // dispatch(refreshToken(refreshToken))
      })
  }
}