import React from "react";

import "./Accounts.scss";

function Accounts({ id, name, type, bgcolor, setManager_select, login_txt }) {
    return (
        <div
            className={`accounts ${
                type === "manager" || type === "employee" ? "" : "bg-primary"
            } rounded-4 d-flex justify-content-center align-items-center mx-2`}
            style={
                type === "manager" || type === "employee"
                    ? { backgroundColor: bgcolor, cursor: "pointer", width: "200px", height: "200px", fontWeight: "600" }
                    : { width: "200px", height: "200px", fontWeight: "600" }
            }
            onClick={() => (type === "manager" || type === "employee" ? setManager_select(id) : null)}
        >
            <div className="hover-details rounded-4 bg-success w-100 h-100 d-flex flex-column justify-content-between">
                <div className="container-fluid p-0">
                    <div className="row m-1">
                        <div className="col-md-6 p-1">
                            <div className="rounded-1 d-flex flex-column bg-danger px-2 py-1">
                                <span style={{ fontSize: "12px" }}>Total Sales</span>
                                <span style={{ fontSize: "12px" }}>2000</span>
                            </div>
                        </div>
                        <div className="col-md-6 p-1">
                            <div className="rounded-1 d-flex flex-column bg-info px-2 py-1">
                                <span style={{ fontSize: "12px" }}>Total Sales</span>
                                <span style={{ fontSize: "12px" }}>2000</span>
                            </div>
                        </div>
                        <div className="col-md-6 p-1">
                            <div className="rounded-1 d-flex flex-column bg-info px-2 py-1">
                                <span style={{ fontSize: "12px" }}>Total Sales</span>
                                <span style={{ fontSize: "12px" }}>2000</span>
                            </div>
                        </div>
                        <div className="col-md-6 p-1">
                            <div className="rounded-1 d-flex flex-column bg-danger px-2 py-1">
                                <span style={{ fontSize: "12px" }}>Total Sales</span>
                                <span style={{ fontSize: "12px" }}>2000</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-2">
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            color: `white`,
                            borderColor: `white`,
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
            <span className="text-display">{name}</span>
        </div>
    );
}

export default Accounts;
