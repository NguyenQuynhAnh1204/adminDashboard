import { Navigate, Outlet } from "react-router-dom";

const ProRoute = ({ role, allowedRoles, children }) => {
  if (allowedRoles.includes(role)) {
    // Ưu tiên render children (vd: layout), nếu không có thì render Outlet
    return children ? children : <Outlet />;
  }

  // Nếu không có quyền
  return <Navigate to="/" replace />;
};

export default ProRoute;
