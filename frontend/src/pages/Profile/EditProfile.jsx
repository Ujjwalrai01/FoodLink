import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar';
import { updateProfile } from '../../features/authSlice';
import { showToast } from '../../components/NotificationToast';

function EditProfile() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organizationName: user?.organizationName || '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, send API update request here

    dispatch(updateProfile(formData));
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md space-y-6">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {user?.role === 'ngo' || user?.role === 'business' ? (
            <div>
              <label htmlFor="organizationName" className="block font-semibold mb-1">Organization Name</label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ) : null}

          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
