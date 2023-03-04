import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
    return localStorage.getItem("Register") ? <Outlet /> : <Navigate to="/login" />;
}
