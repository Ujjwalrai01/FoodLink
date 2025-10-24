// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Users, Globe, Briefcase, ShieldCheck, BarChartBig } from 'lucide-react';
// import Navbar from '../../components/Navbar';
// import AnalyticsCard from '../../components/AnalyticsCard';
// import { setOverview } from '../../features/analyticsSlice';

// function AdminDashboard() {
//   const dispatch = useDispatch();
//   const { overview } = useSelector(state => state.analytics);

//   useEffect(() => {
//     dispatch(setOverview({
//       totalUsers: 1200,
//       totalNGOs: 67,
//       totalBusinesses: 42,
//       totalDonations: 582,
//       totalClaims: 235,
//     }));
//   }, [dispatch]);

//   const systemLogs = [
//     { id: 1, message: 'Verifier approved NGO registration - Food Help Org', time: '2 minutes ago' },
//     { id: 2, message: 'New business account created - FreshMeals Pvt Ltd', time: '20 minutes ago' },
//     { id: 3, message: 'Donation completed by Bhavna’s Kitchen', time: '1 hour ago' },
//     { id: 4, message: 'NGO claimed meal package - Care Foundation', time: '3 hours ago' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
//         <p className="text-gray-600 mb-8">Monitor overall FoodLink performance and user analytics</p>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
//           <AnalyticsCard title="Total Users" value={overview.totalUsers} icon={Users} color="primary" subtitle="All user accounts" />
//           <AnalyticsCard title="NGOs" value={overview.totalNGOs} icon={Globe} color="secondary" subtitle="Verified NGOs" />
//           <AnalyticsCard title="Businesses" value={overview.totalBusinesses} icon={Briefcase} color="accent" subtitle="CSR partners" />
//           <AnalyticsCard title="Total Donations" value={overview.totalDonations} icon={ShieldCheck} color="primary" subtitle="Completed listings" />
//           <AnalyticsCard title="Claims" value={overview.totalClaims} icon={BarChartBig} color="accent" subtitle="Food claimed" />
//         </div>

//         {/* System Logs */}
//         <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Recent System Activity</h2>
//           <ul className="divide-y">
//             {systemLogs.map(log => (
//               <li key={log.id} className="py-3 flex items-center justify-between">
//                 <p className="text-gray-800">{log.message}</p>
//                 <span className="text-sm text-gray-500">{log.time}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Summary Charts Placeholder */}
//         <div className="bg-white rounded-2xl shadow-md p-6 text-center">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">System Trends</h2>
//           <p className="text-gray-600">Charts and analytics visualization coming soon.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;





import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Users, Building, Package, TrendingUp, AlertCircle, MapPin } from 'lucide-react'
import Navbar from '../../components/Navbar'
import AnalyticsCard from '../../components/AnalyticsCard'
import MapView from '../../components/MapView'
import { setOverview, setActivityData } from '../../features/analyticsSlice'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth)
  const { overview, activityData } = useSelector((state) => state.analytics)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setOverview({
      totalUsers: 1248,
      totalNGOs: 45,
      totalBusinesses: 89,
      totalClaims: 3456,
      totalDonations: 4567,
    }))

    dispatch(setActivityData([
      { date: '2024-01-01', users: 120, donations: 45, claims: 38 },
      { date: '2024-01-02', users: 135, donations: 52, claims: 43 },
    ]))
  }, [dispatch])

  const activityChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Donations',
        data: [45, 52, 48, 65, 72, 58, 62],
        borderColor: '#16A34A',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Claims',
        data: [38, 45, 42, 58, 65, 52, 55],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const userDistributionData = {
    labels: ['Individuals', 'NGOs', 'Businesses', 'Verifiers'],
    datasets: [
      {
        data: [1114, 45, 89, 12],
        backgroundColor: ['#16A34A', '#2563EB', '#9333EA', '#FACC15'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const recentActivities = [
    { id: '1', type: 'user_joined', name: 'Rahul Kumar', action: 'joined as Individual', time: '5 mins ago', icon: Users },
    { id: '2', type: 'donation', name: 'Fresh Bites Restaurant', action: 'posted new food donation', time: '12 mins ago', icon: Package },
    { id: '3', type: 'verification', name: 'Help India NGO', action: 'got verified', time: '1 hour ago', icon: Building },
    { id: '4', type: 'claim', name: 'Community Kitchen', action: 'claimed food donation', time: '2 hours ago', icon: TrendingUp },
  ]

  const reportedIssues = [
    { id: '1', user: 'John Doe', issue: 'Inappropriate content in listing', status: 'pending', priority: 'high' },
    { id: '2', user: 'ABC Restaurant', issue: 'Unable to update profile', status: 'resolved', priority: 'medium' },
    { id: '3', user: 'Help Foundation', issue: 'Verification documents not uploading', status: 'pending', priority: 'high' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Monitor platform health and user activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <AnalyticsCard
            title="Total Users"
            value={overview.totalUsers.toLocaleString()}
            icon={Users}
            color="primary"
            subtitle="+45 this week"
          />
          <AnalyticsCard
            title="NGOs"
            value={overview.totalNGOs}
            icon={Building}
            color="secondary"
            subtitle="Verified partners"
          />
          <AnalyticsCard
            title="Businesses"
            value={overview.totalBusinesses}
            icon={Building}
            color="accent"
            subtitle="Active businesses"
          />
          <AnalyticsCard
            title="Donations"
            value={overview.totalDonations.toLocaleString()}
            icon={Package}
            color="primary"
            subtitle="Total listings"
          />
          <AnalyticsCard
            title="Claims"
            value={overview.totalClaims.toLocaleString()}
            icon={TrendingUp}
            color="secondary"
            subtitle="Successfully claimed"
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Activity</h3>
            <div style={{ height: '300px' }}>
              <Line data={activityChartData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h3>
            <div style={{ height: '300px' }}>
              <Doughnut data={userDistributionData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activities & Issues */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b last:border-0">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-lg">
                    <activity.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-bold">{activity.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reported Issues */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reported Issues</h3>
            <div className="space-y-4">
              {reportedIssues.map((issue) => (
                <div key={issue.id} className="pb-4 border-b last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{issue.user}</p>
                      <p className="text-sm text-gray-600 mt-1">{issue.issue}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {issue.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      issue.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.status.toUpperCase()}
                    </span>
                    <button className="text-xs text-primary hover:text-green-700 font-semibold">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Heatmap */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity Heatmap</h2>
          <MapView foodItems={[]} height="400px" />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard