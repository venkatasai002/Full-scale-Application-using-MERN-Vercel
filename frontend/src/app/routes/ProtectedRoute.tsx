import { Navigate } from "react-router-dom";
import { useAuth } from "../../stores/context/auth.context";
import type { JSX } from "react";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole?: string }) => {
  const { token, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && token) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwtDecode(token);
    const userRole = decoded.role;

    if (userRole !== requiredRole) {
      return <Navigate to="/home" replace />;
    }
  }
  return children;
};
