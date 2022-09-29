import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";

const RequireAuth = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
