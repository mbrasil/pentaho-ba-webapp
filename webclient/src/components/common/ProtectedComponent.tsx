import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSessionContext } from "../../providers/Provider";

const ProtectedComponent = ({children}: any) => {
  const { isAuthenticated, username } = useSessionContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default ProtectedComponent;
