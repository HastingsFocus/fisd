
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f9fc]">
        <div className="h-10 w-10 border-4 border-[#1BB7C4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/cms/login" replace />;
};

export default ProtectedRoute;
