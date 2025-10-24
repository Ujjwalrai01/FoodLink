import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function MapView({ foodItems = [], height = '400px' }) {
  const { center, zoom } = useSelector((state) => state.map)

  return (
    <div className="rounded-2xl overflow-hidden shadow-md" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {foodItems.map((food) => (
          food.coordinates && (
            <Marker key={food.id} position={food.coordinates}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold mb-1">{food.title}</h3>
                  <p className="text-gray-600 text-xs mb-1">{food.description}</p>
                  <p className="text-primary font-semibold">{food.servings} servings</p>
                  <button className="mt-2 bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView