// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import { useSelector } from 'react-redux'
// import L from 'leaflet'
// import 'leaflet/dist/leaflet.css'

// // Fix for default marker icons in React-Leaflet
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })

// function MapView({ foodItems = [], height = '400px' }) {
//   const { center, zoom } = useSelector((state) => state.map)

//   return (
//     <div className="rounded-2xl overflow-hidden shadow-md" style={{ height }}>
//       <MapContainer
//         center={center}
//         zoom={zoom}
//         style={{ height: '100%', width: '100%' }}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
        
//         {foodItems.map((food) => (
//           food.coordinates && (
//             <Marker key={food.id} position={food.coordinates}>
//               <Popup>
//                 <div className="text-sm">
//                   <h3 className="font-bold mb-1">{food.title}</h3>
//                   <p className="text-gray-600 text-xs mb-1">{food.description}</p>
//                   <p className="text-primary font-semibold">{food.servings} servings</p>
//                   <button className="mt-2 bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700">
//                     View Details
//                   </button>
//                 </div>
//               </Popup>
//             </Marker>
//           )
//         ))}
//       </MapContainer>
//     </div>
//   )
// }

// export default MapView










// ============================================
// Enhanced MapView.jsx with Advanced Features
// ============================================
// import { useState, useEffect, useRef } from 'react'
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import L from 'leaflet'
// import MarkerClusterGroup from 'react-leaflet-cluster'
// import { Navigation, Locate, Layers, ZoomIn, ZoomOut, Maximize2, Search } from 'lucide-react'
// import { setCenter, setZoom } from '../features/mapSlice'
// import 'leaflet/dist/leaflet.css'

// // Fix for default marker icons
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// })

// // Custom colored marker icons
// const createCustomIcon = (color) => {
//   return L.divIcon({
//     className: 'custom-marker',
//     html: `
//       <div style="position: relative;">
//         <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
//           <path d="M16 0C7.163 0 0 7.163 0 16c0 13 16 26 16 26s16-13 16-26C32 7.163 24.837 0 16 0z" 
//                 fill="${color}" stroke="white" stroke-width="2"/>
//           <circle cx="16" cy="16" r="6" fill="white"/>
//         </svg>
//       </div>
//     `,
//     iconSize: [32, 42],
//     iconAnchor: [16, 42],
//     popupAnchor: [0, -42],
//   })
// }

// // Food category colors
// const categoryColors = {
//   cooked: '#16A34A',
//   raw: '#EAB308',
//   packaged: '#8B5CF6',
//   fruits: '#F97316',
//   bakery: '#EC4899',
//   available: '#16A34A',
//   claimed: '#EAB308',
//   completed: '#6B7280',
// }

// // Map Controls Component
// function MapControls({ onLocate, onZoomIn, onZoomOut, onFullscreen, mapStyle, setMapStyle }) {
//   return (
//     <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
//       {/* Map Style Selector */}
//       <div className="bg-white rounded-xl shadow-lg p-2">
//         <button
//           onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//           title="Change Map Style"
//         >
//           <Layers className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Location Controls */}
//       <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
//         <button
//           onClick={onLocate}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
//           title="Find My Location"
//         >
//           <Locate className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={onFullscreen}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
//           title="Fullscreen"
//         >
//           <Maximize2 className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Zoom Controls */}
//       <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
//         <button
//           onClick={onZoomIn}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
//           title="Zoom In"
//         >
//           <ZoomIn className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={onZoomOut}
//           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
//           title="Zoom Out"
//         >
//           <ZoomOut className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>
//     </div>
//   )
// }

// // Map Event Handler
// function MapEventHandler({ onLocationFound }) {
//   const map = useMap()

//   useMapEvents({
//     locationfound: (e) => {
//       onLocationFound(e.latlng)
//       map.flyTo(e.latlng, 14, { duration: 1.5 })
//     },
//   })

//   return null
// }

// // Recenter Map Component
// function RecenterMap({ center }) {
//   const map = useMap()
  
//   useEffect(() => {
//     if (center) {
//       map.setView(center, map.getZoom())
//     }
//   }, [center, map])

//   return null
// }

// // User Location Marker Component
// function UserLocationMarker({ position }) {
//   if (!position) return null

//   const userIcon = L.divIcon({
//     className: 'user-location-marker',
//     html: `
//       <div style="
//         width: 20px;
//         height: 20px;
//         background: #2563EB;
//         border: 3px solid white;
//         border-radius: 50%;
//         box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
//       "></div>
//     `,
//     iconSize: [20, 20],
//     iconAnchor: [10, 10],
//   })

//   return (
//     <>
//       <Marker position={position} icon={userIcon}>
//         <Popup>
//           <div className="text-sm font-semibold text-blue-600">
//             📍 Your Location
//           </div>
//         </Popup>
//       </Marker>
//       <Circle
//         center={position}
//         radius={500}
//         pathOptions={{
//           color: '#2563EB',
//           fillColor: '#2563EB',
//           fillOpacity: 0.1,
//           weight: 2,
//         }}
//       />
//     </>
//   )
// }

// // Main MapView Component
// function MapView({ foodItems = [], height = '400px', enableClustering = true, showRadius = false }) {
//   const { center, zoom } = useSelector((state) => state.map)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const mapRef = useRef(null)
  
//   const [userLocation, setUserLocation] = useState(null)
//   const [mapStyle, setMapStyle] = useState('standard')
//   const [selectedFood, setSelectedFood] = useState(null)
//   const [isFullscreen, setIsFullscreen] = useState(false)
//   const [searchRadius, setSearchRadius] = useState(5) // km

//   // Get user's current location on mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = [position.coords.latitude, position.coords.longitude]
//           setUserLocation(pos)
//         },
//         () => console.log('Location access denied')
//       )
//     }
//   }, [])

//   // Handle locate button
//   const handleLocate = () => {
//     if (mapRef.current) {
//       mapRef.current.locate()
//     }
//   }

//   // Handle location found
//   const handleLocationFound = (latlng) => {
//     const pos = [latlng.lat, latlng.lng]
//     setUserLocation(pos)
//     dispatch(setCenter(pos))
//   }

//   // Handle zoom controls
//   const handleZoomIn = () => {
//     if (mapRef.current) {
//       mapRef.current.setZoom(mapRef.current.getZoom() + 1)
//     }
//   }

//   const handleZoomOut = () => {
//     if (mapRef.current) {
//       mapRef.current.setZoom(mapRef.current.getZoom() - 1)
//     }
//   }

//   // Handle fullscreen
//   const handleFullscreen = () => {
//     const container = document.getElementById('map-container')
//     if (!document.fullscreenElement) {
//       container.requestFullscreen().then(() => setIsFullscreen(true))
//     } else {
//       document.exitFullscreen().then(() => setIsFullscreen(false))
//     }
//   }

//   // Calculate distance between two points (Haversine formula)
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371 // Earth's radius in km
//     const dLat = (lat2 - lat1) * Math.PI / 180
//     const dLon = (lon2 - lon1) * Math.PI / 180
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon/2) * Math.sin(dLon/2)
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
//     return R * c
//   }

//   // Filter food items by radius
//   const filteredFoodItems = userLocation && showRadius
//     ? foodItems.filter(food => {
//         if (!food.coordinates) return false
//         const distance = calculateDistance(
//           userLocation[0],
//           userLocation[1],
//           food.coordinates[0],
//           food.coordinates[1]
//         )
//         return distance <= searchRadius
//       })
//     : foodItems

//   // Get tile layer URL based on style
//   const getTileLayer = () => {
//     if (mapStyle === 'satellite') {
//       return {
//         url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
//         attribution: '&copy; Esri'
//       }
//     }
//     return {
//       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }
//   }

//   const tileLayer = getTileLayer()

//   // Custom popup content
//   const renderPopup = (food) => (
//     <div className="min-w-[200px]">
//       {food.image && (
//         <img 
//           src={food.image} 
//           alt={food.title}
//           className="w-full h-32 object-cover rounded-lg mb-2"
//         />
//       )}
//       <h3 className="font-bold text-gray-900 mb-1">{food.title}</h3>
//       <p className="text-gray-600 text-xs mb-2 line-clamp-2">{food.description}</p>
      
//       <div className="space-y-1 mb-3">
//         <div className="flex items-center justify-between text-xs">
//           <span className="text-gray-600">Servings:</span>
//           <span className="font-semibold text-primary">{food.servings}</span>
//         </div>
//         <div className="flex items-center justify-between text-xs">
//           <span className="text-gray-600">Available:</span>
//           <span className="font-semibold text-gray-900">{food.expiryTime}</span>
//         </div>
//         <div className="flex items-center justify-between text-xs">
//           <span className="text-gray-600">Location:</span>
//           <span className="font-semibold text-gray-900">{food.location}</span>
//         </div>
//         {userLocation && food.coordinates && (
//           <div className="flex items-center justify-between text-xs">
//             <span className="text-gray-600">Distance:</span>
//             <span className="font-semibold text-blue-600">
//               {calculateDistance(
//                 userLocation[0],
//                 userLocation[1],
//                 food.coordinates[0],
//                 food.coordinates[1]
//               ).toFixed(1)} km
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex space-x-2">
//         <button 
//           onClick={() => navigate(`/food/${food.id}`)}
//           className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition-all"
//         >
//           View Details
//         </button>
//         {userLocation && food.coordinates && (
//           <button
//             onClick={() => {
//               const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${food.coordinates[0]},${food.coordinates[1]}`
//               window.open(url, '_blank')
//             }}
//             className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700 transition-all"
//             title="Get Directions"
//           >
//             <Navigation className="w-4 h-4" />
//           </button>
//         )}
//       </div>
//     </div>
//   )

//   return (
//     <div className="relative">
//       {/* Search Radius Control */}
//       {showRadius && userLocation && (
//         <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Search Radius: {searchRadius} km
//           </label>
//           <input
//             type="range"
//             min="1"
//             max="50"
//             value={searchRadius}
//             onChange={(e) => setSearchRadius(Number(e.target.value))}
//             className="w-full"
//           />
//           <p className="text-xs text-gray-600 mt-1">
//             {filteredFoodItems.length} items found
//           </p>
//         </div>
//       )}

//       {/* Map Stats */}
//       <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-3">
//         <div className="flex items-center space-x-4 text-sm">
//           <div className="flex items-center space-x-1">
//             <div className="w-3 h-3 rounded-full bg-primary"></div>
//             <span className="text-gray-700">{filteredFoodItems.length} Donations</span>
//           </div>
//           {userLocation && (
//             <div className="flex items-center space-x-1">
//               <div className="w-3 h-3 rounded-full bg-blue-600"></div>
//               <span className="text-gray-700">Your Location</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Map Container */}
//       <div 
//         id="map-container"
//         className="rounded-2xl overflow-hidden shadow-md" 
//         style={{ height: isFullscreen ? '100vh' : height }}
//       >
//         <MapContainer
//           ref={mapRef}
//           center={center}
//           zoom={zoom}
//           style={{ height: '100%', width: '100%' }}
//           scrollWheelZoom={true}
//           zoomControl={false}
//         >
//           <TileLayer
//             attribution={tileLayer.attribution}
//             url={tileLayer.url}
//           />

//           <MapEventHandler onLocationFound={handleLocationFound} />
//           <RecenterMap center={center} />

//           {/* User Location */}
//           <UserLocationMarker position={userLocation} />

//           {/* Search Radius Circle */}
//           {showRadius && userLocation && (
//             <Circle
//               center={userLocation}
//               radius={searchRadius * 1000}
//               pathOptions={{
//                 color: '#16A34A',
//                 fillColor: '#16A34A',
//                 fillOpacity: 0.05,
//                 weight: 2,
//                 dashArray: '5, 5',
//               }}
//             />
//           )}

//           {/* Food Markers with Clustering */}
//           {enableClustering ? (
//             <MarkerClusterGroup
//               chunkedLoading
//               maxClusterRadius={60}
//               spiderfyOnMaxZoom={true}
//               showCoverageOnHover={false}
//               iconCreateFunction={(cluster) => {
//                 const count = cluster.getChildCount()
//                 return L.divIcon({
//                   html: `<div style="
//                     background: #16A34A;
//                     color: white;
//                     border-radius: 50%;
//                     width: 40px;
//                     height: 40px;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     font-weight: bold;
//                     font-size: 14px;
//                     border: 3px solid white;
//                     box-shadow: 0 2px 8px rgba(0,0,0,0.3);
//                   ">${count}</div>`,
//                   className: 'custom-cluster-icon',
//                   iconSize: [40, 40],
//                 })
//               }}
//             >
//               {filteredFoodItems.map((food) => (
//                 food.coordinates && (
//                   <Marker 
//                     key={food.id} 
//                     position={food.coordinates}
//                     icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
//                     eventHandlers={{
//                       click: () => setSelectedFood(food.id),
//                     }}
//                   >
//                     <Popup maxWidth={300}>
//                       {renderPopup(food)}
//                     </Popup>
//                   </Marker>
//                 )
//               ))}
//             </MarkerClusterGroup>
//           ) : (
//             // Without clustering
//             filteredFoodItems.map((food) => (
//               food.coordinates && (
//                 <Marker 
//                   key={food.id} 
//                   position={food.coordinates}
//                   icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
//                 >
//                   <Popup maxWidth={300}>
//                     {renderPopup(food)}
//                   </Popup>
//                 </Marker>
//               )
//             ))
//           )}

//           {/* Map Controls */}
//           <MapControls
//             onLocate={handleLocate}
//             onZoomIn={handleZoomIn}
//             onZoomOut={handleZoomOut}
//             onFullscreen={handleFullscreen}
//             mapStyle={mapStyle}
//             setMapStyle={setMapStyle}
//           />
//         </MapContainer>
//       </div>
//     </div>
//   )
// }

// export default MapView






import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import { Navigation, Locate, Layers, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import { setCenter, setZoom } from '../features/mapSlice'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom colored marker icons
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 13 16 26 16 26s16-13 16-26C32 7.163 24.837 0 16 0z" 
                fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  })
}

// Food category colors
const categoryColors = {
  cooked: '#16A34A',
  raw: '#EAB308',
  packaged: '#8B5CF6',
  fruits: '#F97316',
  bakery: '#EC4899',
  available: '#16A34A',
  claimed: '#EAB308',
  completed: '#6B7280',
}

// Map Controls Component
function MapControls({ onLocate, onZoomIn, onZoomOut, onFullscreen, mapStyle, setMapStyle }) {
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      {/* Map Style Selector */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <button
          onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Change Map Style"
        >
          <Layers className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Location Controls */}
      <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
        <button
          onClick={onLocate}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
          title="Find My Location"
        >
          <Locate className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onFullscreen}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
          title="Fullscreen"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
        <button
          onClick={onZoomIn}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  )
}

// Map Event Handler
function MapEventHandler({ onLocationFound }) {
  const map = useMap()

  useMapEvents({
    locationfound: (e) => {
      onLocationFound(e.latlng)
      map.flyTo(e.latlng, 14, { duration: 1.5 })
    },
  })

  return null
}

// Recenter Map Component
function RecenterMap({ center }) {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom())
    }
  }, [center, map])

  return null
}

// User Location Marker Component
function UserLocationMarker({ position }) {
  if (!position) return null

  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        background: #2563EB;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })

  return (
    <>
      <Marker position={position} icon={userIcon}>
        <Popup>
          <div className="text-sm font-semibold text-blue-600">
            📍 Your Location
          </div>
        </Popup>
      </Marker>
      <Circle
        center={position}
        radius={500}
        pathOptions={{
          color: '#2563EB',
          fillColor: '#2563EB',
          fillOpacity: 0.1,
          weight: 2,
        }}
      />
    </>
  )
}

// Main MapView Component
function MapView({ foodItems = [], height = '400px', showRadius = false }) {
  const { center, zoom } = useSelector((state) => state.map)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const mapRef = useRef(null)
  
  const [userLocation, setUserLocation] = useState(null)
  const [mapStyle, setMapStyle] = useState('standard')
  const [selectedFood, setSelectedFood] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchRadius, setSearchRadius] = useState(5) // km

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude]
          setUserLocation(pos)
        },
        () => console.log('Location access denied')
      )
    }
  }, [])

  // Handle locate button
  const handleLocate = () => {
    if (mapRef.current) {
      mapRef.current.locate()
    }
  }

  // Handle location found
  const handleLocationFound = (latlng) => {
    const pos = [latlng.lat, latlng.lng]
    setUserLocation(pos)
    dispatch(setCenter(pos))
  }

  // Handle zoom controls
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1)
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1)
    }
  }

  // Handle fullscreen
  const handleFullscreen = () => {
    const container = document.getElementById('map-container')
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Filter food items by radius
  const filteredFoodItems = userLocation && showRadius
    ? foodItems.filter(food => {
        if (!food.coordinates) return false
        const distance = calculateDistance(
          userLocation[0],
          userLocation[1],
          food.coordinates[0],
          food.coordinates[1]
        )
        return distance <= searchRadius
      })
    : foodItems

  // Get tile layer URL based on style
  const getTileLayer = () => {
    if (mapStyle === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri'
      }
    }
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }

  const tileLayer = getTileLayer()

  // Custom popup content
  const renderPopup = (food) => (
    <div className="min-w-[200px]">
      {food.image && (
        <img 
          src={food.image} 
          alt={food.title}
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
      )}
      <h3 className="font-bold text-gray-900 mb-1">{food.title}</h3>
      <p className="text-gray-600 text-xs mb-2 line-clamp-2">{food.description}</p>
      
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Servings:</span>
          <span className="font-semibold text-primary">{food.servings}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Available:</span>
          <span className="font-semibold text-gray-900">{food.expiryTime}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Location:</span>
          <span className="font-semibold text-gray-900">{food.location}</span>
        </div>
        {userLocation && food.coordinates && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Distance:</span>
            <span className="font-semibold text-blue-600">
              {calculateDistance(
                userLocation[0],
                userLocation[1],
                food.coordinates[0],
                food.coordinates[1]
              ).toFixed(1)} km
            </span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={() => navigate(`/food/${food.id}`)}
          className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition-all"
        >
          View Details
        </button>
        {userLocation && food.coordinates && (
          <button
            onClick={() => {
              const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${food.coordinates[0]},${food.coordinates[1]}`
              window.open(url, '_blank')
            }}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700 transition-all"
            title="Get Directions"
          >
            <Navigation className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Search Radius Control */}
      {showRadius && userLocation && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Radius: {searchRadius} km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-600 mt-1">
            {filteredFoodItems.length} items found
          </p>
        </div>
      )}

      {/* Map Stats */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-3">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-gray-700">{filteredFoodItems.length} Donations</span>
          </div>
          {userLocation && (
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-gray-700">Your Location</span>
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div 
        id="map-container"
        className="rounded-2xl overflow-hidden shadow-md" 
        style={{ height: isFullscreen ? '100vh' : height }}
      >
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            attribution={tileLayer.attribution}
            url={tileLayer.url}
          />

          <MapEventHandler onLocationFound={handleLocationFound} />
          <RecenterMap center={center} />

          {/* User Location */}
          <UserLocationMarker position={userLocation} />

          {/* Search Radius Circle */}
          {showRadius && userLocation && (
            <Circle
              center={userLocation}
              radius={searchRadius * 1000}
              pathOptions={{
                color: '#16A34A',
                fillColor: '#16A34A',
                fillOpacity: 0.05,
                weight: 2,
                dashArray: '5, 5',
              }}
            />
          )}

          {/* Food Markers (without clustering) */}
          {filteredFoodItems.map((food) => (
            food.coordinates && (
              <Marker 
                key={food.id} 
                position={food.coordinates}
                icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
                eventHandlers={{
                  click: () => setSelectedFood(food.id),
                }}
              >
                <Popup maxWidth={300}>
                  {renderPopup(food)}
                </Popup>
              </Marker>
            )
          ))}

          {/* Map Controls */}
          <MapControls
            onLocate={handleLocate}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onFullscreen={handleFullscreen}
            mapStyle={mapStyle}
            setMapStyle={setMapStyle}
          />
        </MapContainer>
      </div>
    </div>
  )
}

export default MapView