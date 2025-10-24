import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  center: [19.0760, 72.8777], // Mumbai
  zoom: 12,
  markers: [],
  selectedMarker: null,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter: (state, action) => {
      state.center = action.payload
    },
    setZoom: (state, action) => {
      state.zoom = action.payload
    },
    setMarkers: (state, action) => {
      state.markers = action.payload
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload
    },
  },
})

export const { setCenter, setZoom, setMarkers, setSelectedMarker } = mapSlice.actions
export default mapSlice.reducer