function RoleBadge({ role, verified = false }) {
  const getRoleColor = () => {
    switch (role) {
      case 'individual':
        return 'bg-blue-100 text-blue-800'
      case 'ngo':
        return 'bg-green-100 text-green-800'
      case 'business':
        return 'bg-purple-100 text-purple-800'
      case 'verifier':
        return 'bg-yellow-100 text-yellow-800'
      case 'admin':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor()}`}>
        {role?.toUpperCase()}
      </span>
      {verified && (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
          ✓ VERIFIED
        </span>
      )}
    </div>
  )
}

export default RoleBadge