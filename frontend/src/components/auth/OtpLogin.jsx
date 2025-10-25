import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestOtp, verifyOtp } from '../../features/authActions'
import { clearError, resetOtpState } from '../../features/authSlice'
import { Heart, Mail, Phone, Lock, Check } from 'lucide-react'

const OtpLogin = () => {
  const dispatch = useDispatch()
  const { loading, error, otpSent, contactInfo } = useSelector(state => state.auth)
  
  const [activeTab, setActiveTab] = useState('email') // 'email' or 'phone'
  const [step, setStep] = useState(1) // 1: credentials, 2: OTP
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: ''
  })
  const [timer, setTimer] = useState(0)

  // Timer for resend OTP
  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    } else if (timer === 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timer])

  // Update step based on otpSent state
  useEffect(() => {
    if (otpSent) {
      setStep(2)
    } else {
      setStep(1)
    }
  }, [otpSent])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Reset state when switching tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab)
    dispatch(resetOtpState())
    setFormData({ email: '', phone: '', otp: '' })
    setTimer(0)
    setStep(1)
  }

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault()
    
    const data = {
      email: activeTab === 'email' ? formData.email : false,
      phone: activeTab === 'phone' ? formData.phone : false,
      type: activeTab
    }

    const result = await dispatch(requestOtp(data))
    if (result.success) {
      setTimer(60) // 60 seconds timer
    }
  }

  // Step 2: Verify OTP and Login
  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    
    if (!formData.otp.trim()) {
      return
    }
    
    const data = {
      email: contactInfo?.email ? contactInfo?.email : false,
      phone: contactInfo?.phone ? contactInfo?.phone : false,
      type: contactInfo?.type,
      otp: formData.otp
    }
    
    await dispatch(verifyOtp(data))
    // Navigation will be handled by the router based on auth state
  }

  const handleResendOtp = async () => {
    if (timer > 0) return
    
    const result = await dispatch(requestOtp(contactInfo))
    if (result.success) {
      setTimer(60)
    }
  }

  const handleBack = () => {
    dispatch(resetOtpState())
    setStep(1)
    setFormData(prev => ({ ...prev, otp: '' }))
    setTimer(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-green-600" fill="#16A34A" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue helping the community</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tab Selector - Only show in step 1 */}
          {step === 1 && (
            <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => handleTabSwitch('email')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'email'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Email
              </button>
              <button
                onClick={() => handleTabSwitch('phone')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'phone'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                Phone
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              <span className="block sm:inline">{error}</span>
              <button
                onClick={() => dispatch(clearError())}
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
              >
                <span className="sr-only">Dismiss</span>
                ×
              </button>
            </div>
          )}

          {/* Step 1: Enter Credentials */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              {activeTab === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (activeTab === 'email' ? !formData.email.trim() : !formData.phone.trim())}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="w-5 h-5" />
                  <p className="text-sm font-medium">
                    OTP sent to {contactInfo?.email || contactInfo?.phone || 'your contact'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="otp"
                    required
                    maxLength="6"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-center text-2xl tracking-widest font-mono"
                    placeholder="••••••"
                    autoComplete="one-time-code"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Enter the 6-digit OTP sent to your {activeTab}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.otp.trim()}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-sm text-green-600 hover:text-green-500 font-medium"
                >
                  ← Back to credentials
                </button>
                
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                  className="text-sm text-green-600 hover:text-green-500 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OtpLogin