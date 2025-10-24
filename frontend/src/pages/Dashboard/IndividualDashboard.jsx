import { useEffect } from 'react';
import { Package, Heart, TrendingUp, Award } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import AnalyticsCard from '../../components/AnalyticsCard';
import FoodCard from '../../components/FoodCard';
import MapView from '../../components/MapView';
import { setImpactData } from '../../features/analyticsSlice';
import { setFoodItems } from '../../features/foodSlice';

function IndividualDashboard() {
  const { user } = useSelector(state => state.auth);
  const { impactData } = useSelector(state => state.analytics);
  const { foodItems } = useSelector(state => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    // Mock impact data - replace with real API call
    dispatch(setImpactData({
      mealsDonated: 45,
      peopleFed: 23,
      co2Saved: 12.5,
    }));

    // Mock food items nearby
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
      },
    ];
    dispatch(setFoodItems(mockFoodItems));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! ❤️
          </h1>
          <p className="text-gray-600">
            You've helped feed {impactData.peopleFed} people this month
          </p>
        </div>

        {/* Impact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Meals Donated"
            value={impactData.mealsDonated}
            icon={Package}
            color="primary"
            subtitle="+12 this week"
          />
          <AnalyticsCard
            title="People Fed"
            value={impactData.peopleFed}
            icon={Heart}
            color="secondary"
            subtitle="Making a difference"
          />
          <AnalyticsCard
            title="CO₂ Saved"
            value={`${impactData.co2Saved} kg`}
            icon={TrendingUp}
            color="accent"
            subtitle="Environmental impact"
          />
          <AnalyticsCard
            title="Current Level"
            value="Gold"
            icon={Award}
            color="accent"
            subtitle="Keep it up!"
          />
        </div>

        {/* Nearby Food Listings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Food</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map(food => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>

        {/* Map View */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Map View</h2>
          <MapView foodItems={foodItems} height="400px" />
        </div>
      </div>
    </div>
  );
}

export default IndividualDashboard;
