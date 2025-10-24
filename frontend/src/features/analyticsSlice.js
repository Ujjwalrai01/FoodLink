import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  overview: {
    totalUsers: 0,
    totalNGOs: 0,
    totalBusinesses: 0,
    totalClaims: 0,
    totalDonations: 0,
  },
  activityData: [],
  impactData: {
    mealsDonated: 0,
    peopleFed: 0,
    co2Saved: 0,
  },
  chartData: {
    monthly: [],
    weekly: [],
  }
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setOverview: (state, action) => {
      state.overview = { ...state.overview, ...action.payload }
    },
    setActivityData: (state, action) => {
      state.activityData = action.payload
    },
    setImpactData: (state, action) => {
      state.impactData = { ...state.impactData, ...action.payload }
    },
    setChartData: (state, action) => {
      state.chartData = { ...state.chartData, ...action.payload }
    },
  },
})

export const { setOverview, setActivityData, setImpactData, setChartData } = analyticsSlice.actions
export default analyticsSlice.reducer