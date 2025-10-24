import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foodItems: [],
  myDonations: [],
  myClaims: [],
  selectedFood: null,
  loading: false,
  error: null,
  filters: {
    type: 'all',
    radius: 5,
  }
}

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodItems: (state, action) => {
      state.foodItems = action.payload
    },
    addFoodItem: (state, action) => {
      state.foodItems.unshift(action.payload)
      state.myDonations.unshift(action.payload)
    },
    setMyDonations: (state, action) => {
      state.myDonations = action.payload
    },
    setMyClaims: (state, action) => {
      state.myClaims = action.payload
    },
    setSelectedFood: (state, action) => {
      state.selectedFood = action.payload
    },
    updateFoodItem: (state, action) => {
      const index = state.foodItems.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.foodItems[index] = action.payload
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { 
  setFoodItems, 
  addFoodItem, 
  setMyDonations, 
  setMyClaims, 
  setSelectedFood,
  updateFoodItem,
  setFilters,
  setLoading,
  setError 
} = foodSlice.actions
export default foodSlice.reducer