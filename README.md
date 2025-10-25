# 🍽️ FoodLink - Connecting Surplus Food with Hungry Hearts

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A production-grade, role-based web platform that connects food donors with those in need, reducing food waste while fighting hunger through technology.

---

## 🎯 Project Overview

**FoodLink** is a comprehensive food donation platform designed to bridge the gap between surplus food and hungry hearts. Built with modern web technologies, it provides a scalable, secure, and user-friendly interface for multiple stakeholders in the food donation ecosystem.
---
![WhatsApp Image 2025-10-25 at 11 08 57_80dd6914](https://github.com/user-attachments/assets/b8c0c33c-eb6b-40df-9801-0edc340ebe03)
![WhatsApp Image 2025-10-25 at 11 08 33_51f484fe](https://github.com/user-attachments/assets/1393ae6c-e326-4f0e-a44a-65eab20b1fe8)
---

## 🌟 Key Features

- ✅ **Role-Based Dashboards** - Tailored interfaces for 5 user types
- 🗺️ **Real-time Food Mapping** - Interactive maps powered by Leaflet.js
- 📊 **Impact Analytics** - Track donations, CO₂ saved, and meals provided
- ✔️ **Verification System** - Authenticate NGOs and businesses
- 🎮 **Gamification** - Badges, levels, and leaderboards
- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🔐 **Secure Authentication** - Protected routes with role-based access control

---

## 👥 User Roles

| Role | Description | Key Features |
|------|-------------|--------------|
| **Individual** | Food donors and recipients | Add/claim food, track personal impact, earn badges |
| **NGO** | Non-profit organizations | Manage volunteers, receive donations, distribute food |
| **Small Business** | Restaurants, cafes, stores | List surplus food, track CSR impact, get verified |
| **Verifier** | Platform validators | Approve NGOs/businesses, maintain authenticity |
| **Admin** | Platform administrators | Monitor analytics, manage users, generate reports |

---

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - UI library
- **Vite 5.x** - Build tool and dev server
- **TailwindCSS 3.x** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router DOM v6** - Client-side routing

### Mapping & Visualization
- **Leaflet.js** - Interactive maps
- **React-Leaflet** - React bindings for Leaflet
- **OpenStreetMap** - Map tiles provider

### Additional Libraries
- **Recharts / Chart.js** - Data visualization
- **React Hook Form** - Form handling
- **Axios** - HTTP client

---

## 📁 Project Structure(Frontend)
```
src/
├── assets/                    # Static assets (images, icons, fonts)
├── components/                # Reusable UI components
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Sidebar.jsx           # Role-based sidebar navigation
│   ├── ProtectedRoute.jsx    # Route protection wrapper
│   ├── RoleBadge.jsx         # User role indicator badge
│   ├── FoodCard.jsx          # Food listing card component
│   ├── MapView.jsx           # Leaflet map component
│   ├── AnalyticsCard.jsx     # Dashboard analytics widget
│   └── NotificationToast.jsx # Toast notification system
│
├── layouts/                   # Layout wrappers for different roles
│   ├── IndividualLayout.jsx  # Layout for individual users
│   ├── NgoLayout.jsx         # Layout for NGO users
│   ├── BusinessLayout.jsx    # Layout for business users
│   ├── VerifierLayout.jsx    # Layout for verifier users
│   └── AdminLayout.jsx       # Layout for admin users
│
├── pages/                     # Page components
│   ├── Home/                 # Landing page
│   ├── Auth/                 # Login, Register, Password Reset
│   ├── Dashboard/            # Role-specific dashboards
│   │   ├── IndividualDashboard.jsx
│   │   ├── NgoDashboard.jsx
│   │   ├── BusinessDashboard.jsx
│   │   ├── VerifierDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── Food/                 # Food-related pages
│   │   ├── AddFood.jsx       # Add new food listing
│   │   ├── FoodFeed.jsx      # Browse available food
│   │   └── FoodDetail.jsx    # Individual food item details
│   ├── Profile/              # User profile management
│   └── Verification/         # Verification workflows
│
├── features/                  # Redux slices (state management)
│   ├── authSlice.js          # Authentication state
│   ├── foodSlice.js          # Food listings state
│   ├── mapSlice.js           # Map and location state
│   ├── orgSlice.js           # Organization data state
│   ├── verifySlice.js        # Verification queue state
│   └── analyticsSlice.js     # Analytics and metrics state
│
├── router/                    # Routing configuration
│   └── AppRouter.jsx         # Main router with protected routes
│
├── services/                  # API services and utilities
│   ├── api.js                # Axios instance and interceptors
│   └── foodService.js        # Food-related API calls
│
├── store/                     # Redux store configuration
│   └── store.js              # Combined reducers and middleware
│
├── App.jsx                    # Root application component
└── main.jsx                   # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.x
- npm >= 8.x or yarn >= 1.22.x

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/foodlink.git
cd foodlink
```

2. **Install dependencies**
```bash
npm install
```

3. **Initialize TailwindCSS** (if not already configured)
```bash
npx tailwindcss init -p
```

4. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:5173
```

---

## 🎨 Design System

### Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Green | `#16A34A` | Primary actions, CTAs |
| Secondary Blue | `#2563EB` | Links, secondary actions |
| Accent Yellow | `#FACC15` | Highlights, badges |
| Background | `#F9FAFB` | Page background |
| Text | `#111827` | Primary text color |

### Design Tokens

- **Border Radius:** `rounded-2xl` (16px)
- **Shadows:** `shadow-md`, `hover:shadow-xl`
- **Spacing:** `p-4`, `sm:p-6`, `lg:p-8`
- **Transitions:** `transition-all duration-300`

### Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. User registers/logs in via `/auth/login` or `/auth/register`
2. Backend returns JWT token + user object (including role)
3. Redux stores user data in `authSlice`
4. Token stored in memory (or secure cookie)

### Route Protection
```jsx
<ProtectedRoute allowedRoles={['individual', 'ngo']}>
  <YourComponent />
</ProtectedRoute>
```

- Checks if user is authenticated
- Validates user role against `allowedRoles`
- Redirects to login if unauthenticated
- Redirects to unauthorized page if wrong role

---

## 📊 Dashboard Features by Role

### 👤 Individual Dashboard

- **My Donations/Claims** - History with status tracking
- **Impact Summary** - Meals donated, people fed, CO₂ saved
- **Badges & Levels** - Gamification progress
- **Quick Actions** - Add food, find nearby food
- **Map View** - Local food donation points
- **Emotional Hero** - "You've helped feed 23 people this month ❤️"

### 🏢 NGO Dashboard

- **Pending Donations** - Food available near your location
- **Volunteer Management** - Assign, track, and manage volunteers
- **Verification Badge** - Display authenticity status
- **Analytics** - Food received, distributed, total volunteers
- **Leaderboard** - Top-performing volunteers

### 🛒 Small Business Dashboard

- **List Surplus Food** - Quick post creation
- **Donation Impact** - Track CSR contributions
- **Verification Status** - GST/business verification badge
- **Insights Graph** - Monthly food waste reduction
- **Post Analytics** - Total posts, active claims

### 🧾 Verifier Dashboard

- **Verification Queue** - Pending approvals table
- **Document Preview** - View submitted documents
- **Approve/Reject/Flag** - Quick action buttons
- **Filters** - By user type (NGO/Business)
- **Audit Trail** - "Verified 14 NGOs this week"

### ⚙️ Admin Dashboard

- **Platform Metrics** - Users, NGOs, businesses, claims
- **Map Heatmap** - Activity visualization
- **Issue Management** - Reported cases and resolutions
- **User Tools** - Suspend, verify, manage users
- **Analytics Charts** - Recharts/Chart.js visualizations

---

## 🗺️ Map Integration

### Features

- **Interactive Markers** - Click to view food details
- **Marker Clustering** - Group nearby markers for performance
- **Current Location** - Auto-detect user location
- **Search & Filters** - Find food by location, type, distance
- **Custom Popups** - Rich info cards on marker click

### Implementation
```jsx
import MapView from '../components/MapView';

<MapView
  center={[28.6139, 77.2090]}
  zoom={12}
  markers={foodListings}
/>
```

---

## 📱 Responsive Design

### Mobile-First Approach

- All layouts built mobile-first
- Hamburger menu for mobile navigation
- Touch-optimized buttons and cards
- No horizontal scroll
- Grid adapts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### Performance

- Lazy loading for routes and images
- Code splitting per route
- Optimized bundle size with Vite
- Skeleton loaders for async content

---

## 🧪 Testing (Future Implementation)
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options

- **Vercel** - Recommended for Vite projects
- **Netlify** - Easy continuous deployment
- **AWS S3 + CloudFront** - Scalable static hosting
- **Docker** - Containerized deployment

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://api.foodlink.com
VITE_ENABLE_ANALYTICS=true
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```

4. **Push to the branch**
```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic

---

## 🐛 Known Issues & Roadmap

### Known Issues

- ⚠️ Map clustering performance with 1000+ markers
- ⚠️ Dark mode toggle (in progress)

### Roadmap

- [ ] PWA support (offline-ready)
- [ ] Real-time notifications (WebSockets)
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] AI-powered food matching
- [ ] Blockchain donation tracking

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors & Contributors

- **Your Name** - *Initial work* - [@yourusername](https://github.com/yourusername)

See also the list of [contributors](https://github.com/yourusername/foodlink/contributors) who participated in this project.

---

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) - Map data
- [Leaflet.js](https://leafletjs.com/) - Mapping library
- [TailwindCSS](https://tailwindcss.com/) - Design system
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management pattern
- [Vite](https://vitejs.dev/) - Lightning-fast build tool

---

## 📧 Contact & Support

- **Email:** support@foodlink.com
- **Twitter:** [@foodlink](https://twitter.com/foodlink)
- **Discord:** [Join our community](https://discord.gg/foodlink)

---

## 🌟 Star History

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

---

<div align="center">
  <strong>Made with ❤️ for reducing food waste and fighting hunger</strong>
</div>
