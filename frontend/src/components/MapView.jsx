// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// // import { useSelector } from 'react-redux'
// // import L from 'leaflet'
// // import 'leaflet/dist/leaflet.css'

// // // Fix for default marker icons in React-Leaflet
// // delete L.Icon.Default.prototype._getIconUrl
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // })

// // function MapView({ foodItems = [], height = '400px' }) {
// //   const { center, zoom } = useSelector((state) => state.map)

// //   return (
// //     <div className="rounded-2xl overflow-hidden shadow-md" style={{ height }}>
// //       <MapContainer
// //         center={center}
// //         zoom={zoom}
// //         style={{ height: '100%', width: '100%' }}
// //         scrollWheelZoom={false}
// //       >
// //         <TileLayer
// //           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         />
        
// //         {foodItems.map((food) => (
// //           food.coordinates && (
// //             <Marker key={food.id} position={food.coordinates}>
// //               <Popup>
// //                 <div className="text-sm">
// //                   <h3 className="font-bold mb-1">{food.title}</h3>
// //                   <p className="text-gray-600 text-xs mb-1">{food.description}</p>
// //                   <p className="text-primary font-semibold">{food.servings} servings</p>
// //                   <button className="mt-2 bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700">
// //                     View Details
// //                   </button>
// //                 </div>
// //               </Popup>
// //             </Marker>
// //           )
// //         ))}
// //       </MapContainer>
// //     </div>
// //   )
// // }

// // export default MapView










// // ============================================
// // Enhanced MapView.jsx with Advanced Features
// // ============================================
// // import { useState, useEffect, useRef } from 'react'
// // import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet'
// // import { useSelector, useDispatch } from 'react-redux'
// // import { useNavigate } from 'react-router-dom'
// // import L from 'leaflet'
// // import MarkerClusterGroup from 'react-leaflet-cluster'
// // import { Navigation, Locate, Layers, ZoomIn, ZoomOut, Maximize2, Search } from 'lucide-react'
// // import { setCenter, setZoom } from '../features/mapSlice'
// // import 'leaflet/dist/leaflet.css'

// // // Fix for default marker icons
// // delete L.Icon.Default.prototype._getIconUrl
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
// //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// // })

// // // Custom colored marker icons
// // const createCustomIcon = (color) => {
// //   return L.divIcon({
// //     className: 'custom-marker',
// //     html: `
// //       <div style="position: relative;">
// //         <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
// //           <path d="M16 0C7.163 0 0 7.163 0 16c0 13 16 26 16 26s16-13 16-26C32 7.163 24.837 0 16 0z" 
// //                 fill="${color}" stroke="white" stroke-width="2"/>
// //           <circle cx="16" cy="16" r="6" fill="white"/>
// //         </svg>
// //       </div>
// //     `,
// //     iconSize: [32, 42],
// //     iconAnchor: [16, 42],
// //     popupAnchor: [0, -42],
// //   })
// // }

// // // Food category colors
// // const categoryColors = {
// //   cooked: '#16A34A',
// //   raw: '#EAB308',
// //   packaged: '#8B5CF6',
// //   fruits: '#F97316',
// //   bakery: '#EC4899',
// //   available: '#16A34A',
// //   claimed: '#EAB308',
// //   completed: '#6B7280',
// // }

// // // Map Controls Component
// // function MapControls({ onLocate, onZoomIn, onZoomOut, onFullscreen, mapStyle, setMapStyle }) {
// //   return (
// //     <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
// //       {/* Map Style Selector */}
// //       <div className="bg-white rounded-xl shadow-lg p-2">
// //         <button
// //           onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
// //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //           title="Change Map Style"
// //         >
// //           <Layers className="w-5 h-5 text-gray-700" />
// //         </button>
// //       </div>

// //       {/* Location Controls */}
// //       <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
// //         <button
// //           onClick={onLocate}
// //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
// //           title="Find My Location"
// //         >
// //           <Locate className="w-5 h-5 text-gray-700" />
// //         </button>
// //         <button
// //           onClick={onFullscreen}
// //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
// //           title="Fullscreen"
// //         >
// //           <Maximize2 className="w-5 h-5 text-gray-700" />
// //         </button>
// //       </div>

// //       {/* Zoom Controls */}
// //       <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
// //         <button
// //           onClick={onZoomIn}
// //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
// //           title="Zoom In"
// //         >
// //           <ZoomIn className="w-5 h-5 text-gray-700" />
// //         </button>
// //         <button
// //           onClick={onZoomOut}
// //           className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
// //           title="Zoom Out"
// //         >
// //           <ZoomOut className="w-5 h-5 text-gray-700" />
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // // Map Event Handler
// // function MapEventHandler({ onLocationFound }) {
// //   const map = useMap()

// //   useMapEvents({
// //     locationfound: (e) => {
// //       onLocationFound(e.latlng)
// //       map.flyTo(e.latlng, 14, { duration: 1.5 })
// //     },
// //   })

// //   return null
// // }

// // // Recenter Map Component
// // function RecenterMap({ center }) {
// //   const map = useMap()
  
// //   useEffect(() => {
// //     if (center) {
// //       map.setView(center, map.getZoom())
// //     }
// //   }, [center, map])

// //   return null
// // }

// // // User Location Marker Component
// // function UserLocationMarker({ position }) {
// //   if (!position) return null

// //   const userIcon = L.divIcon({
// //     className: 'user-location-marker',
// //     html: `
// //       <div style="
// //         width: 20px;
// //         height: 20px;
// //         background: #2563EB;
// //         border: 3px solid white;
// //         border-radius: 50%;
// //         box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
// //       "></div>
// //     `,
// //     iconSize: [20, 20],
// //     iconAnchor: [10, 10],
// //   })

// //   return (
// //     <>
// //       <Marker position={position} icon={userIcon}>
// //         <Popup>
// //           <div className="text-sm font-semibold text-blue-600">
// //             📍 Your Location
// //           </div>
// //         </Popup>
// //       </Marker>
// //       <Circle
// //         center={position}
// //         radius={500}
// //         pathOptions={{
// //           color: '#2563EB',
// //           fillColor: '#2563EB',
// //           fillOpacity: 0.1,
// //           weight: 2,
// //         }}
// //       />
// //     </>
// //   )
// // }

// // // Main MapView Component
// // function MapView({ foodItems = [], height = '400px', enableClustering = true, showRadius = false }) {
// //   const { center, zoom } = useSelector((state) => state.map)
// //   const dispatch = useDispatch()
// //   const navigate = useNavigate()
// //   const mapRef = useRef(null)
  
// //   const [userLocation, setUserLocation] = useState(null)
// //   const [mapStyle, setMapStyle] = useState('standard')
// //   const [selectedFood, setSelectedFood] = useState(null)
// //   const [isFullscreen, setIsFullscreen] = useState(false)
// //   const [searchRadius, setSearchRadius] = useState(5) // km

// //   // Get user's current location on mount
// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const pos = [position.coords.latitude, position.coords.longitude]
// //           setUserLocation(pos)
// //         },
// //         () => console.log('Location access denied')
// //       )
// //     }
// //   }, [])

// //   // Handle locate button
// //   const handleLocate = () => {
// //     if (mapRef.current) {
// //       mapRef.current.locate()
// //     }
// //   }

// //   // Handle location found
// //   const handleLocationFound = (latlng) => {
// //     const pos = [latlng.lat, latlng.lng]
// //     setUserLocation(pos)
// //     dispatch(setCenter(pos))
// //   }

// //   // Handle zoom controls
// //   const handleZoomIn = () => {
// //     if (mapRef.current) {
// //       mapRef.current.setZoom(mapRef.current.getZoom() + 1)
// //     }
// //   }

// //   const handleZoomOut = () => {
// //     if (mapRef.current) {
// //       mapRef.current.setZoom(mapRef.current.getZoom() - 1)
// //     }
// //   }

// //   // Handle fullscreen
// //   const handleFullscreen = () => {
// //     const container = document.getElementById('map-container')
// //     if (!document.fullscreenElement) {
// //       container.requestFullscreen().then(() => setIsFullscreen(true))
// //     } else {
// //       document.exitFullscreen().then(() => setIsFullscreen(false))
// //     }
// //   }

// //   // Calculate distance between two points (Haversine formula)
// //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371 // Earth's radius in km
// //     const dLat = (lat2 - lat1) * Math.PI / 180
// //     const dLon = (lon2 - lon1) * Math.PI / 180
// //     const a = 
// //       Math.sin(dLat/2) * Math.sin(dLat/2) +
// //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
// //       Math.sin(dLon/2) * Math.sin(dLon/2)
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
// //     return R * c
// //   }

// //   // Filter food items by radius
// //   const filteredFoodItems = userLocation && showRadius
// //     ? foodItems.filter(food => {
// //         if (!food.coordinates) return false
// //         const distance = calculateDistance(
// //           userLocation[0],
// //           userLocation[1],
// //           food.coordinates[0],
// //           food.coordinates[1]
// //         )
// //         return distance <= searchRadius
// //       })
// //     : foodItems

// //   // Get tile layer URL based on style
// //   const getTileLayer = () => {
// //     if (mapStyle === 'satellite') {
// //       return {
// //         url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
// //         attribution: '&copy; Esri'
// //       }
// //     }
// //     return {
// //       url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
// //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //     }
// //   }

// //   const tileLayer = getTileLayer()

// //   // Custom popup content
// //   const renderPopup = (food) => (
// //     <div className="min-w-[200px]">
// //       {food.image && (
// //         <img 
// //           src={food.image} 
// //           alt={food.title}
// //           className="w-full h-32 object-cover rounded-lg mb-2"
// //         />
// //       )}
// //       <h3 className="font-bold text-gray-900 mb-1">{food.title}</h3>
// //       <p className="text-gray-600 text-xs mb-2 line-clamp-2">{food.description}</p>
      
// //       <div className="space-y-1 mb-3">
// //         <div className="flex items-center justify-between text-xs">
// //           <span className="text-gray-600">Servings:</span>
// //           <span className="font-semibold text-primary">{food.servings}</span>
// //         </div>
// //         <div className="flex items-center justify-between text-xs">
// //           <span className="text-gray-600">Available:</span>
// //           <span className="font-semibold text-gray-900">{food.expiryTime}</span>
// //         </div>
// //         <div className="flex items-center justify-between text-xs">
// //           <span className="text-gray-600">Location:</span>
// //           <span className="font-semibold text-gray-900">{food.location}</span>
// //         </div>
// //         {userLocation && food.coordinates && (
// //           <div className="flex items-center justify-between text-xs">
// //             <span className="text-gray-600">Distance:</span>
// //             <span className="font-semibold text-blue-600">
// //               {calculateDistance(
// //                 userLocation[0],
// //                 userLocation[1],
// //                 food.coordinates[0],
// //                 food.coordinates[1]
// //               ).toFixed(1)} km
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       <div className="flex space-x-2">
// //         <button 
// //           onClick={() => navigate(`/food/${food.id}`)}
// //           className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-700 transition-all"
// //         >
// //           View Details
// //         </button>
// //         {userLocation && food.coordinates && (
// //           <button
// //             onClick={() => {
// //               const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${food.coordinates[0]},${food.coordinates[1]}`
// //               window.open(url, '_blank')
// //             }}
// //             className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs hover:bg-blue-700 transition-all"
// //             title="Get Directions"
// //           >
// //             <Navigation className="w-4 h-4" />
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   )

// //   return (
// //     <div className="relative">
// //       {/* Search Radius Control */}
// //       {showRadius && userLocation && (
// //         <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-4">
// //           <label className="block text-sm font-semibold text-gray-700 mb-2">
// //             Search Radius: {searchRadius} km
// //           </label>
// //           <input
// //             type="range"
// //             min="1"
// //             max="50"
// //             value={searchRadius}
// //             onChange={(e) => setSearchRadius(Number(e.target.value))}
// //             className="w-full"
// //           />
// //           <p className="text-xs text-gray-600 mt-1">
// //             {filteredFoodItems.length} items found
// //           </p>
// //         </div>
// //       )}

// //       {/* Map Stats */}
// //       <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-3">
// //         <div className="flex items-center space-x-4 text-sm">
// //           <div className="flex items-center space-x-1">
// //             <div className="w-3 h-3 rounded-full bg-primary"></div>
// //             <span className="text-gray-700">{filteredFoodItems.length} Donations</span>
// //           </div>
// //           {userLocation && (
// //             <div className="flex items-center space-x-1">
// //               <div className="w-3 h-3 rounded-full bg-blue-600"></div>
// //               <span className="text-gray-700">Your Location</span>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Map Container */}
// //       <div 
// //         id="map-container"
// //         className="rounded-2xl overflow-hidden shadow-md" 
// //         style={{ height: isFullscreen ? '100vh' : height }}
// //       >
// //         <MapContainer
// //           ref={mapRef}
// //           center={center}
// //           zoom={zoom}
// //           style={{ height: '100%', width: '100%' }}
// //           scrollWheelZoom={true}
// //           zoomControl={false}
// //         >
// //           <TileLayer
// //             attribution={tileLayer.attribution}
// //             url={tileLayer.url}
// //           />

// //           <MapEventHandler onLocationFound={handleLocationFound} />
// //           <RecenterMap center={center} />

// //           {/* User Location */}
// //           <UserLocationMarker position={userLocation} />

// //           {/* Search Radius Circle */}
// //           {showRadius && userLocation && (
// //             <Circle
// //               center={userLocation}
// //               radius={searchRadius * 1000}
// //               pathOptions={{
// //                 color: '#16A34A',
// //                 fillColor: '#16A34A',
// //                 fillOpacity: 0.05,
// //                 weight: 2,
// //                 dashArray: '5, 5',
// //               }}
// //             />
// //           )}

// //           {/* Food Markers with Clustering */}
// //           {enableClustering ? (
// //             <MarkerClusterGroup
// //               chunkedLoading
// //               maxClusterRadius={60}
// //               spiderfyOnMaxZoom={true}
// //               showCoverageOnHover={false}
// //               iconCreateFunction={(cluster) => {
// //                 const count = cluster.getChildCount()
// //                 return L.divIcon({
// //                   html: `<div style="
// //                     background: #16A34A;
// //                     color: white;
// //                     border-radius: 50%;
// //                     width: 40px;
// //                     height: 40px;
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     font-weight: bold;
// //                     font-size: 14px;
// //                     border: 3px solid white;
// //                     box-shadow: 0 2px 8px rgba(0,0,0,0.3);
// //                   ">${count}</div>`,
// //                   className: 'custom-cluster-icon',
// //                   iconSize: [40, 40],
// //                 })
// //               }}
// //             >
// //               {filteredFoodItems.map((food) => (
// //                 food.coordinates && (
// //                   <Marker 
// //                     key={food.id} 
// //                     position={food.coordinates}
// //                     icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
// //                     eventHandlers={{
// //                       click: () => setSelectedFood(food.id),
// //                     }}
// //                   >
// //                     <Popup maxWidth={300}>
// //                       {renderPopup(food)}
// //                     </Popup>
// //                   </Marker>
// //                 )
// //               ))}
// //             </MarkerClusterGroup>
// //           ) : (
// //             // Without clustering
// //             filteredFoodItems.map((food) => (
// //               food.coordinates && (
// //                 <Marker 
// //                   key={food.id} 
// //                   position={food.coordinates}
// //                   icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
// //                 >
// //                   <Popup maxWidth={300}>
// //                     {renderPopup(food)}
// //                   </Popup>
// //                 </Marker>
// //               )
// //             ))
// //           )}

// //           {/* Map Controls */}
// //           <MapControls
// //             onLocate={handleLocate}
// //             onZoomIn={handleZoomIn}
// //             onZoomOut={handleZoomOut}
// //             onFullscreen={handleFullscreen}
// //             mapStyle={mapStyle}
// //             setMapStyle={setMapStyle}
// //           />
// //         </MapContainer>
// //       </div>
// //     </div>
// //   )
// // }

// // export default MapView






// import { useState, useEffect, useRef } from 'react'
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import L from 'leaflet'
// import { Navigation, Locate, Layers, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
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
// function MapView({ foodItems = [], height = '400px', showRadius = false }) {
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

//           {/* Food Markers (without clustering) */}
//           {filteredFoodItems.map((food) => (
//             food.coordinates && (
//               <Marker 
//                 key={food.id} 
//                 position={food.coordinates}
//                 icon={createCustomIcon(categoryColors[food.category] || categoryColors[food.status] || '#16A34A')}
//                 eventHandlers={{
//                   click: () => setSelectedFood(food.id),
//                 }}
//               >
//                 <Popup maxWidth={300}>
//                   {renderPopup(food)}
//                 </Popup>
//               </Marker>
//             )
//           ))}

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










import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Search, MapPin, Navigation, Layers, ZoomIn, ZoomOut, Filter, Clock, Users, Heart, ChevronDown, X, Menu } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample food data - Tirupati near Mohan Babu University
const mockFoodItems = [
  {
    id: 1,
    title: 'Fresh Vegetable Curry',
    description: 'Homemade vegetable curry with rice. Perfect for 4-5 people.',
    servings: 5,
    category: 'cooked',
    location: 'Mohan Babu University Campus',
    coordinates: [13.6200, 79.2903],
    expiryTime: '2 hours',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    donor: 'Priya Sharma',
    status: 'available',
    distance: 0.5
  },
  {
    id: 2,
    title: 'Packaged Bread & Butter',
    description: 'Unopened bread loaves and butter packets.',
    servings: 8,
    category: 'packaged',
    location: 'Sree Sainath Nagar, Tirupati',
    coordinates: [13.6180, 79.2920],
    expiryTime: '1 day',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    donor: 'Raj Patel',
    status: 'available',
    distance: 0.8
  },
  {
    id: 3,
    title: 'Fresh Fruits Basket',
    description: 'Assorted fresh fruits - apples, bananas, oranges.',
    servings: 10,
    category: 'fruits',
    location: 'Chandragiri Road, Tirupati',
    coordinates: [13.6250, 79.3050],
    expiryTime: '4 hours',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
    donor: 'Anita Kumar',
    status: 'available',
    distance: 1.5
  },
  {
    id: 4,
    title: 'Biryani & Raita',
    description: 'Delicious chicken biryani with cucumber raita.',
    servings: 6,
    category: 'cooked',
    location: 'Near Chandragiri Railway Station',
    coordinates: [13.6280, 79.3120],
    expiryTime: '3 hours',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    donor: 'Mohammed Ali',
    status: 'claimed',
    distance: 2.1
  },
  {
    id: 5,
    title: 'Fresh Bakery Items',
    description: 'Croissants, muffins, and pastries from morning batch.',
    servings: 12,
    category: 'bakery',
    location: 'Naravaripalle, Tirupati',
    coordinates: [13.6150, 79.2750],
    expiryTime: '6 hours',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    donor: 'Cafe Delight',
    status: 'available',
    distance: 1.8
  },
  {
    id: 6,
    title: 'Dal Tadka & Roti',
    description: 'Yellow dal tadka with fresh rotis.',
    servings: 4,
    category: 'cooked',
    location: 'Pullaiahgaripalli, Tirupati',
    coordinates: [13.6320, 79.3000],
    expiryTime: '2 hours',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    donor: 'Sunita Menon',
    status: 'available',
    distance: 1.2
  },
  {
    id: 7,
    title: 'Idli & Sambar',
    description: 'Fresh steamed idlis with sambar and coconut chutney.',
    servings: 8,
    category: 'cooked',
    location: 'MBU Hostel Area',
    coordinates: [13.6190, 79.2895],
    expiryTime: '3 hours',
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop',
    donor: 'Lakshmi Devi',
    status: 'available',
    distance: 0.3
  },
  {
    id: 8,
    title: 'Mixed Vegetable Pulao',
    description: 'Aromatic vegetable pulao with raita.',
    servings: 6,
    category: 'cooked',
    location: 'Near SVEC Campus',
    coordinates: [13.6210, 79.2940],
    expiryTime: '2 hours',
    image: 'https://images.unsplash.com/photo-1596040033229-a0b3b7c56427?w=400&h=300&fit=crop',
    donor: 'Venkat Reddy',
    status: 'available',
    distance: 0.6
  },
  {
    id: 9,
    title: 'Fresh Banana Bundle',
    description: 'Locally grown ripe bananas, perfect for distribution.',
    servings: 15,
    category: 'fruits',
    location: 'Tirupati Fruit Market Area',
    coordinates: [13.6350, 79.3100],
    expiryTime: '1 day',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop',
    donor: 'Fruit Vendor Association',
    status: 'available',
    distance: 2.5
  },
  {
    id: 10,
    title: 'Chapati & Paneer Curry',
    description: 'Whole wheat chapatis with paneer butter masala.',
    servings: 7,
    category: 'cooked',
    location: 'Ramireddypalle',
    coordinates: [13.6270, 79.2880],
    expiryTime: '2 hours',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    donor: 'Ravi Kumar',
    status: 'available',
    distance: 1.0
  },
  {
    id: 11,
    title: 'Packaged Snacks & Biscuits',
    description: 'Sealed packets of biscuits, chips, and namkeen.',
    servings: 20,
    category: 'packaged',
    location: 'Sree Vidyanikethan School Area',
    coordinates: [13.6220, 79.2910],
    expiryTime: '1 week',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop',
    donor: 'Student Welfare Committee',
    status: 'available',
    distance: 0.7
  },
  {
    id: 12,
    title: 'Curd Rice',
    description: 'Traditional South Indian curd rice with tempering.',
    servings: 5,
    category: 'cooked',
    location: 'Near NH 71 Junction',
    coordinates: [13.6240, 79.3020],
    expiryTime: '4 hours',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop',
    donor: 'Meena Bai',
    status: 'claimed',
    distance: 1.3
  }
];

// Category colors
const categoryColors = {
  cooked: '#16A34A',
  raw: '#EAB308',
  packaged: '#8B5CF6',
  fruits: '#F97316',
  bakery: '#EC4899',
};

const statusColors = {
  available: '#16A34A',
  claimed: '#EAB308',
  completed: '#6B7280',
};

// Custom marker icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 11.375 14 24 14 24s14-12.625 14-24C28 6.268 21.732 0 14 0z" 
                fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="14" cy="14" r="5" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -38],
  });
};

// Map component helpers
function RecenterMap({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom(), { animate: true, duration: 0.5 });
    }
  }, [center, map]);

  return null;
}

function MapView() {
  const [foodItems] = useState(mockFoodItems);
  const [userLocation, setUserLocation] = useState([19.0760, 72.8777]); // Mumbai center
  const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]);
  const [mapZoom, setMapZoom] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [hoveredFood, setHoveredFood] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mapStyle, setMapStyle] = useState('standard');
  const [searchRadius, setSearchRadius] = useState(10);
  const mapRef = useRef(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(pos);
          setMapCenter(pos);
        },
        () => console.log('Location access denied')
      );
    }
  }, []);

  // Filter food items
  const filteredFoodItems = foodItems.filter(food => {
    const matchesSearch = food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || food.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle food card click
  const handleFoodClick = (food) => {
    setSelectedFood(food.id);
    setMapCenter(food.coordinates);
    setMapZoom(15);
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen(false);
    }
  };

  // Handle locate me
  const handleLocateMe = () => {
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  // Get tile layer
  const getTileLayer = () => {
    if (mapStyle === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri'
      };
    }
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    };
  };

  const tileLayer = getTileLayer();

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-2">
            <Heart className="w-6 h-6 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FoodShare</h1>
            <p className="text-xs text-gray-500">Share food, spread love</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            About
          </button>
          <button className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            How it Works
          </button>
          <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md">
            + Donate Food
          </button>
        </div>

        <button 
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Food List */}
        <div className={`${isMobileMenuOpen ? 'absolute inset-0 z-40' : 'hidden'} md:block md:relative w-full md:w-96 bg-white shadow-xl overflow-hidden`}>
          <div className="h-full flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 space-y-3 border-b">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search food or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Filter Button */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                <div className="flex-1 text-right text-sm text-gray-600">
                  {filteredFoodItems.length} results
                </div>
              </div>

              {/* Filter Options */}
              {showFilters && (
                <div className="flex flex-wrap gap-2">
                  {['all', 'cooked', 'packaged', 'fruits', 'bakery'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        filterCategory === cat
                          ? 'bg-green-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Food Cards List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredFoodItems.map((food) => (
                <div
                  key={food.id}
                  onClick={() => handleFoodClick(food)}
                  onMouseEnter={() => setHoveredFood(food.id)}
                  onMouseLeave={() => setHoveredFood(null)}
                  className={`bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedFood === food.id
                      ? 'border-green-500 shadow-xl scale-[1.02]'
                      : hoveredFood === food.id
                      ? 'border-gray-300 shadow-lg scale-[1.01]'
                      : 'border-gray-200 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Food Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: categoryColors[food.category] }}
                      >
                        {food.category.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                          food.status === 'available' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        {food.status === 'available' ? '● Available' : '● Claimed'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-semibold text-gray-900">{food.distance} km away</span>
                      </div>
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{food.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{food.description}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center space-x-2 bg-green-50 rounded-lg p-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600">Servings</p>
                          <p className="text-sm font-bold text-gray-900">{food.servings} people</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-orange-50 rounded-lg p-2">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-600">Available for</p>
                          <p className="text-sm font-bold text-gray-900">{food.expiryTime}</p>
                        </div>
                      </div>
                    </div>

                    {/* Location & Donor */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {food.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                          {food.donor.charAt(0)}
                        </div>
                        Donated by {food.donor}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md text-sm">
                        View Details
                      </button>
                      <button className="bg-blue-500 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-md">
                        <Navigation className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 relative">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
            {/* Map Style Toggle */}
            <div className="bg-white rounded-xl shadow-lg p-2">
              <button
                onClick={() => setMapStyle(mapStyle === 'standard' ? 'satellite' : 'standard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Toggle Map Style"
              >
                <Layers className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white rounded-xl shadow-lg p-2 space-y-1">
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setZoom(mapRef.current.getZoom() + 1);
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setZoom(mapRef.current.getZoom() - 1);
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors block w-full"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Map Stats Card */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-lg font-bold text-gray-900">{filteredFoodItems.filter(f => f.status === 'available').length}</p>
                </div>
              </div>
              <div className="h-10 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-xs text-gray-500">Claimed</p>
                  <p className="text-lg font-bold text-gray-900">{filteredFoodItems.filter(f => f.status === 'claimed').length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Locate Me Button */}
          <button
            onClick={handleLocateMe}
            className="absolute bottom-4 right-4 z-[1000] bg-white rounded-full shadow-xl p-4 hover:bg-gray-50 transition-all"
            title="Find My Location"
          >
            <Navigation className="w-6 h-6 text-green-600" />
          </button>

          {/* Map Container */}
          <MapContainer
            ref={mapRef}
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
            />

            <RecenterMap center={mapCenter} />

            {/* User Location Marker */}
            <Marker
              position={userLocation}
              icon={L.divIcon({
                className: 'user-location-marker',
                html: `
                  <div style="
                    width: 24px;
                    height: 24px;
                    background: #2563EB;
                    border: 4px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
                  "></div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>
                <div className="text-sm font-semibold text-blue-600">
                  📍 Your Location
                </div>
              </Popup>
            </Marker>

            {/* Search Radius Circle */}
            <Circle
              center={userLocation}
              radius={searchRadius * 1000}
              pathOptions={{
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 0.05,
                weight: 2,
              }}
            />

            {/* Food Markers */}
            {filteredFoodItems.map((food) => (
              food.coordinates && (
                <Marker
                  key={food.id}
                  position={food.coordinates}
                  icon={createCustomIcon(categoryColors[food.category])}
                  eventHandlers={{
                    click: () => {
                      setSelectedFood(food.id);
                      setMapCenter(food.coordinates);
                    },
                  }}
                >
                  <Popup maxWidth={300} className="custom-popup">
                    <div className="min-w-[250px]">
                      <img
                        src={food.image}
                        alt={food.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-bold text-gray-900 mb-1 text-base">{food.title}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{food.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-green-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Servings</p>
                          <p className="font-bold text-gray-900">{food.servings}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600">Available</p>
                          <p className="font-bold text-gray-900">{food.expiryTime}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {food.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                            {food.donor.charAt(0)}
                          </div>
                          {food.donor}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:from-green-600 hover:to-green-700 transition-all">
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${food.coordinates[0]},${food.coordinates[1]}`;
                            window.open(url, '_blank');
                          }}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all"
                        >
                          <Navigation className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapView;




