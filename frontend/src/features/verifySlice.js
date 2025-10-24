import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pendingVerifications: [],
  completedVerifications: [],
  stats: {
    pending: 0,
    approved: 0,
    rejected: 0,
    thisWeek: 0,
  }
}

const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {
    setPendingVerifications: (state, action) => {
      state.pendingVerifications = action.payload
    },
    setCompletedVerifications: (state, action) => {
      state.completedVerifications = action.payload
    },
    approveVerification: (state, action) => {
      state.pendingVerifications = state.pendingVerifications.filter(
        v => v.id !== action.payload
      )
    },
    rejectVerification: (state, action) => {
      state.pendingVerifications = state.pendingVerifications.filter(
        v => v.id !== action.payload
      )
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
})

export const { 
  setPendingVerifications, 
  setCompletedVerifications,
  approveVerification,
  rejectVerification,
  setStats
} = verifySlice.actions
export default verifySlice.reducer