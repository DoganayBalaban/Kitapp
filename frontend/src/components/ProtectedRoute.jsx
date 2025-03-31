// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
