import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MapPin, Clock, Users, Package, Heart, ArrowLeft } from 'lucide-react'
import Navbar from '../../components/Navbar'
import MapView from '../../components/MapView'
import { showToast } from '../../components/NotificationToast'

function FoodDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { foodItems } = useSelector((state) => state.food)
  const [food, setFood] = useState(null)
  const [claiming, setClaiming] = useState(false)

  useEffect(() => {
    const foundFood = foodItems.find(item => item.id === id)
    if (foundFood) {
      setFood(foundFood)
    } else {
      // Mock data if not found in store
      setFood({
        id,
        title: 'Fresh Vegetables',
        description: 'Surplus vegetables from my garden including tomatoes, cucumbers, and leafy greens. All fresh and organic.',
        location: 'Andheri West, Mumbai',
        expiryTime: '2 hours',
        donorName: 'Rajesh Kumar',
        status: 'available',
        servings: 5,
        coordinates: [19.1136, 72.8697],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
        category: 'fruits',
        donorPhone: '+91 98765 43210',
        postedAt: '1 hour ago'
      })
    }
  }, [id, foodItems])

  const handleClaim = async () => {
    setClaiming(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Food claimed successfully! Contact details sent to your email.', 'success')
      navigate('/dashboard')
    } catch (error) {
      showToast('Failed to claim food. Please try again.', 'error')
    } finally {
      setClaiming(false)
    }
  }

  if (!food) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image */}
          <img
            src={food.image}
            alt={food.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{food.title}</h1>
                <p className="text-gray-600">Posted by <span className="font-semibold">{food.donorName}</span> • {food.postedAt}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                food.status === 'available' ? 'bg-green-100 text-green-800' :
                food.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {food.status.toUpperCase()}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Servings</p>
                    <p className="font-semibold text-gray-900">{food.servings} people</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-secondary bg-opacity-10 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Until</p>
                    <p className="font-semibold text-gray-900">{food.expiryTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-accent bg-opacity-10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{food.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900 capitalize">{food.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{food.description}</p>
            </div>

            {/* Map */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Pickup Location</h2>
              <MapView foodItems={[food]} height="300px" />
            </div>

            {/* Action Button */}
            {food.status === 'available' && (
              <button
                onClick={handleClaim}
                disabled={claiming}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Heart className="w-5 h-5" />
                <span>{claiming ? 'Claiming...' : 'Claim This Food'}</span>
              </button>
            )}

            {food.status === 'claimed' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <p className="text-yellow-800 font-semibold">This food has been claimed by someone else</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
