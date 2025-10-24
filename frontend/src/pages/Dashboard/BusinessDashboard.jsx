import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Package, TrendingUp, Award, BarChart3, Plus, Eye } from 'lucide-react'
import Navbar from '../../components/Navbar'
import AnalyticsCard from '../../components/AnalyticsCard'
import RoleBadge from '../../components/RoleBadge'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

function BusinessDashboard() {
  const { user } = useSelector((state) => state.auth)

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Food Saved (kg)',
        data: [65, 78, 90, 81, 96, 112],
        backgroundColor: '#16A34A',
        borderRadius: 8,
      },
    ],
  }

  const impactData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'People Fed',
        data: [45, 52, 67, 78],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
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

  const recentPosts = [
    { id: '1', title: 'Restaurant Surplus - Evening', servings: 50, status: 'claimed', claims: 3, views: 45 },
    { id: '2', title: 'Bakery Items - Morning', servings: 30, status: 'available', claims: 1, views: 23 },
    { id: '3', title: 'Catering Leftovers', servings: 80, status: 'completed', claims: 2, views: 67 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.organizationName || 'Business Dashboard'}
              </h1>
              <p className="text-gray-600">Track your CSR impact and food waste reduction</p>
            </div>
            <RoleBadge role="business" verified={true} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Donations"
            value="124"
            icon={Package}
            color="primary"
            subtitle="+8 this month"
          />
          <AnalyticsCard
            title="Food Saved"
            value="856 kg"
            icon={TrendingUp}
            color="accent"
            subtitle="Waste prevented"
          />
          <AnalyticsCard
            title="People Fed"
            value="342"
            icon={Award}
            color="secondary"
            subtitle="Community impact"
          />
          <AnalyticsCard
            title="CSR Score"
            value="92/100"
            icon={BarChart3}
            color="primary"
            subtitle="Excellent rating"
          />
        </div>

        {/* Quick Action */}
        <Link
          to="/food/add"
          className="block mb-8 bg-gradient-to-r from-primary to-green-600 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-2xl">
                <Plus className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">List Surplus Food</h3>
                <p className="text-green-100">Help the community and reduce waste</p>
              </div>
            </div>
            <span className="text-white text-2xl">→</span>
          </div>
        </Link>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Food Saved</h3>
            <div style={{ height: '250px' }}>
              <Bar data={monthlyData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Impact</h3>
            <div style={{ height: '250px' }}>
              <Line data={impactData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Posts</h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Servings</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Claims</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Views</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.servings}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.status === 'available' ? 'bg-green-100 text-green-800' :
                          post.status === 'claimed' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.claims}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span>{post.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/food/${post.id}`} className="text-primary hover:text-green-700 font-semibold text-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboard
