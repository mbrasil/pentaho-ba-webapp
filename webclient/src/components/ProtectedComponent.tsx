import React from "react";
import {Navigate} from "react-router-dom";
import useAuthenticated from "./useAuthenticated";

const ProtectedComponent = ({children}: any) => {
    const {isAuthenticated} = useAuthenticated();

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace={true}/>
        );
    }

    return <>{children}</>;
}

export default ProtectedComponent;
