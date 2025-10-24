import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import foodReducer from '../features/foodSlice'
import mapReducer from '../features/mapSlice'
import orgReducer from '../features/orgSlice'
import verifyReducer from '../features/verifySlice'
import analyticsReducer from '../features/analyticsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    map: mapReducer,
    org: orgReducer,
    verify: verifyReducer,
    analytics: analyticsReducer,
  },
})
