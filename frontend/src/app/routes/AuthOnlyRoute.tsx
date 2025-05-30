import { Navigate } from "react-router-dom";
import { useAuth } from "../../stores/context/auth.context";
import type { JSX } from "react";

export const AuthOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};
