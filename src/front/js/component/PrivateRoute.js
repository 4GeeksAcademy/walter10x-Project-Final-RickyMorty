import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";

export const PrivateRoute = () => {
    const { store } = useContext(Context);

    return store.auth ? <Outlet /> : <Navigate to="/" />;
};
