import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeOnboardingAction } from '../../features/authActions'
import { updateOnboardingStep } from '../../features/authSlice'

const Onboarding = () => {
  const dispatch = useDispatch()
  const { user, onboardingStep } = useSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    name: '',
    entityType: '', // individual, org, small_business
    address: '',
    location: {
      latitude: null,
      longitude: null
    },
    roles: [], // ["donor", "receiver"]
    // Business specific fields
    businessName: '',
    gstNumber: '',
    businessCertificate: null
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentLocation, setCurrentLocation] = useState(null)

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCurrentLocation({ lat: latitude, lng: longitude })
          setFormData(prev => ({
            ...prev,
            location: { latitude, longitude }
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handleEntityTypeChange = (entityType) => {
    setFormData(prev => ({
      ...prev,
      entityType
    }))
  }

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 0: // Basic info
        return formData.name.trim() !== ''
      case 1: // Entity type
        return formData.entityType !== ''
      case 2: // Roles
        return formData.roles.length > 0
      case 3: // Address
        return formData.address.trim() !== ''
      case 4: // Business details (only for small_business)
        if (formData.entityType === 'small_business') {
          return formData.businessName.trim() !== '' && 
                 formData.gstNumber.trim() !== '' && 
                 formData.businessCertificate !== null
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(onboardingStep)) {
      if (formData.entityType === 'small_business' && onboardingStep === 3) {
        dispatch(updateOnboardingStep(4)) // Go to business details
      } else if (onboardingStep === 3 && formData.entityType !== 'small_business') {
        handleSubmit() // Skip business details for non-business users
      } else if (onboardingStep === 4) {
        handleSubmit() // Submit after business details
      } else {
        dispatch(updateOnboardingStep(onboardingStep + 1))
      }
    }
  }

  const handleBack = () => {
    if (onboardingStep > 0) {
      dispatch(updateOnboardingStep(onboardingStep - 1))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      // Prepare data according to new API format
      const submitData = {
        name: formData.name,
        address: formData.address,
        location: {
          latitude: formData.location.latitude,
          longitude: formData.location.longitude
        },
        entityType: formData.entityType,
        roles: formData.roles,
        verified: true,
        isOnboardingComplete: true
      }

      // Add business specific data if applicable
      if (formData.entityType === 'small_business') {
        submitData.businessName = formData.businessName
        submitData.gstNumber = formData.gstNumber
        // Note: File upload might need separate handling
      }
      console.log(user)
      const result = await dispatch(completeOnboardingAction(user?.id, submitData))
      if (!result.success) {
        setError(result.error)
      }
      // Navigation will be handled by the router based on auth state
    } catch (error) {
      setError('Failed to complete onboarding')
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">What's your name?</h3>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">What type of entity are you?</h3>
            <div className="space-y-3">
              {[
                { value: 'individual', label: 'Individual', desc: 'Personal account' },
                { value: 'org', label: 'Organization/NGO', desc: 'Non-profit organization' },
                { value: 'small_business', label: 'Small Business', desc: 'Business entity' }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleEntityTypeChange(option.value)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.entityType === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="entityType"
                      value={option.value}
                      checked={formData.entityType === option.value}
                      onChange={() => {}}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">What would you like to do?</h3>
            <p className="text-sm text-gray-600">Select all that apply</p>
            <div className="space-y-3">
              {[
                { value: 'donor', label: 'Donate Food', desc: 'I want to donate food to help others' },
                { value: 'receiver', label: 'Receive Food', desc: 'I need food assistance' }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleRoleChange(option.value)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.roles.includes(option.value)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(option.value)}
                      onChange={() => {}}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">What's your address?</h3>
            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {currentLocation && (
              <div className="text-sm text-gray-600">
                <p>📍 Location detected: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
              </div>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Business Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                placeholder="Enter your GST number"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Certificate
              </label>
              <input
                type="file"
                name="businessCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload GST certificate or other business documents (PDF, JPG, PNG)
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getStepTitle = () => {
    const steps = ['Basic Info', 'Entity Type', 'Roles', 'Address']
    if (formData.entityType === 'small_business') {
      steps.push('Business Details')
    }
    return steps
  }

  const totalSteps = formData.entityType === 'small_business' ? 5 : 4

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Step {onboardingStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((onboardingStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-8">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={onboardingStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!validateStep(onboardingStep) || loading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 
             (onboardingStep === totalSteps - 1 ? 'Complete' : 'Next')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding