import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  volunteers: [],
  pendingDonations: [],
  receivedFood: [],
  verificationStatus: 'pending', // pending, verified, rejected
  stats: {
    totalReceived: 0,
    totalDistributed: 0,
    activeVolunteers: 0,
  }
}

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setVolunteers: (state, action) => {
      state.volunteers = action.payload
    },
    addVolunteer: (state, action) => {
      state.volunteers.push(action.payload)
    },
    removeVolunteer: (state, action) => {
      state.volunteers = state.volunteers.filter(v => v.id !== action.payload)
    },
    setPendingDonations: (state, action) => {
      state.pendingDonations = action.payload
    },
    setReceivedFood: (state, action) => {
      state.receivedFood = action.payload
    },
    setVerificationStatus: (state, action) => {
      state.verificationStatus = action.payload
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload }
    },
  },
})

export const { 
  setVolunteers, 
  addVolunteer, 
  removeVolunteer,
  setPendingDonations,
  setReceivedFood,
  setVerificationStatus,
  setStats
} = orgSlice.actions
export default orgSlice.reducer