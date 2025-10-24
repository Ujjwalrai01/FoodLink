// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { loginStart, loginSuccess, loginFailure } from '../../features/authSlice'
// import { Heart, Mail, Lock } from 'lucide-react'
// import { showToast } from '../../components/NotificationToast'

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     dispatch(loginStart())

//     try {
//       // Mock login - Replace with actual API call
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       const mockUser = {
//         id: '1',
//         name: 'John Doe',
//         email: formData.email,
//         role: 'individual', // individual, ngo, business, verifier, admin
//       }
      
//       const mockToken = 'mock-jwt-token-' + Date.now()
      
//       dispatch(loginSuccess({ user: mockUser, token: mockToken }))
//       showToast('Login successful! Welcome back.', 'success')
//       navigate('/dashboard')
//     } catch (error) {
//       dispatch(loginFailure(error.message))
//       showToast('Login failed. Please try again.', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Heart className="w-16 h-16 text-primary" fill="#16A34A" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//           <p className="text-gray-600">Sign in to continue helping feed the community</p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             {/* <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div> */}

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center">
//                 <input type="checkbox" className="rounded text-primary focus:ring-primary" />
//                 <span className="ml-2 text-gray-600">Remember me</span>
//               </label>
//               <a href="#" className="text-primary hover:text-green-700 font-medium">
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-primary hover:text-green-700 font-semibold">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../features/authSlice';
import { Heart, Mail, Phone, Lock, Check } from 'lucide-react';
import { showToast } from '../../components/NotificationToast';

function Login() {
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'phone'
  const [step, setStep] = useState(1); // 1: credentials, 2: OTP
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const recipient = activeTab === 'email' ? formData.email : formData.phone;
      showToast(`OTP sent to ${recipient}`, 'success');
      setOtpSent(true);
      setStep(2);
    } catch (error) {
      showToast('Failed to send OTP. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Login
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginStart());

    try {
      // Mock OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate correct OTP is '123456'
      if (formData.otp !== '123456') {
        throw new Error('Invalid OTP');
      }

      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: formData.email || 'user@example.com',
        phone: formData.phone || '+91 98765 43210',
        role: 'individual',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      showToast('Login successful! Welcome back.', 'success');
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginFailure(error.message));
      showToast(error.message || 'Invalid OTP. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reset state when switching tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setStep(1);
    setOtpSent(false);
    setFormData({ email: '', phone: '', otp: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-primary" fill="#16A34A" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to continue helping the community</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tab Selector */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => handleTabSwitch('email')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'email'
                  ? 'bg-white text-primary shadow-md'
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
                  ? 'bg-white text-primary shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Phone className="w-5 h-5 inline mr-2" />
              Phone
            </button>
          </div>

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
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    OTP sent to {activeTab === 'email' ? formData.email : formData.phone}
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
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all text-center text-2xl tracking-widest font-mono"
                    placeholder="••••••"
                    autoComplete="one-time-code"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Hint: Use <strong>123456</strong> for demo
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                ← Back to credentials
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-green-700 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
