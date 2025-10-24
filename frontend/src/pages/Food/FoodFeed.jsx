import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Filter, Search, MapPin } from 'lucide-react'
import Navbar from '../../components/Navbar'
import FoodCard from '../../components/FoodCard'
import MapView from '../../components/MapView'
import { setFoodItems, setFilters } from '../../features/foodSlice'

function FoodFeed() {
  const { foodItems, filters } = useSelector((state) => state.food)
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    // Mock data
    const mockFoodItems = [
      {
        id: '1',
        title: 'Fresh Vegetables',
        description: 'Surplus vegetables from my garden',
        location: 'Andheri West, Mumbai',
        expiryTime: '2 hours',
        donorName: 'Rajesh Kumar',
        status: 'available',
        servings: 5,
        coordinates: [19.1136, 72.8697],
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
        category: 'fruits'
      },
      {
        id: '2',
        title: 'Cooked Rice & Curry',
        description: 'Freshly cooked meal, enough for 10 people',
        location: 'Bandra, Mumbai',
        expiryTime: '1 hour',
        donorName: 'Priya Sharma',
        status: 'available',
        servings: 10,
        coordinates: [19.0596, 72.8295],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        category: 'cooked'
      },
      {
        id: '3',
        title: 'Bakery Items',
        description: 'Fresh bread and pastries from this morning',
        location: 'Colaba, Mumbai',
        expiryTime: '3 hours',
        donorName: 'Baker\'s Delight',
        status: 'available',
        servings: 15,
        coordinates: [18.9220, 72.8347],
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        category: 'bakery'
      },
      {
        id: '4',
        title: 'Restaurant Surplus',
        description: 'Mixed vegetarian dishes',
        location: 'Powai, Mumbai',
        expiryTime: '4 hours',
        donorName: 'Spice Garden',
        status: 'available',
        servings: 20,
        coordinates: [19.1177, 72.9060],
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
        category: 'cooked'
      },
      {
        id: '5',
        title: 'Packaged Snacks',
        description: 'Unopened packets of chips and biscuits',
        location: 'Dadar, Mumbai',
        expiryTime: '1 week',
        donorName: 'Grocery Store',
        status: 'available',
        servings: 8,
        coordinates: [19.0178, 72.8478],
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
        category: 'packaged'
      },
      {
        id: '6',
        title: 'Fresh Fruits',
        description: 'Mangoes, apples, and bananas',
        location: 'Juhu, Mumbai',
        expiryTime: '2 days',
        donorName: 'Fruit Vendor',
        status: 'available',
        servings: 12,
        coordinates: [19.0987, 72.8262],
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
        category: 'fruits'
      },
    ]
    dispatch(setFoodItems(mockFoodItems))
  }, [dispatch])

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filters.type === 'all' || item.category === filters.type
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Food Feed</h1>
          <p className="text-gray-600">Discover available food donations near you</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for food..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filters.type}
                onChange={(e) => dispatch(setFilters({ type: e.target.value }))}
                className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="all">All Categories</option>
                <option value="cooked">Cooked Food</option>
                <option value="raw">Raw Ingredients</option>
                <option value="packaged">Packaged Food</option>
                <option value="fruits">Fruits & Vegetables</option>
                <option value="bakery">Bakery Items</option>
              </select>
            </div>

            {/* Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                showMap ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
            </button>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="mb-8">
            <MapView foodItems={filteredItems} height="500px" />
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold text-primary">{filteredItems.length}</span> food donations
          </p>
        </div>

        {/* Food Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No food found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodFeed