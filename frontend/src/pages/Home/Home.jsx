import { Link } from 'react-router-dom'
import { Heart, Users, TrendingUp, Shield, MapPin, Award } from 'lucide-react'
import Navbar from '../../components/Navbar'

function Home() {
  const features = [
    {
      icon: Heart,
      title: 'Donate Food',
      description: 'Share your surplus food with those who need it most',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Help Communities',
      description: 'Connect with NGOs and volunteers in your area',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Verified Network',
      description: 'All organizations are verified for your safety',
      color: 'text-green-600'
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Track your impact and earn recognition',
      color: 'text-yellow-600'
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Meals Donated' },
    { value: '500+', label: 'Active Users' },
    { value: '50+', label: 'NGO Partners' },
    { value: '25+', label: 'Cities Covered' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connecting Surplus Food with{' '}
                <span className="text-primary">Hungry Hearts</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join India's largest food-sharing platform. Donate surplus food, 
                help the community, and make a real difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Donors
                </Link>
                <Link
                  to="/food/feed"
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-primary hover:bg-green-50 transition-all"
                >
                  Receivers
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600"
                alt="Food Donation"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <Heart className="w-8 h-8 text-primary" fill="#16A34A" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5,000+</p>
                    <p className="text-sm text-gray-600">People Fed Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FoodLink?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to make food donation simple, safe, and impactful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors and volunteers making an impact every day
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            Start Donating Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-8 h-8" fill="white" />
                <span className="text-2xl font-bold">FoodLink</span>
              </div>
              <p className="text-gray-400">
                Connecting surplus food with hungry hearts across India
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Organizations</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/ngo" className="hover:text-white">NGO Partners</Link></li>
                <li><Link to="/business" className="hover:text-white">Businesses</Link></li>
                <li><Link to="/verify" className="hover:text-white">Get Verified</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home