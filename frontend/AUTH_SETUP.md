# Authentication System Setup

This document explains the complete OTP-based authentication system with onboarding flow.

## Features

- ✅ OTP-based authentication (Email/Phone)
- ✅ JWT token management (Access + Refresh tokens)
- ✅ Secure cookie storage
- ✅ Automatic token refresh
- ✅ Complete onboarding flow
- ✅ Role-based access control
- ✅ Location-based address capture
- ✅ Business document upload
- ✅ Redux state management

## API Endpoints

```
Base URL: https://ec19accad1fb.ngrok-free.app

POST /user/all/requestotp
POST /user/all/verifyotp
POST /user/refresh-token
POST /user/complete-onboarding
PUT /user/profile
POST /user/upload-document
GET /user/profile
POST /user/logout
```

## Auth Flow

### 1. Login Process
1. User enters email/phone → `OtpLogin` component
2. System sends OTP → API call to `/user/all/requestotp`
3. User enters OTP → API call to `/user/all/verifyotp`
4. System returns access + refresh tokens
5. Tokens stored in secure cookies
6. User state updated in Redux

### 2. Onboarding Process
If `user.isOnboardingComplete = false`:
1. Redirect to `/onboarding`
2. Collect basic info (name)
3. Select entity type (individual/org/small_business)
4. Capture address + location (lat/lng)
5. For businesses: collect business details + documents
6. Submit to `/user/complete-onboarding`
7. Update user state and redirect to dashboard

### 3. Token Management
- Access token stored in `accessToken` cookie
- Refresh token stored in `refreshToken` cookie
- Automatic refresh on 401 responses
- Logout clears all cookies and Redux state

## Components

### Core Auth Components
- `OtpLogin` - Handles OTP request and verification
- `Onboarding` - Multi-step onboarding form
- `ProtectedRoute` - Route protection with onboarding check
- `LogoutButton` - Logout functionality

### Usage Components
- `AuthExample` - Example of using auth state
- `useAuth` hook - Custom hook for auth state

## Redux State Structure

```javascript
{
  user: {
    id: string,
    name: string,
    email?: string,
    phone?: string,
    role: 'individual' | 'org' | 'small_business' | 'verifier' | 'admin',
    entityType: string,
    address: string,
    location: { lat: number, lng: number },
    businessName?: string,
    gstNumber?: string,
    isOnboardingComplete: boolean
  },
  accessToken: string,
  refreshToken: string,
  isAuthenticated: boolean,
  isOnboardingComplete: boolean,
  loading: boolean,
  error: string,
  // OTP states
  otpSent: boolean,
  otpVerified: boolean,
  contactInfo: string,
  // Onboarding states
  onboardingStep: number
}
```

## Usage Examples

### Using the auth hook
```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, isAuthenticated, isOnboardingComplete, role } = useAuth()
  
  if (!isAuthenticated) return <div>Please login</div>
  if (!isOnboardingComplete) return <div>Complete onboarding</div>
  
  return <div>Welcome {user.name}!</div>
}
```

### Role-based rendering
```jsx
const { isIndividual, isBusiness, isOrg } = useAuth()

return (
  <div>
    {isIndividual && <IndividualContent />}
    {isBusiness && <BusinessContent />}
    {isOrg && <OrgContent />}
  </div>
)
```

### Making authenticated API calls
```jsx
import api from '../services/authService'

// API calls automatically include auth headers
const response = await api.get('/user/profile')
```

## Entity Types

1. **Individual** - Personal users
2. **Organization/NGO** - Non-profit organizations  
3. **Small Business** - Business entities (requires additional documents)

## Business Document Requirements

For `small_business` entity type:
- Business name
- GST number
- Business certificate (PDF/JPG/PNG)

## Location Capture

- Automatic geolocation detection
- Stores latitude and longitude
- Manual address input
- Used for location-based features

## Security Features

- Secure HTTP-only cookies (when properly configured)
- Automatic token refresh
- CSRF protection with SameSite cookies
- Ngrok header bypass for development

## Development Notes

- Uses ngrok for API testing
- Mock OTP: Use any 6-digit code for development
- Cookies work in development mode
- Redux DevTools integration available

## File Structure

```
src/
├── components/auth/
│   ├── OtpLogin.jsx
│   ├── Onboarding.jsx
│   ├── LogoutButton.jsx
│   └── AuthExample.jsx
├── features/
│   ├── authSlice.js
│   └── authActions.js
├── services/
│   └── authService.js
├── hooks/
│   └── useAuth.js
└── router/
    └── AppRouter.jsx (updated)
```

## Testing the System

1. Start the development server
2. Navigate to `/login`
3. Enter email or phone number
4. Click "Send OTP"
5. Enter any 6-digit OTP
6. Complete onboarding flow
7. Access protected routes

The system is now fully functional with OTP authentication, token management, and onboarding flow!