// import { useEffect } from 'react';
// import { Package, Heart, TrendingUp, Award } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import Navbar from '../../components/Navbar';
// import AnalyticsCard from '../../components/AnalyticsCard';
// import FoodCard from '../../components/FoodCard';
// import MapView from '../../components/MapView';
// import { setImpactData } from '../../features/analyticsSlice';
// import { setFoodItems } from '../../features/foodSlice';

// function IndividualDashboard() {
//   const { user } = useSelector(state => state.auth);
//   const { impactData } = useSelector(state => state.analytics);
//   const { foodItems } = useSelector(state => state.food);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Mock impact data - replace with real API call
//     dispatch(setImpactData({
//       mealsDonated: 45,
//       peopleFed: 23,
//       co2Saved: 12.5,
//     }));

//     // Mock food items nearby
//     const mockFoodItems = [
//       {
//         id: '1',
//         title: 'Fresh Vegetables',
//         description: 'Surplus vegetables from my garden',
//         location: 'Andheri West, Mumbai',
//         expiryTime: '2 hours',
//         donorName: 'Rajesh Kumar',
//         status: 'available',
//         servings: 5,
//         coordinates: [19.1136, 72.8697],
//         image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
//       },
//       {
//         id: '2',
//         title: 'Cooked Rice & Curry',
//         description: 'Freshly cooked meal, enough for 10 people',
//         location: 'Bandra, Mumbai',
//         expiryTime: '1 hour',
//         donorName: 'Priya Sharma',
//         status: 'available',
//         servings: 10,
//         coordinates: [19.0596, 72.8295],
//         image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
//       },
//     ];
//     dispatch(setFoodItems(mockFoodItems));
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Welcome back, {user?.name}! ❤️
//           </h1>
//           <p className="text-gray-600">
//             You've helped feed {impactData.peopleFed} people this month
//           </p>
//         </div>

//         {/* Impact Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <AnalyticsCard
//             title="Meals Donated"
//             value={impactData.mealsDonated}
//             icon={Package}
//             color="primary"
//             subtitle="+12 this week"
//           />
//           <AnalyticsCard
//             title="People Fed"
//             value={impactData.peopleFed}
//             icon={Heart}
//             color="secondary"
//             subtitle="Making a difference"
//           />
//           <AnalyticsCard
//             title="CO₂ Saved"
//             value={`${impactData.co2Saved} kg`}
//             icon={TrendingUp}
//             color="accent"
//             subtitle="Environmental impact"
//           />
//           <AnalyticsCard
//             title="Current Level"
//             value="Gold"
//             icon={Award}
//             color="accent"
//             subtitle="Keep it up!"
//           />
//         </div>

//         {/* Nearby Food Listings */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Nearby Food</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {foodItems.map(food => (
//               <FoodCard key={food.id} food={food} />
//             ))}
//           </div>
//         </div>

//         {/* Map View */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Map View</h2>
//           <MapView foodItems={foodItems} height="400px" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IndividualDashboard;






import { useEffect, useState, useRef } from 'react';
import { Package, Heart, TrendingUp, Award, PlusCircle, Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import AnalyticsCard from '../../components/AnalyticsCard';
import FoodCard from '../../components/FoodCard';
import MapView from '../../components/MapView';
import { setImpactData } from '../../features/analyticsSlice';
import { setFoodItems } from '../../features/foodSlice';

// Mapbox token (use your project token)
const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2tzNmd4YW41MGZzZzJ2bWYyZ3poNWQzOSJ9.exampLeToKenHere";

const foodCategories = [
  { value: 'cooked', label: 'Cooked Food' },
  { value: 'raw', label: 'Raw Vegetables/Fruits' },
  { value: 'packaged', label: 'Packaged Food' },
  { value: 'fruits', label: 'Fruits' },
  { value: 'bakery', label: 'Bakery Items' },
];

function IndividualDashboard() {
  const { user } = useSelector(state => state.auth);
  const { impactData } = useSelector(state => state.analytics);
  const { foodItems } = useSelector(state => state.food);
  const dispatch = useDispatch();

  // States for new post
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    category: foodCategories[0].value,
    servings: '',
    expiryTime: '',
    location: '',
    coordinates: null,
    image: '',
    imageFile: null,
    pickupTime: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [imgPreview, setImgPreview] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationResults, setLocationResults] = useState([]);
  const locationInputRef = useRef();

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
        category: 'raw',
        pickupTime: '2025-10-25T07:30'
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
        category: 'cooked',
        pickupTime: '2025-10-25T09:00'
      },
    ];
    dispatch(setFoodItems(mockFoodItems));
  }, [dispatch]);

  // Handle field changes in creation form
  const handleNewPostChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length) {
      setNewPost(prev => ({ ...prev, imageFile: files[0], image: '' }));
      setImgPreview(URL.createObjectURL(files[0]));
    } else {
      setNewPost(prev => ({ ...prev, [name]: value }));
      if (name === "image") setImgPreview('');
    }
  };

  // Location autocomplete using Mapbox
  const fetchLocationSuggestions = async (query) => {
    if (!query) {
      setLocationResults([]); return;
    }
    setLocationLoading(true);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&limit=5&country=IN`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setLocationResults(data.features || []);
    } catch {
      setLocationResults([]);
    }
    setLocationLoading(false);
  };

  // Handle location typing with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (newPost.location) fetchLocationSuggestions(newPost.location);
    }, 400);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [newPost.location]);

  // On location select
  const handleLocationSelect = (feature) => {
    setNewPost(prev => ({
      ...prev,
      location: feature.place_name,
      coordinates: feature.center,
    }));
    setLocationResults([]);
  };

  // Submit post
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    // Validate
    if (!newPost.title || !newPost.servings || !newPost.expiryTime || !newPost.location || !newPost.category || !newPost.pickupTime) return alert('Please fill all fields');
    setSubmitting(true);

    // Simulated image upload to cloud
    let imageUrl = '';
    if (newPost.imageFile) {
      imageUrl = imgPreview;
    } else if (newPost.image) {
      imageUrl = newPost.image;
    }

    const newId = (Date.now() % 999999).toString();
    const formattedItem = {
      id: newId,
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      expiryTime: newPost.expiryTime,
      donorName: user?.name || "Anonymous",
      status: 'available',
      servings: parseInt(newPost.servings, 10),
      coordinates: newPost.coordinates,
      image: imageUrl,
      category: newPost.category,
      pickupTime: newPost.pickupTime,
      createdAt: new Date().toISOString(),
    };
    dispatch(setFoodItems([formattedItem, ...foodItems]));
    setNewPost({
      title: '',
      description: '',
      category: foodCategories[0].value,
      servings: '',
      expiryTime: '',
      location: '',
      coordinates: null,
      image: '',
      imageFile: null,
      pickupTime: '',
    });
    setImgPreview('');
    setSubmitting(false);
    if (locationInputRef.current) locationInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || "Friend"}! ❤️
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

        {/* Food Donation Post Creation */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><PlusCircle className="mr-2" /> List Surplus Food</h2>
          <form className="grid md:grid-cols-2 gap-8" onSubmit={handleNewPostSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title *</label>
                <input
                  name="title"
                  type="text"
                  value={newPost.title}
                  onChange={handleNewPostChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  maxLength={60}
                  placeholder="E.g. Home-cooked Dal Chawal"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <textarea
                  name="description"
                  value={newPost.description}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  rows={2}
                  placeholder="Describe the food, portion, allergies etc."
                  maxLength={200}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Category *</label>
                <select
                  name="category"
                  value={newPost.category}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  required
                >
                  {foodCategories.map(opt => (
                    <option value={opt.value} key={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Quantity/Servings *</label>
                <input
                  name="servings"
                  type="number"
                  value={newPost.servings}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  min={1}
                  required
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Expiry Time *</label>
                <input
                  name="expiryTime"
                  type="text"
                  value={newPost.expiryTime}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  required
                  placeholder="e.g. 2 hours, 30 mins"
                  maxLength={32}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Pickup Time *</label>
                <input
                  name="pickupTime"
                  type="datetime-local"
                  value={newPost.pickupTime}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Location *</label>
                <input
                  ref={locationInputRef}
                  name="location"
                  type="text"
                  value={newPost.location}
                  onChange={handleNewPostChange}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                  autoComplete="off"
                  required
                  placeholder="Search location"
                />
                {locationLoading && <div className="text-xs text-gray-500 mt-1">Searching...</div>}
                {!locationLoading && locationResults.length > 0 && (
                  <div className="border rounded-lg bg-white absolute z-10 w-full mt-2 max-h-44 overflow-y-auto shadow">
                    {locationResults.map(result => (
                      <div
                        key={result.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => handleLocationSelect(result)}
                      >
                        {result.place_name}
                      </div>
                    ))}
                  </div>
                )}
                {newPost.coordinates && (
                  <div className="text-xs text-green-600 mt-1">📌 Lat: {newPost.coordinates[1].toFixed(4)}, Lng: {newPost.coordinates[0].toFixed(4)}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Upload Food Image</label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleNewPostChange}
                  className="w-full"
                />
                {imgPreview && (
                  <img src={imgPreview} alt="Preview" className="h-32 rounded-lg mt-2 shadow border" />
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
              >
                {submitting ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : <PlusCircle className="mr-2 h-5 w-5" />}
                {submitting ? "Posting..." : "Add Food"}
              </button>
            </div>
          </form>
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
