import { useAuth } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  // Check for stored user data in localStorage as a fallback
  const storedUser = localStorage.getItem('user');

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Allow access if either user is authenticated or we have stored user data
  if (!user && !storedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
