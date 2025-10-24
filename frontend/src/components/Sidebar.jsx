import { NavLink } from 'react-router-dom';
import { Home, Utensils, BarChart2, Users, Settings, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    { to: '/dashboard/food', label: 'My Donations', icon: <Utensils size={18} /> },
    { to: '/dashboard/analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
    { to: '/dashboard/network', label: 'Network', icon: <Users size={18} /> },
    { to: '/dashboard/settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 h-screen fixed hidden md:flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center py-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-primary">FoodLink</h1>
        </div>
        <nav className="mt-6 flex flex-col space-y-2">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span className="mr-3">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center px-6 py-3 text-sm font-medium text-red-600 hover:bg-gray-100 transition"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
