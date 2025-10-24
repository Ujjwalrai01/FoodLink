// // import { Link } from 'react-router-dom'
// // import { Heart, Users, TrendingUp, Shield, MapPin, Award } from 'lucide-react'
// // import Navbar from '../../components/Navbar'

// // function Home() {
// //   const features = [
// //     {
// //       icon: Heart,
// //       title: 'Donate Food',
// //       description: 'Share your surplus food with those who need it most',
// //       color: 'text-red-600'
// //     },
// //     {
// //       icon: Users,
// //       title: 'Help Communities',
// //       description: 'Connect with NGOs and volunteers in your area',
// //       color: 'text-blue-600'
// //     },
// //     {
// //       icon: Shield,
// //       title: 'Verified Network',
// //       description: 'All organizations are verified for your safety',
// //       color: 'text-green-600'
// //     },
// //     {
// //       icon: Award,
// //       title: 'Earn Badges',
// //       description: 'Track your impact and earn recognition',
// //       color: 'text-yellow-600'
// //     },
// //   ]

// //   const stats = [
// //     { value: '10,000+', label: 'Meals Donated' },
// //     { value: '500+', label: 'Active Users' },
// //     { value: '50+', label: 'NGO Partners' },
// //     { value: '25+', label: 'Cities Covered' },
// //   ]

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <Navbar />

// //       {/* Hero Section */}
// //       <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid md:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
// //                 Connecting Surplus Food with{' '}
// //                 <span className="text-primary">Hungry Hearts</span>
// //               </h1>
// //               <p className="text-xl text-gray-600 mb-8">
// //                 Join India's largest food-sharing platform. Donate surplus food,
// //                 help the community, and make a real difference.
// //               </p>
// //               <div className="flex flex-wrap gap-4">
// //                 <Link
// //                   to="/register"
// //                   className="bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
// //                 >
// //                   Donors
// //                 </Link>
// //                 <Link
// //                   to="/food/feed"
// //                   className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-primary hover:bg-green-50 transition-all"
// //                 >
// //                   Receivers
// //                 </Link>
// //               </div>
// //             </div>
// //             <div className="relative">
// //               <img
// //                 src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
// //                 alt="Food Donation"
// //                 className="rounded-2xl shadow-2xl"
// //               />
// //               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
// //                 <div className="flex items-center space-x-3">
// //                   <Heart className="w-8 h-8 text-primary" fill="#16A34A" />
// //                   <div>
// //                     <p className="text-2xl font-bold text-gray-900">5,000+</p>
// //                     <p className="text-sm text-gray-600">People Fed Today</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-16 bg-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="text-center">
// //                 <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
// //                 <p className="text-gray-600">{stat.label}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="py-20 bg-gray-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-16">
// //             <h2 className="text-4xl font-bold text-gray-900 mb-4">
// //               Why Choose FoodLink?
// //             </h2>
// //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
// //               A comprehensive platform designed to make food donation simple, safe, and impactful
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
// //             {features.map((feature, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
// //               >
// //                 <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
// //                 <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                   {feature.title}
// //                 </h3>
// //                 <p className="text-gray-600">{feature.description}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="py-20 bg-primary text-white">
// //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
// //           <h2 className="text-4xl font-bold mb-4">
// //             Ready to Make a Difference?
// //           </h2>
// //           <p className="text-xl mb-8 opacity-90">
// //             Join thousands of donors and volunteers making an impact every day
// //           </p>
// //           <Link
// //             to="/register"
// //             className="inline-block bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
// //           >
// //             Start Donating Today
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-gray-900 text-white py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid md:grid-cols-4 gap-8">
// //             <div>
// //               <div className="flex items-center space-x-2 mb-4">
// //                 <Heart className="w-8 h-8" fill="white" />
// //                 <span className="text-2xl font-bold">FoodLink</span>
// //               </div>
// //               <p className="text-gray-400">
// //                 Connecting surplus food with hungry hearts across India
// //               </p>
// //             </div>
// //             <div>
// //               <h4 className="font-bold mb-4">Quick Links</h4>
// //               <ul className="space-y-2 text-gray-400">
// //                 <li><Link to="/about" className="hover:text-white">About Us</Link></li>
// //                 <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
// //                 <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-bold mb-4">For Organizations</h4>
// //               <ul className="space-y-2 text-gray-400">
// //                 <li><Link to="/ngo" className="hover:text-white">NGO Partners</Link></li>
// //                 <li><Link to="/business" className="hover:text-white">Businesses</Link></li>
// //                 <li><Link to="/verify" className="hover:text-white">Get Verified</Link></li>
// //               </ul>
// //             </div>
// //             <div>
// //               <h4 className="font-bold mb-4">Legal</h4>
// //               <ul className="space-y-2 text-gray-400">
// //                 <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
// //                 <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
// //               </ul>
// //             </div>
// //           </div>
// //           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
// //             <p>&copy; 2024 FoodLink. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   )
// // }

// // export default Home

// import { useState, useEffect } from 'react';
// import { Heart, Users, TrendingUp, Shield, MapPin, Award, ArrowRight, Clock, Package, Star, CheckCircle, MessageCircle, Phone, Mail } from 'lucide-react';

// // Mock Navbar Component
// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <Heart className="w-8 h-8 text-green-600" fill="#16A34A" />
//             <span className="text-2xl font-bold text-gray-900">FoodLink</span>
//           </div>
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
//             <a href="#how-it-works" className="text-gray-700 hover:text-green-600 transition-colors">How It Works</a>
//             <a href="#impact" className="text-gray-700 hover:text-green-600 transition-colors">Our Impact</a>
//             <a href="#map" className="text-gray-700 hover:text-green-600 transition-colors">Live Map</a>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="text-green-600 font-semibold hover:text-green-700">Login</button>
//             <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// // Interactive Map Component with real-time donations
// const LiveDonationMap = () => {
//   const [donations, setDonations] = useState([
//     { id: 1, city: 'Mumbai', lat: 19.0760, lng: 72.8777, meals: 150, active: true },
//     { id: 2, city: 'Delhi', lat: 28.6139, lng: 77.2090, meals: 200, active: true },
//     { id: 3, city: 'Bangalore', lat: 12.9716, lng: 77.5946, meals: 120, active: false },
//     { id: 4, city: 'Chennai', lat: 13.0827, lng: 80.2707, meals: 90, active: true },
//     { id: 5, city: 'Kolkata', lat: 22.5726, lng: 88.3639, meals: 110, active: false },
//     { id: 6, city: 'Hyderabad', lat: 17.3850, lng: 78.4867, meals: 85, active: true },
//   ]);

//   const [selectedCity, setSelectedCity] = useState(null);

//   return (
//     <div className="bg-gray-100 rounded-2xl p-8 relative overflow-hidden">
//       <div className="absolute inset-0 opacity-10">
//         <svg viewBox="0 0 1000 600" className="w-full h-full">
//           <path d="M 100,300 Q 250,100 400,300 T 700,300 T 1000,300" stroke="#16A34A" strokeWidth="2" fill="none" />
//           <path d="M 200,200 Q 350,400 500,200 T 800,200" stroke="#16A34A" strokeWidth="2" fill="none" />
//         </svg>
//       </div>

//       <div className="relative">
//         <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Live Donation Activity Across India</h3>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
//           {donations.map(donation => (
//             <div
//               key={donation.id}
//               onClick={() => setSelectedCity(donation)}
//               className={`bg-white rounded-xl p-4 cursor-pointer transition-all ${
//                 selectedCity?.id === donation.id ? 'ring-2 ring-green-600 shadow-lg' : 'hover:shadow-md'
//               }`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <MapPin className={`w-5 h-5 ${donation.active ? 'text-green-600' : 'text-gray-400'}`} />
//                 {donation.active && (
//                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 )}
//               </div>
//               <h4 className="font-bold text-gray-900">{donation.city}</h4>
//               <p className="text-sm text-gray-600">{donation.meals} meals</p>
//             </div>
//           ))}
//         </div>

//         {selectedCity && (
//           <div className="bg-white rounded-xl p-6 border-2 border-green-200">
//             <div className="flex items-center justify-between mb-4">
//               <h4 className="text-xl font-bold text-gray-900">{selectedCity.city}</h4>
//               <button
//                 onClick={() => setSelectedCity(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-sm text-gray-600">Active Donations</p>
//                 <p className="text-2xl font-bold text-green-600">{selectedCity.meals}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Status</p>
//                 <p className="text-sm font-semibold text-green-600">
//                   {selectedCity.active ? '🟢 Active Now' : '⚫ Offline'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">Real-time updates • Last updated: Just now</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Testimonial Component
// const TestimonialCard = ({ name, role, image, quote, rating }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
//       <div className="flex items-center mb-4">
//         {[...Array(rating)].map((_, i) => (
//           <Star key={i} className="w-5 h-5 text-yellow-500" fill="#EAB308" />
//         ))}
//       </div>
//       <p className="text-gray-600 mb-4 italic">"{quote}"</p>
//       <div className="flex items-center">
//         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
//           {name.charAt(0)}
//         </div>
//         <div className="ml-3">
//           <p className="font-bold text-gray-900">{name}</p>
//           <p className="text-sm text-gray-500">{role}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Counter Animation Hook
// const useCounter = (end, duration = 2000) => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTime;
//     const animate = (currentTime) => {
//       if (!startTime) startTime = currentTime;
//       const progress = (currentTime - startTime) / duration;

//       if (progress < 1) {
//         setCount(Math.floor(end * progress));
//         requestAnimationFrame(animate);
//       } else {
//         setCount(end);
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [end, duration]);

//   return count;
// };

// const AnimatedStat = ({ value, label }) => {
//   const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
//   const animatedValue = useCounter(numericValue);
//   const suffix = value.replace(/[0-9]/g, '');

//   return (
//     <div className="text-center">
//       <p className="text-4xl font-bold text-green-600 mb-2">
//         {animatedValue}{suffix}
//       </p>
//       <p className="text-gray-600">{label}</p>
//     </div>
//   );
// };

// function Home() {
//   const features = [
//     {
//       icon: Heart,
//       title: 'Donate Food',
//       description: 'Share your surplus food with those who need it most',
//       color: 'text-red-600',
//       bgColor: 'bg-red-50'
//     },
//     {
//       icon: Users,
//       title: 'Help Communities',
//       description: 'Connect with NGOs and volunteers in your area',
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       icon: Shield,
//       title: 'Verified Network',
//       description: 'All organizations are verified for your safety',
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       icon: Award,
//       title: 'Earn Badges',
//       description: 'Track your impact and earn recognition',
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50'
//     },
//   ];

//   const stats = [
//     { value: '10,000+', label: 'Meals Donated' },
//     { value: '500+', label: 'Active Users' },
//     { value: '50+', label: 'NGO Partners' },
//     { value: '25+', label: 'Cities Covered' },
//   ];

//   const howItWorksSteps = [
//     {
//       step: 1,
//       title: 'Sign Up',
//       description: 'Create your account as a donor or receiver in under 2 minutes',
//       icon: Users
//     },
//     {
//       step: 2,
//       title: 'Post or Browse',
//       description: 'Donors post surplus food, receivers browse available donations nearby',
//       icon: Package
//     },
//     {
//       step: 3,
//       title: 'Connect',
//       description: 'Get matched with donors/receivers and coordinate pickup details',
//       icon: MessageCircle
//     },
//     {
//       step: 4,
//       title: 'Make Impact',
//       description: 'Complete the donation and track your positive social impact',
//       icon: TrendingUp
//     },
//   ];

//   const testimonials = [
//     {
//       name: 'Priya Sharma',
//       role: 'Restaurant Owner, Mumbai',
//       quote: 'FoodLink has helped us donate over 500 meals from our restaurant. It feels amazing to reduce waste and help the community!',
//       rating: 5
//     },
//     {
//       name: 'Akshay NGO',
//       role: 'NGO Coordinator',
//       quote: 'This platform has been a game-changer for our organization. We can now feed 100+ people daily with donated food.',
//       rating: 5
//     },
//     {
//       name: 'Rajesh Kumar',
//       role: 'Individual Donor',
//       quote: 'I love how easy it is to donate leftover food from family events. The pickup process is seamless!',
//       rating: 5
//     },
//   ];

//   const recentDonations = [
//     { donor: 'Mumbai Restaurant', meals: 50, time: '5 mins ago', location: 'Bandra, Mumbai' },
//     { donor: 'Delhi Caterers', meals: 120, time: '12 mins ago', location: 'Connaught Place, Delhi' },
//     { donor: 'Bangalore Hotel', meals: 80, time: '20 mins ago', location: 'Koramangala, Bangalore' },
//     { donor: 'Chennai Kitchen', meals: 60, time: '35 mins ago', location: 'T Nagar, Chennai' },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//                 🌟 Join 10,000+ Happy Users
//               </div>
//               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//                 Connecting Surplus Food with{' '}
//                 <span className="text-green-600">Hungry Hearts</span>
//               </h1>
//               <p className="text-xl text-gray-600 mb-8">
//                 Join India's largest food-sharing platform. Donate surplus food,
//                 help the community, and make a real difference—one meal at a time.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button className="bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
//                   Start as Donor
//                   <ArrowRight size={20} />
//                 </button>
//                 <button className="bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-green-600 hover:bg-green-50 transition-all">
//                   I Need Food
//                 </button>
//               </div>

//               <div className="mt-8 flex items-center gap-6">
//                 <div className="flex -space-x-3">
//                   {[1, 2, 3, 4].map(i => (
//                     <div key={i} className="w-10 h-10 bg-green-200 rounded-full border-2 border-white flex items-center justify-center text-green-700 font-bold">
//                       {String.fromCharCode(65 + i)}
//                     </div>
//                   ))}
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-900">500+ Active Today</p>
//                   <p className="text-xs text-gray-600">Making a difference</p>
//                 </div>
//               </div>
//             </div>

//             <div className="relative">
//               <img
//                 src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
//                 alt="Food Donation"
//                 className="rounded-2xl shadow-2xl"
//               />
//               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
//                 <div className="flex items-center space-x-3">
//                   <Heart className="w-8 h-8 text-green-600" fill="#16A34A" />
//                   <div>
//                     <p className="text-2xl font-bold text-gray-900">5,000+</p>
//                     <p className="text-sm text-gray-600">People Fed Today</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute -top-4 -right-4 bg-green-600 text-white p-4 rounded-2xl shadow-xl">
//                 <div className="flex items-center space-x-2">
//                   <Clock className="w-6 h-6" />
//                   <div>
//                     <p className="text-lg font-bold">24/7</p>
//                     <p className="text-xs">Active</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section with Animation */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <AnimatedStat key={index} value={stat.value} label={stat.label} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Recent Donations Ticker */}
//       <section className="py-8 bg-green-50 border-y border-green-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-4 mb-4">
//             <TrendingUp className="w-6 h-6 text-green-600" />
//             <h3 className="text-lg font-bold text-gray-900">Recent Donations</h3>
//           </div>
//           <div className="grid md:grid-cols-4 gap-4">
//             {recentDonations.map((donation, idx) => (
//               <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
//                 <div className="flex items-start justify-between mb-2">
//                   <div>
//                     <p className="font-semibold text-gray-900">{donation.donor}</p>
//                     <p className="text-sm text-gray-600">{donation.location}</p>
//                   </div>
//                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                     {donation.meals} meals
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-500">{donation.time}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Why Choose FoodLink?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               A comprehensive platform designed to make food donation simple, safe, and impactful
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
//                   <feature.icon className={`w-8 h-8 ${feature.color}`} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Four simple steps to start making a difference
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {howItWorksSteps.map((item, index) => (
//               <div key={index} className="relative">
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                     <item.icon className="w-10 h-10 text-white" />
//                   </div>
//                   <div className="absolute top-10 left-1/2 w-full h-0.5 bg-green-200 -z-10 hidden md:block" style={{ display: index === 3 ? 'none' : 'block' }} />
//                   <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
//                     {item.step}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                   <p className="text-gray-600">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Impact Section */}
//       <section id="impact" className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold mb-4">Our Collective Impact</h2>
//             <p className="text-xl opacity-90">Together, we're making a real difference</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
//               <Package className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-4xl font-bold mb-2">2.5M kg</p>
//               <p className="text-lg">Food Saved from Waste</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
//               <Users className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-4xl font-bold mb-2">500K+</p>
//               <p className="text-lg">People Helped</p>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
//               <TrendingUp className="w-12 h-12 mx-auto mb-4" />
//               <p className="text-4xl font-bold mb-2">1.2M kg</p>
//               <p className="text-lg">CO₂ Emissions Reduced</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               What Our Community Says
//             </h2>
//             <p className="text-xl text-gray-600">
//               Real stories from real people making a difference
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <TestimonialCard key={index} {...testimonial} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Live Map Section */}
//       <section id="map" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Live Donation Activity
//             </h2>
//             <p className="text-xl text-gray-600">
//               See food donations happening in real-time across India
//             </p>
//           </div>
//           <LiveDonationMap />
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-green-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-bold mb-4">
//             Ready to Make a Difference?
//           </h2>
//           <p className="text-xl mb-8 opacity-90">
//             Join thousands of donors and volunteers making an impact every day
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg gap-2">
//               Start Donating Today
//               <ArrowRight size={20} />
//             </button>
//             <button className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Heart className="w-8 h-8" fill="white" />
//                 <span className="text-2xl font-bold">FoodLink</span>
//               </div>
//               <p className="text-gray-400 mb-4">
//                 Connecting surplus food with hungry hearts across India
//               </p>
//               <div className="flex gap-3">
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
//                   <span className="text-sm">f</span>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
//                   <span className="text-sm">T</span>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer">
//                   <span className="text-sm">in</span>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Quick Links</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">For Organizations</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white transition-colors">NGO Partners</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Businesses</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Get Verified</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Contact Us</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   <a href="mailto:hello@foodlink.in" className="hover:text-white transition-colors">
//                     hello@foodlink.in
//                   </a>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Phone className="w-4 h-4" />
//                   <a href="tel:+911234567890" className="hover:text-white transition-colors">
//                     +91 123 456 7890
//                   </a>
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <MapPin className="w-4 h-4" />
//                   <span>Mumbai, Maharashtra</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <p className="text-gray-400 text-sm">
//                 &copy; 2024 FoodLink. All rights reserved.
//               </p>
//               <div className="flex gap-6 text-sm text-gray-400">
//                 <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//                 <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
//                 <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import {
    Heart,
    Users,
    Package,
    TrendingUp,
    Shield,
    Award,
    Clock,
    ArrowRight,
    MapPin,
    MessageCircle,
    Star,
    Phone,
    Mail,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link, Links } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Navbar = () => (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-green-600" fill="#16A34A" />
                <span className="text-2xl font-bold text-gray-900">FoodLink</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
                <a
                    href="#features"
                    className="text-gray-700 hover:text-green-600 transition-colors"
                >
                    Features
                </a>
                <a
                    href="#how"
                    className="text-gray-700 hover:text-green-600 transition-colors"
                >
                    How It Works
                </a>
                <a
                    href="#impact"
                    className="text-gray-700 hover:text-green-600 transition-colors"
                >
                    Impact
                </a>
                <a
                    href="#map"
                    className="text-gray-700 hover:text-green-600 transition-colors"
                >
                    Map
                </a>
            </div>
            <div className="flex items-center space-x-4">
                <Link to={'/login'}>
                    <button className="text-green-600 font-semibold hover:text-green-700">
                        Login
                    </button>
                </Link>

                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Sign Up
                </button>
            </div>
        </div>
    </nav>
);

// Custom marker
const customMarker = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [1, -34],
});

const LiveDonationMap = () => {
    const cities = [
        {
            id: 1,
            name: "Mumbai",
            coords: [19.076, 72.8777],
            meals: 250,
            active: true,
        },
        {
            id: 2,
            name: "Delhi",
            coords: [28.6139, 77.209],
            meals: 300,
            active: true,
        },
        {
            id: 3,
            name: "Bangalore",
            coords: [12.9716, 77.5946],
            meals: 180,
            active: false,
        },
        {
            id: 4,
            name: "Kolkata",
            coords: [22.5726, 88.3639],
            meals: 120,
            active: true,
        },
    ];
    return (
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
                center={[22.97, 78.65]}
                zoom={5.2}
                style={{ height: "450px", width: "100%" }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((c) => (
                    <Marker position={c.coords} icon={customMarker} key={c.id}>
                        <Popup>
                            <div className="font-semibold">{c.name}</div>
                            <p>{c.meals} meals donated</p>
                            <p>Status: {c.active ? "🟢 Active" : "⚫ Inactive"}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

// Stat Counter Animation
const Counter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value.replace(/\D/g, ""), 10);
        const increment = end / 100;
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            } else setCount(Math.floor(start));
        }, 15);
        return () => clearInterval(timer);
    }, [value]);
    return (
        <div className="text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">
                {count.toLocaleString()}+
            </p>
            <p className="text-gray-600">{label}</p>
        </div>
    );
};

const TestimonialCard = ({ name, quote, role }) => (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
        <div className="flex gap-2 text-yellow-500 mb-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5" fill="#EAB308" />
            ))}
        </div>
        <p className="italic text-gray-600 mb-4">“{quote}”</p>
        <div>
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-500">{role}</p>
        </div>
    </div>
);

export default function Home() {
    const stats = [
        { value: "10,000+", label: "Meals Donated" },
        { value: "500+", label: "Active Donors" },
        { value: "50+", label: "Partner NGOs" },
        { value: "25+", label: "Cities Connected" },
    ];

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Restaurant Owner, Mumbai",
            quote: "We’ve donated 1,000 meals effortlessly through FoodLink!",
        },
        {
            name: "Akshay Singh",
            role: "NGO Coordinator, Delhi",
            quote:
                "The platform’s real-time tracking map has transformed our outreach.",
        },
        {
            name: "Rajesh Kumar",
            role: "Individual Donor",
            quote: "Donating leftover food from events takes just a few clicks.",
        },
    ];

    const features = [
        {
            icon: Heart,
            title: "Donate Food",
            desc: "Share surplus meals easily",
            color: "text-red-500",
        },
        {
            icon: Users,
            title: "Community Support",
            desc: "Help local NGOs",
            color: "text-blue-500",
        },
        {
            icon: Shield,
            title: "Verified Partners",
            desc: "Trusted, safe donations",
            color: "text-green-600",
        },
        {
            icon: Award,
            title: "Get Recognition",
            desc: "Earn impact badges",
            color: "text-yellow-500",
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                            Connect Surplus Food with{" "}
                            <span className="text-green-600">Hungry Hearts</span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-6">
                            Join India’s most impactful food-sharing community. Donate,
                            receive, and track real change — live.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                to="/register"
                                className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-green-700 transition"
                            >
                                Start Donating <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/need-food"
                                className="border-2 border-green-600 px-6 py-3 rounded-xl font-semibold text-green-700 hover:bg-green-50 transition"
                            >
                                I Need Food
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700"
                            alt="Volunteers serving food"
                            className="rounded-3xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow flex items-center gap-3">
                            <Heart className="text-green-600 w-6 h-6" fill="#16A34A" />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">5,000+</p>
                                <p className="text-sm text-gray-600">Meals Shared Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s, i) => (
                        <Counter key={i} value={s.value} label={s.label} />
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-8">Why Choose FoodLink?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
                            >
                                <f.icon className={`w-10 h-10 ${f.color} mx-auto mb-3`} />
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {f.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Integration */}
            <section id="map" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Live Donation Tracking Map
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Explore real-time food donations happening across India
                    </p>
                    <LiveDonationMap />
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Hear from Our Heroes
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={i} {...t} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 mt-4">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Heart className="w-7 h-7" fill="white" />
                            <span className="text-2xl font-bold">FoodLink</span>
                        </div>
                        <p className="text-gray-400">
                            Connecting surplus food with hungry hearts across India.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">How It Works</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Organizations</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>NGO Partners</li>
                            <li>Businesses</li>
                            <li>Get Verified</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-3">Contact</h4>
                        <p className="text-gray-400 flex gap-2">
                            <Mail size={16} /> hello@foodlink.in
                        </p>
                        <p className="text-gray-400 flex gap-2">
                            <Phone size={16} /> +91 98765 43210
                        </p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400 text-sm">
                    © 2025 FoodLink. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
