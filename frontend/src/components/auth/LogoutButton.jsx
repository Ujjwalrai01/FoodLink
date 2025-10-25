import { useDispatch } from 'react-redux'
import { logout } from '../../features/authActions'

const LogoutButton = ({ className = '', children = 'Logout' }) => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
  }

  return (
    <button
      onClick={handleLogout}
      className={`text-red-600 hover:text-red-800 ${className}`}
    >
      {children}
    </button>
  )
}

export default LogoutButton