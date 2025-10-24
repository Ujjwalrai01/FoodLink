import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

// Simple toast notification system
let toastCallback = null

export const showToast = (message, type = 'info') => {
  if (toastCallback) {
    toastCallback(message, type)
  }
}

function NotificationToast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    toastCallback = (message, type) => {
      setToast({ message, type })
      setTimeout(() => setToast(null), 4000)
    }
  }, [])

  if (!toast) return null

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  }

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  }

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div className={`${colors[toast.type]} border rounded-2xl shadow-lg p-4 flex items-start space-x-3 max-w-sm`}>
        {icons[toast.type]}
        <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
        <button onClick={() => setToast(null)}>
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default NotificationToast