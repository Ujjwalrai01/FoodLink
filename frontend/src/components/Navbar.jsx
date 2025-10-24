// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../features/authSlice'
// import { Menu, X, Heart, LogOut, User } from 'lucide-react'
// import { useState } from 'react'

// function Navbar() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const handleLogout = () => {
//     dispatch(logout())
//     navigate('/login')
//   }

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <Link to="/" className="flex items-center space-x-2">
//             <Heart className="text-primary w-8 h-8" fill="#16A34A" />
//             <span className="text-2xl font-bold text-primary">FoodLink</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-6">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
//                   Dashboard
//                 </Link>
//                 <Link to="/food/feed" className="text-gray-700 hover:text-primary transition-colors">
//                   Food Feed
//                 </Link>
//                 <Link to="/food/add" className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition-all">
//                   Add Food
//                 </Link>
//                 <Link to="/profile" className="text-gray-700 hover:text-primary transition-colors">
//                   <User className="w-5 h-5" />
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-700 hover:text-red-600 transition-colors"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
//                   Login
//                 </Link>
//                 <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-2xl hover:bg-green-700 transition-all">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden pb-4 space-y-3">
//             {isAuthenticated ? (
//               <>
//                 <Link to="/dashboard" className="block text-gray-700 hover:text-primary transition-colors">
//                   Dashboard
//                 </Link>
//                 <Link to="/food/feed" className="block text-gray-700 hover:text-primary transition-colors">
//                   Food Feed
//                 </Link>
//                 <Link to="/food/add" className="block text-gray-700 hover:text-primary transition-colors">
//                   Add Food
//                 </Link>
//                 <Link to="/profile" className="block text-gray-700 hover:text-primary transition-colors">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block text-red-600 hover:text-red-800 transition-colors w-full text-left"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="block text-gray-700 hover:text-primary transition-colors">
//                   Login
//                 </Link>
//                 <Link to="/register" className="block text-gray-700 hover:text-primary transition-colors">
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default 




import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import RoleBadge from './RoleBadge';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user, role } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              FoodLink
            </Link>
            <div className="hidden md:block ml-10 space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary') +
                  ' px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/foodfeed"
                className={({ isActive }) =>
                  (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary') +
                  ' px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                Food Feed
              </NavLink>
              {isAuthenticated && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary') +
                    ' px-3 py-2 rounded-md text-sm font-medium'
                  }
                >
                  Dashboard
                </NavLink>
              )}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary') +
                  ' px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  (isActive ? 'text-primary' : 'text-gray-600 hover:text-primary') +
                  ' px-3 py-2 rounded-md text-sm font-medium'
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <RoleBadge role={role} />
                <button
                  onClick={handleLogout}
                  className="text-white bg-primary px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-primary px-4 py-2 rounded-md border border-primary hover:bg-primary hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 text-white bg-primary px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none focus:text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/foodfeed"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Food Feed
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Contact
          </NavLink>
          <div className="border-t border-gray-200 mt-2 pt-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
