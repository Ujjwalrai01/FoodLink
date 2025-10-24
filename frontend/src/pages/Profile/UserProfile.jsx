import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';


function UserProfile() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-lg font-semibold mb-2">Name</p>
          <p className="mb-4">{user?.name || 'N/A'}</p>

          <p className="text-lg font-semibold mb-2">Email</p>
          <p className="mb-4">{user?.email || 'N/A'}</p>

          <p className="text-lg font-semibold mb-2">Role</p>
          <p className="mb-4">{user?.role || 'N/A'}</p>
          
          {/* Additional fields can be added here */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
