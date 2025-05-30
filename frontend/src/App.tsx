import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/home/Home";
import Dashboard from "./features/dashboard/Dashboard";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";
import { AuthProvider } from "./stores/context/auth.context";
import { AuthOnlyRoute } from "./app/routes/AuthOnlyRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthOnlyRoute>
                <LoginPage />
              </AuthOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthOnlyRoute>
                <RegisterPage />
              </AuthOnlyRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* fallback route to redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
