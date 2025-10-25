import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  Search,
  MapPin,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Filter,
  Clock,
  Users,
  Heart,
  ChevronDown,
  X,
  Menu,
  Star,
  TrendingUp,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample food data
const mockFoodItems = [
  {
    id: 1,
    title: "Fresh Vegetable Curry",
    description: "Homemade vegetable curry with rice. Perfect for 4-5 people.",
    servings: 5,
    category: "cooked",
    location: "Mohan Babu University Campus",
    coordinates: [13.62, 79.2903],
    expiryTime: "2 hours",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    donor: "Priya Sharma",
    status: "available",
    distance: 0.5,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Packaged Bread & Butter",
    description: "Unopened bread loaves and butter packets.",
    servings: 8,
    category: "packaged",
    location: "Sree Sainath Nagar, Tirupati",
    coordinates: [13.618, 79.292],
    expiryTime: "1 day",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    donor: "Raj Patel",
    status: "available",
    distance: 0.8,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Fresh Fruits Basket",
    description: "Assorted fresh fruits - apples, bananas, oranges.",
    servings: 10,
    category: "fruits",
    location: "Chandragiri Road, Tirupati",
    coordinates: [13.625, 79.305],
    expiryTime: "4 hours",
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop",
    donor: "Anita Kumar",
    status: "available",
    distance: 1.5,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Biryani & Raita",
    description: "Delicious chicken biryani with cucumber raita.",
    servings: 6,
    category: "cooked",
    location: "Near Chandragiri Railway Station",
    coordinates: [13.628, 79.312],
    expiryTime: "3 hours",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    donor: "Mohammed Ali",
    status: "claimed",
    distance: 2.1,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Fresh Bakery Items",
    description: "Croissants, muffins, and pastries from morning batch.",
    servings: 12,
    category: "bakery",
    location: "Naravaripalle, Tirupati",
    coordinates: [13.615, 79.275],
    expiryTime: "6 hours",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    donor: "Cafe Delight",
    status: "available",
    distance: 1.8,
    rating: 4.5,
  },
  {
    id: 6,
    title: "Dal Tadka & Roti",
    description: "Yellow dal tadka with fresh rotis.",
    servings: 4,
    category: "cooked",
    location: "Pullaiahgaripalli, Tirupati",
    coordinates: [13.632, 79.3],
    expiryTime: "2 hours",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
    donor: "Sunita Menon",
    status: "available",
    distance: 1.2,
    rating: 4.8,
  },
  {
    id: 7,
    title: "Idli & Sambar",
    description: "Fresh steamed idlis with sambar and coconut chutney.",
    servings: 8,
    category: "cooked",
    location: "MBU Hostel Area",
    coordinates: [13.619, 79.2895],
    expiryTime: "3 hours",
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop",
    donor: "Lakshmi Devi",
    status: "available",
    distance: 0.3,
    rating: 4.9,
  },
  {
    id: 8,
    title: "Mixed Vegetable Pulao",
    description: "Aromatic vegetable pulao with raita.",
    servings: 6,
    category: "cooked",
    location: "Near SVEC Campus",
    coordinates: [13.621, 79.294],
    expiryTime: "2 hours",
    image:
      "https://images.unsplash.com/photo-1596040033229-a0b3b7c56427?w=400&h=300&fit=crop",
    donor: "Venkat Reddy",
    status: "available",
    distance: 0.6,
    rating: 4.7,
  },
  {
    id: 9,
    title: "Fresh Banana Bundle",
    description: "Locally grown ripe bananas, perfect for distribution.",
    servings: 15,
    category: "fruits",
    location: "Tirupati Fruit Market Area",
    coordinates: [13.635, 79.31],
    expiryTime: "1 day",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    donor: "Fruit Vendor Association",
    status: "available",
    distance: 2.5,
    rating: 4.6,
  },
  {
    id: 10,
    title: "Chapati & Paneer Curry",
    description: "Whole wheat chapatis with paneer butter masala.",
    servings: 7,
    category: "cooked",
    location: "Ramireddypalle",
    coordinates: [13.627, 79.288],
    expiryTime: "2 hours",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
    donor: "Ravi Kumar",
    status: "available",
    distance: 1.0,
    rating: 4.8,
  },
];

// Category colors
const categoryColors = {
  cooked: "#16A34A",
  raw: "#EAB308",
  packaged: "#8B5CF6",
  fruits: "#F97316",
  bakery: "#EC4899",
};

// Custom marker icon
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative;">
        <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
            </filter>
          </defs>
          <path d="M16 0C7.163 0 0 7.163 0 16c0 13 16 26 16 26s16-13 16-26C32 7.163 24.837 0 16 0z" 
                fill="${color}" stroke="white" stroke-width="2.5" filter="url(#shadow)"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
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
  const [userLocation, setUserLocation] = useState([13.62, 79.2903]);
  const [mapCenter, setMapCenter] = useState([13.62, 79.2903]);
  const [mapZoom, setMapZoom] = useState(13);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [hoveredFood, setHoveredFood] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mapStyle, setMapStyle] = useState("standard");
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
        () => console.log("Location access denied")
      );
    }
  }, []);

  // Filter food items
  const filteredFoodItems = foodItems.filter((food) => {
    const matchesSearch =
      food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || food.category === filterCategory;
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

  // Handle locate me - Fixed
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude];
          setUserLocation(pos);
          setMapCenter(pos);
          setMapZoom(15);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enable location services.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  // Get tile layer - Clean Swiggy-style map
  const getTileLayer = () => {
    if (mapStyle === "satellite") {
      return {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "&copy; Esri",
      };
    }
    // Using CartoDB Positron for clean, minimal map style like Swiggy
    return {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    };
  };

  const tileLayer = getTileLayer();

  return (
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Top Navigation Bar - Premium Design - Responsive */}
      <nav className="bg-white border-b border-gray-100 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl p-2 md:p-2.5 shadow-lg shadow-green-500/30">
            <Heart className="w-5 h-5 md:w-7 md:h-7 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              FoodShare
            </h1>
            <p className="text-xs text-gray-500 font-medium hidden sm:block">Share food, spread love</p>
          </div>
        </div>

        {/* <div className="hidden md:flex items-center space-x-3">
          <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
            About
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-xl transition-all">
            How it Works
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105">
            + Donate Food
          </button>
        </div> */}

        <button
          className="md:hidden p-2 md:p-2.5 hover:bg-gray-50 rounded-xl transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Food List */}
        <div
          className={`${
            isMobileMenuOpen ? "absolute inset-0 z-40 bg-white" : "hidden"
          } md:block md:relative w-full md:w-[420px] bg-white border-r border-gray-100 overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            {/* Search and Filters - Enhanced */}
            <div className="p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
              {/* Search Bar - Premium */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search food, location or donor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all shadow-sm text-sm"
                />
              </div>

              {/* Filter Row - Enhanced */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-green-500 transition-all shadow-sm"
                >
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 bg-green-50 rounded-xl">
                    <span className="text-sm font-bold text-green-700">
                      {filteredFoodItems.length}
                    </span>
                    <span className="text-xs text-green-600 ml-1">available</span>
                  </div>
                </div>
              </div>

              {/* Filter Options - Enhanced */}
              {showFilters && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {["all", "cooked", "packaged", "fruits", "bakery"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          filterCategory === cat
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Food Cards List - Premium Design */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
              {filteredFoodItems.map((food) => (
                <div
                  key={food.id}
                  onClick={() => handleFoodClick(food)}
                  onMouseEnter={() => setHoveredFood(food.id)}
                  onMouseLeave={() => setHoveredFood(null)}
                  className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedFood === food.id
                      ? "ring-2 ring-green-500 shadow-2xl shadow-green-500/20 scale-[1.02]"
                      : hoveredFood === food.id
                      ? "shadow-xl scale-[1.01]"
                      : "shadow-md hover:shadow-xl"
                  }`}
                >
                  {/* Food Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={food.image}
                      alt={food.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <span
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg backdrop-blur-sm"
                        style={{
                          backgroundColor: categoryColors[food.category],
                        }}
                      >
                        {food.category.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-lg backdrop-blur-sm ${
                          food.status === "available"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {food.status === "available" ? "● Available" : "● Claimed"}
                      </span>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-xs font-bold text-gray-900">
                            {food.distance} km away
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="text-xs font-bold text-gray-900">
                            {food.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-1.5 line-clamp-1">
                      {food.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {food.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3">
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Servings</p>
                          <p className="text-sm font-bold text-gray-900">
                            {food.servings} people
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-3">
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Expires in</p>
                          <p className="text-sm font-bold text-gray-900">
                            {food.expiryTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Location & Donor */}
                    <div className="space-y-2.5 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        <span className="font-medium">{food.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xs mr-2 shadow-md">
                          {food.donor.charAt(0)}
                        </div>
                        <span className="font-medium">Donated by <span className="text-gray-900 font-semibold">{food.donor}</span></span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 text-sm">
                        View Details
                      </button>
                      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30">
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
          <div className="absolute top-4 md:top-6 right-4 md:right-6 z-[1000] flex flex-col space-y-2 md:space-y-3">
            {/* Map Style Toggle */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-1.5 md:p-2">
              <button
                onClick={() =>
                  setMapStyle(
                    mapStyle === "standard" ? "satellite" : "standard"
                  )
                }
                className="p-2 md:p-3 hover:bg-gray-50 rounded-lg md:rounded-xl transition-colors"
                title="Toggle Map Style"
              >
                <Layers className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-1.5 md:p-2 space-y-1">
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setZoom(mapRef.current.getZoom() + 1);
                  }
                }}
                className="p-2 md:p-3 hover:bg-gray-50 rounded-lg md:rounded-xl transition-colors block w-full"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
              <div className="h-px bg-gray-200 mx-2"></div>
              <button
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setZoom(mapRef.current.getZoom() - 1);
                  }
                }}
                className="p-2 md:p-3 hover:bg-gray-50 rounded-lg md:rounded-xl transition-colors block w-full"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Map Stats Card - Premium - Responsive */}
          <div className="absolute bottom-20 md:bottom-6 left-4 md:left-6 z-[1000] bg-white rounded-xl md:rounded-2xl shadow-2xl p-3 md:p-5 backdrop-blur-sm border border-gray-100">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Available</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {filteredFoodItems.filter((f) => f.status === "available").length}
                  </p>
                </div>
              </div>
              <div className="h-10 md:h-12 w-px bg-gray-200"></div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Claimed</p>
                  <p className="text-lg md:text-2xl font-bold text-gray-900">
                    {filteredFoodItems.filter((f) => f.status === "claimed").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Locate Me Button - Premium - Fixed and Responsive */}
          <button
            onClick={handleLocateMe}
            className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-[1000] bg-gradient-to-r from-green-500 to-green-600 rounded-xl md:rounded-2xl shadow-2xl shadow-green-500/40 p-3 md:p-4 hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95"
            title="Find My Location"
          >
            <Navigation className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Map Container */}
          <MapContainer
            ref={mapRef}
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
            zoomControl={false}
            className="swiggy-map"
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
              className="map-tiles"
            />

            <style>{`
              .swiggy-map {
                background: #f8f9fa !important;
              }
              
              .map-tiles {
                filter: grayscale(20%) contrast(110%) brightness(105%);
              }
              
              /* Hide all labels and make map cleaner */
              .leaflet-container {
                background: #f8f9fa;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              }
              
              .leaflet-popup-content-wrapper {
                border-radius: 16px !important;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
                padding: 0 !important;
                border: 1px solid #e5e7eb;
              }
              
              .leaflet-popup-content {
                margin: 0 !important;
                width: auto !important;
              }
              
              .leaflet-popup-tip {
                box-shadow: 0 3px 14px rgba(0,0,0,0.1) !important;
                border: 1px solid #e5e7eb;
                border-top: none;
                border-right: none;
              }
              
              .custom-marker {
                filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
              }
              
              /* Smooth animations */
              .leaflet-marker-icon, .leaflet-popup {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}</style>

            <RecenterMap center={mapCenter} />

            {/* User Location Marker */}
            <Marker
              position={userLocation}
              icon={L.divIcon({
                className: "user-location-marker",
                html: `
                  <div style="
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
                    border: 4px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(37, 99, 235, 0.4);
                    animation: pulse 2s infinite;
                  "></div>
                  <style>
                    @keyframes pulse {
                      0%, 100% { box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2), 0 4px 12px rgba(37, 99, 235, 0.4); }
                      50% { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(37, 99, 235, 0.4); }
                    }
                  </style>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            >
              <Popup>
                <div className="text-sm font-bold text-blue-600 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Your Location</span>
                </div>
              </Popup>
            </Marker>

            {/* Search Radius Circle */}
            <Circle
              center={userLocation}
              radius={searchRadius * 1000}
              pathOptions={{
                color: "#3B82F6",
                weight: 2,
                fillColor: "#3B82F6",
                fillOpacity: 0.08,
                opacity: 0.3,
                dashArray: "5, 10",
              }}
            />

            {/* Food Markers */}
            {filteredFoodItems.map(
              (food) =>
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
                    <Popup maxWidth={320} className="custom-popup">
                      <div className="min-w-[280px]">
                        {/* Image */}
                        <div className="relative">
                          <img
                            src={food.image}
                            alt={food.title}
                            className="w-full h-36 object-cover rounded-xl mb-4"
                          />
                          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-lg">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-bold text-gray-900">
                                {food.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-bold text-gray-900 mb-2 text-base">
                          {food.title}
                        </h3>
                        <p className="text-gray-600 text-xs mb-4 line-clamp-2 leading-relaxed">
                          {food.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-green-600" />
                              <div>
                                <p className="text-xs text-gray-600 font-medium">Servings</p>
                                <p className="text-sm font-bold text-gray-900">
                                  {food.servings}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-3">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-xs text-gray-600 font-medium">Available</p>
                                <p className="text-sm font-bold text-gray-900">
                                  {food.expiryTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Location & Donor */}
                        <div className="space-y-2.5 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                            <span className="font-medium">{food.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xs mr-2">
                              {food.donor.charAt(0)}
                            </div>
                            <span className="font-medium">{food.donor}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-md">
                            View Details
                          </button>
                          <button
                            onClick={() => {
                              const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${food.coordinates[0]},${food.coordinates[1]}`;
                              window.open(url, "_blank");
                            }}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                          >
                            <Navigation className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default MapView;