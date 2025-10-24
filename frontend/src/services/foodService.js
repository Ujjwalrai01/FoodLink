import api from './api'

export const foodService = {
  // Get all food items
  getAllFood: async (filters = {}) => {
    const response = await api.get('/food', { params: filters })
    return response.data
  },

  // Get food by ID
  getFoodById: async (id) => {
    const response = await api.get(`/food/${id}`)
    return response.data
  },

  // Create new food listing
  createFood: async (foodData) => {
    const response = await api.post('/food', foodData)
    return response.data
  },

  // Update food listing
  updateFood: async (id, foodData) => {
    const response = await api.put(`/food/${id}`, foodData)
    return response.data
  },

  // Delete food listing
  deleteFood: async (id) => {
    const response = await api.delete(`/food/${id}`)
    return response.data
  },

  // Claim food
  claimFood: async (id) => {
    const response = await api.post(`/food/${id}/claim`)
    return response.data
  },

  // Get my donations
  getMyDonations: async () => {
    const response = await api.get('/food/my-donations')
    return response.data
  },

  // Get my claims
  getMyClaims: async () => {
    const response = await api.get('/food/my-claims')
    return response.data
  },
}

// ============================================
// 20. src/services/authService.js
// ============================================
import api from './api'

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData)
    return response.data
  },
}