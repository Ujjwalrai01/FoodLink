import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';

function OrgProfile() {
  const { user } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Organization Profile</h1>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-lg font-semibold mb-2">Organization Name</p>
          <p className="mb-4">{user?.organizationName || 'N/A'}</p>

          <p className="text-lg font-semibold mb-2">Contact Person</p>
          <p className="mb-4">{user?.name || 'N/A'}</p>

          <p className="text-lg font-semibold mb-2">Email</p>
          <p className="mb-4">{user?.email || 'N/A'}</p>

          <p className="text-lg font-semibold mb-2">Role</p>
          <p className="mb-4">{user?.role || 'N/A'}</p>

          {/* Additional org details can be displayed here */}
        </div>
      </div>
    </div>
  );
}

export default OrgProfile;
