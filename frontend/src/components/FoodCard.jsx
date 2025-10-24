import { MapPin, Clock, User as UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function FoodCard({ food }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/food/${food.id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={food.image || 'https://via.placeholder.com/400x250?text=Food+Image'}
        alt={food.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{food.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{food.description}</p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{food.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{food.expiryTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserIcon className="w-4 h-4 text-primary" />
            <span>{food.donorName}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            food.status === 'available' ? 'bg-green-100 text-green-800' :
            food.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {food.status.toUpperCase()}
          </span>
          <span className="text-sm font-semibold text-primary">
            {food.servings} servings
          </span>
        </div>
      </div>
    </div>
  )
}

export default FoodCard