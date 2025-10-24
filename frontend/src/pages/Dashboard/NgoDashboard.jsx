import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, Box, Truck, Heart, PlusCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import AnalyticsCard from '../../components/AnalyticsCard';
import { setVolunteers, setStats, setPendingDonations, setReceivedFood } from '../../features/orgSlice';

function NgoDashboard() {
  const dispatch = useDispatch();
  const { volunteers, pendingDonations, receivedFood, stats } = useSelector(state => state.org);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(setStats({
      totalReceived: 145,
      totalDistributed: 132,
      activeVolunteers: 28,
    }));

    dispatch(setVolunteers([
      { id: 1, name: 'Amit Sharma', role: 'Volunteer', status: 'active' },
      { id: 2, name: 'Riya Mehta', role: 'Field Worker', status: 'active' },
      { id: 3, name: 'Karan Patel', role: 'Driver', status: 'inactive' },
    ]));

    dispatch(setPendingDonations([
      { id: 1, title: 'Catering Leftovers', donor: 'Food Fiesta', servings: 40, status: 'pending' },
      { id: 2, title: 'Bakery Goods', donor: 'Sweet Treats', servings: 25, status: 'pending' },
    ]));

    dispatch(setReceivedFood([
      { id: 3, title: 'Restaurant Meals', donor: 'Mumbai Grill', servings: 60, distributed: true },
      { id: 4, title: 'Event Food Packets', donor: 'Events Now', servings: 35, distributed: false },
    ]));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.organizationName || 'NGO Dashboard'}
            </h1>
            <p className="text-gray-600">Manage donations and volunteers efficiently</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard title="Received Donations" value={stats.totalReceived} icon={Box} color="primary" subtitle="+6 this week" />
          <AnalyticsCard title="Distributed Meals" value={stats.totalDistributed} icon={Truck} color="accent" subtitle="Helping the needy" />
          <AnalyticsCard title="Active Volunteers" value={stats.activeVolunteers} icon={Users} color="secondary" subtitle="Ground support" />
          <AnalyticsCard title="Impact Score" value="88/100" icon={Heart} color="primary" subtitle="Community trust" />
        </div>

        {/* Pending Donations */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pending Donations</h2>
            <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <PlusCircle className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>

          {pendingDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Donor</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Servings</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pendingDonations.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-3 text-gray-900 font-medium">{item.title}</td>
                      <td className="px-6 py-3 text-gray-700">{item.donor}</td>
                      <td className="px-6 py-3 text-gray-700">{item.servings}</td>
                      <td className="px-6 py-3 text-yellow-600 font-semibold">Pending</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No pending donations.</p>
          )}
        </div>

        {/* Volunteer List */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Volunteers</h2>
          <ul className="divide-y">
            {volunteers.map(vol => (
              <li key={vol.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">{vol.name}</p>
                  <p className="text-sm text-gray-600">{vol.role}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  vol.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {vol.status.charAt(0).toUpperCase() + vol.status.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Received Food */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Received Food</h2>
          <ul className="divide-y">
            {receivedFood.map(food => (
              <li key={food.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{food.title}</p>
                  <p className="text-sm text-gray-600">From {food.donor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  food.distributed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {food.distributed ? 'Distributed' : 'In Storage'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NgoDashboard;
