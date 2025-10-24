import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MapPin, Clock, Users, Image as ImageIcon, Package } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { addFoodItem } from '../../features/foodSlice'
import { showToast } from '../../components/NotificationToast'

function AddFood() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    servings: '',
    expiryTime: '',
    location: '',
    category: 'cooked',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newFood = {
        id: Date.now().toString(),
        ...formData,
        servings: parseInt(formData.servings),
        status: 'available',
        donorName: 'You',
        coordinates: [19.0760, 72.8777], // Mock coordinates
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'
      }
      
      dispatch(addFoodItem(newFood))
      showToast('Food listing created successfully!', 'success')
      navigate('/dashboard')
    } catch (error) {
      showToast('Failed to create listing. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Food Donation</h1>
          <p className="text-gray-600">Share your surplus food with the community</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="e.g., Fresh Vegetables, Cooked Rice & Curry"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                placeholder="Describe the food, quantity, and any special notes"
              />
            </div>

            {/* Category and Servings */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="cooked">Cooked Food</option>
                    <option value="raw">Raw Ingredients</option>
                    <option value="packaged">Packaged Food</option>
                    <option value="fruits">Fruits & Vegetables</option>
                    <option value="bakery">Bakery Items</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servings *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="servings"
                    required
                    min="1"
                    value={formData.servings}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Number of people it can feed"
                  />
                </div>
              </div>
            </div>

            {/* Location and Expiry */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g., Andheri West, Mumbai"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Until *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="expiryTime"
                    required
                    value={formData.expiryTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="e.g., 2 hours, Today 8 PM"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL (Optional)
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl"
            >
              {loading ? 'Creating Listing...' : 'Post Food Donation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddFood