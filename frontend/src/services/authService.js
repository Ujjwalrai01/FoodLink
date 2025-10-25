import axios from 'axios'

const BASE_URL = 'https://5087c0b532bb.ngrok-free.app/api/v1'

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  withCredentials: true
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }

    const token = getCookie('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getCookie('refreshToken')
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/user/refresh-token`, {
            refreshToken
          })

          const { accessToken } = response.data
          setCookie('accessToken', accessToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        document.cookie = 'accessToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
        document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

// Helper functions
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
}

// Auth service functions
export const authService = {
  // Request OTP
  requestOtp: async (data) => {
    const response = await api.post('/user/all/requestotp', data)
    return response.data
  },

  // Verify OTP
  verifyOtp: async (data) => {
    const response = await api.post('/user/all/verifyotp', data)
    return response.data
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/user/refresh-token', {
      refreshToken
    })
    return response.data
  },

  // Complete onboarding - Update user profile
  completeOnboarding: async (userId, onboardingData) => {
    const response = await api.put(`/user/all/update`, onboardingData)
    return response.data
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData)
    return response.data
  },

  // Upload document (for business users)
  uploadDocument: async (formData) => {
    const response = await api.post('/user/upload-document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile')
    console.log(response)
    return response.data
  },

  // Logout
  logout: async () => {
    const refreshToken = getCookie('refreshToken')
    if (refreshToken) {
      await api.post('/user/logout', { refreshToken })
    }
  }
}

export default api