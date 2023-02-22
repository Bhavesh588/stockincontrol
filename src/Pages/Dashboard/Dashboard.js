import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "./Dashboard.scss";

function Dashboard() {
    const [logout_err, setLogout_err] = useState("");
    const { currentUser, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            setLogout_err("Failed to Logout");
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between p-3 bg-dark text-light align-items-center">
                <div>Dashboard</div>
                <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                </button>
            </div>
            <div>
                {logout_err === "" ? null : (
                    <div className="bg-danger">
                        <strong>{logout_err}</strong>
                    </div>
                )}
                <span>
                    <strong>Full Name:</strong> {currentUser.displayName}
                    <br />
                    <strong>Email:</strong> {currentUser.email}
                    <br />
                    <strong>Email Verified:</strong>{" "}
                    {JSON.stringify(currentUser.emailVerified)}
                </span>
            </div>
        </div>
    );
}

export default Dashboard;
