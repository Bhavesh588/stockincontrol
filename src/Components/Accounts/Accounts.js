import React from "react";

import "./Accounts.scss";

function Accounts({ id, name, type, bgcolor, setManager_select }) {
    if (type === "manager" || type === "employee") {
        return (
            <div
                className="accounts rounded-4 d-flex justify-content-center align-items-center mx-2 "
                style={{ backgroundColor: bgcolor, width: "200px", height: "200px", fontWeight: "600", cursor: "pointer" }}
                onClick={() => setManager_select(id)}
            >
                <span>{name}</span>
            </div>
        );
    } else {
        return (
            <div
                className="accounts bg-primary rounded-4 d-flex justify-content-center align-items-center mx-2"
                style={{ width: "200px", height: "200px", fontWeight: "600" }}
            >
                <span>{name}</span>
            </div>
        );
    }
}

export default Accounts;
