// import { useSelector } from 'react-redux';
// import UserProfile from './UserProfile';
// import OrgProfile from './OrgProfile';

// function Profile() {
//   const { role } = useSelector(state => state.auth);

//   if (role === 'individual') return <UserProfile />;
//   if (role === 'ngo' || role === 'business') return <OrgProfile />;
  
//   return <p className="text-center mt-10 text-gray-500">No profile available for this role.</p>;
// }

// export default Profile;



import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User, Mail, Phone, MapPin, Building, Award, Edit2, Save } from 'lucide-react'
import Navbar from '../../components/Navbar'
import RoleBadge from '../../components/RoleBadge'
import { updateProfile } from '../../features/authSlice'
import { showToast } from '../../components/NotificationToast'

function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    organizationName: user?.organizationName || '',
    bio: user?.bio || '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateProfile(formData))
      showToast('Profile updated successfully!', 'success')
      setIsEditing(false)
    } catch (error) {
      showToast('Failed to update profile', 'error')
    }
  }

  const stats = [
    { label: 'Donations', value: 45, color: 'bg-primary' },
    { label: 'Claims', value: 12, color: 'bg-secondary' },
    { label: 'Impact Score', value: 87, color: 'bg-accent' },
  ]

  const badges = [
    { name: 'Early Adopter', icon: '🌟', earned: true },
    { name: 'Community Hero', icon: '🦸', earned: true },
    { name: 'Food Warrior', icon: '⚔️', earned: true },
    { name: 'Climate Champion', icon: '🌍', earned: false },
    { name: 'Monthly Donor', icon: '💝', earned: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary to-green-600"></div>
          
          <div className="px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="flex items-end space-x-4">
                <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center">
                  <User className="w-16 h-16 text-primary" />
                </div>
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <div className="mb-2">
                <RoleBadge role={user?.role} verified={true} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Edit Toggle */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 text-primary hover:text-green-700 font-semibold transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {(user?.role === 'ngo' || user?.role === 'business') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pb-4 border-b">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{user?.location || 'Not provided'}</p>
                  </div>
                </div>

                {(user?.role === 'ngo' || user?.role === 'business') && (
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <Building className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Organization</p>
                      <p className="font-medium text-gray-900">{user?.organizationName || 'Not provided'}</p>
                    </div>
                  </div>
                )}

                {user?.bio && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Bio</p>
                    <p className="text-gray-900">{user.bio}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Award className="w-6 h-6 text-primary" />
              <span>Badges</span>
            </h2>
            
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    badge.earned
                      ? 'bg-green-50 border-primary'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{badge.name}</p>
                      <p className="text-xs text-gray-600">
                        {badge.earned ? 'Earned' : 'Locked'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile