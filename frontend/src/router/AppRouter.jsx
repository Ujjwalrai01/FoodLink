import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home/Home";
import OtpLogin from "../components/auth/OtpLogin";
import Onboarding from "../components/auth/Onboarding";
import IndividualDashboard from "../pages/Dashboard/IndividualDashboard";
import NgoDashboard from "../pages/Dashboard/NgoDashboard";
import BusinessDashboard from "../pages/Dashboard/BusinessDashboard";
import VerifierDashboard from "../pages/Dashboard/VerifierDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AddFood from "../pages/Food/AddFood";
import FoodFeed from "../pages/Food/FoodFeed";
import FoodDetail from "../pages/Food/FoodDetail";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import EditProfile from "../pages/Profile/EditProfile";

function AppRouter() {
  const { isAuthenticated, isOnboardingComplete, role,user } = useSelector((state) => state.auth);

  const getDashboardByRole = () => {
    switch (user.entityType) {
      case "individual":
        return <IndividualDashboard />;
      case "ngo":
      case "org":
        return <NgoDashboard />;
      case "business":
      case "small_business":
        return <BusinessDashboard />;
      case "verifier":
        return <VerifierDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  // If authenticated but onboarding not complete, redirect to onboarding
  if (isAuthenticated && !isOnboardingComplete) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <OtpLogin />}
      />
      <Route
        path="/onboarding"
        element={
          isAuthenticated && !isOnboardingComplete ? (
            <Onboarding />
          ) : (
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
          )
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={getDashboardByRole()} />
        <Route path="/food/add" element={<AddFood />} />
        <Route path="/food/feed" element={<FoodFeed />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
