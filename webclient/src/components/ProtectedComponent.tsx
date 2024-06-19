import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import useAuthenticated from "./useAuthenticated";

const ProtectedComponent = ({children}: any) => {
    const {isAuthenticated} = useAuthenticated();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return <>{children}</>;
}

export default ProtectedComponent;
