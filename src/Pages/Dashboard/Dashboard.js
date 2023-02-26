import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Formik } from "formik";
import axios from "axios";

import { countries_data } from "../../Data/Countries_data";

import "./Dashboard.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Accounts from "../../Components/Accounts/Accounts";
import { Premium_plans_data } from "../../Data/Premium_plans_data";
import { Standard_plans_data } from "../../Data/Standard_plans_data";

function Dashboard({ login_txt, ...props }) {
    const { Register, updateRegister } = props;

    const [logout_err, setLogout_err] = useState("");
    const [bol_logout, setBol_logout] = useState(false);

    const [manager_select, setManager_select] = useState("All");
    const { currentUser, logout } = useAuth();

    useEffect(() => {
        if (!bol_logout) {
            if (Register === null) {
                axios.get(`http://localhost:5000/register/${currentUser.uid}`).then((res) => updateRegister(res.data[0]));
            } else {
                if (Register.country === null) {
                    if (document.getElementById("btn_modal")) {
                        var btn = document.getElementById("btn_modal");
                        btn.click();
                    }
                }
            }
        } else {
            setBol_logout(true);
        }
    }, [Register, updateRegister, currentUser, bol_logout]);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setBol_logout(true);
            await updateRegister(null);
            await logout();
            navigate("/login");
        } catch (error) {
            setLogout_err("Failed to Logout");
        }
    };

    const [main_err, setMain_err] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = (values) => {
        const errors = {};

        if (!values.country) errors.country = "Required";
        if (!values.state) errors.state = "Required";

        return errors;
    };

    const initialValues = {
        country: "",
        state: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        try {
            setMain_err("");
            setLoading(true);
            await axios
                .put("http://localhost:5000/register/edit", {
                    id: currentUser.uid,
                    country: values.country,
                    state: values.state,
                })
                .then(
                    async () =>
                        await updateRegister({
                            ...Register,
                            country: values.country,
                            state: values.state,
                        })
                );
            resetForm();
        } catch (error) {
            setMain_err("Failed to Edit");
        }
        setLoading(false);
    };

    return (
        <div className="dashboard">
            <div className="back_img_container">
                {/* <img src={require("../../assets/dyed fabric backdrop.jpg")} alt="back_img" className="img_style" /> */}
            </div>
            <button type="button" className="btn btn-primary d-none" id="btn_modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                id="exampleModal"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Details</h5>
                            {/* <button
                                type="button"
                                className="btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">
                                    <FontAwesomeIcon icon="xmark" />
                                </span>
                            </button> */}
                        </div>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} enableReinitialize={true}>
                            {(props) => (
                                <div>
                                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                                        <div className="modal-body d-flex flex-column justify-content-center align-items-center">
                                            <div className="inputbox d-flex flex-column">
                                                {main_err === "" ? null : (
                                                    <div className="bg-danger p-1 text-center text-light">
                                                        <strong>{main_err}</strong>
                                                    </div>
                                                )}
                                                <select
                                                    name="country"
                                                    defaultValue={props.values.country}
                                                    onChange={props.handleChange}
                                                    className="input_text"
                                                    style={{
                                                        color: `${login_txt}`,
                                                        borderColor: `${login_txt}`,
                                                        display: "block",
                                                    }}
                                                >
                                                    <option value="" label="Select Country" disabled />
                                                    {countries_data?.map((country, i) => (
                                                        <option value={country.country} label={country.country} key={i} />
                                                    ))}
                                                </select>
                                                {props.errors.country && props.touched.country ? (
                                                    <span className="text-danger">{props.errors.country}</span>
                                                ) : null}
                                                <select
                                                    name="state"
                                                    defaultValue={props.values.state}
                                                    onChange={props.handleChange}
                                                    className="input_text"
                                                    style={{
                                                        color: `${login_txt}`,
                                                        borderColor: `${login_txt}`,
                                                        display: "block",
                                                    }}
                                                >
                                                    <option value="" label="Select State" disabled />
                                                    {countries_data?.map((country, i) =>
                                                        props.values.country === country.country
                                                            ? country.states.map((state, ind) => <option value={state} label={state} key={ind} />)
                                                            : null
                                                    )}
                                                </select>
                                                {props.errors.state && props.touched.state ? (
                                                    <span className="text-danger">{props.errors.state}</span>
                                                ) : null}
                                            </div>
                                            {/* <button
                                                type="submit"
                                                className="login_btn"
                                                disabled={loading}
                                                style={{
                                                    color: `${login_txt}`,
                                                    borderColor: `${login_txt}`,
                                                }}
                                            >
                                                Save
                                            </button> */}
                                        </div>
                                        <div className="w-100 modal-footer d-flex justify-content-end">
                                            <button
                                                type="submit"
                                                className="btn"
                                                data-bs-dismiss="modal"
                                                disabled={loading}
                                                style={{
                                                    color: `${login_txt}`,
                                                    borderColor: `${login_txt}`,
                                                }}
                                            >
                                                Save
                                            </button>
                                            {/* <button
                                                type="button"
                                                className="btn"
                                                data-bs-dismiss="modal"
                                                onClick={() =>
                                                    props.resetForm()
                                                }
                                            >
                                                Close
                                            </button> */}
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between p-3 bg-dark text-light align-items-center">
                <div>Dashboard</div>
                <div>{Register?.subscribePlan}</div>
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
                {Register?.subscribePlan === "Basic" ? (
                    <span>
                        <strong>Full Name:</strong> {currentUser.displayName}
                        <br />
                        <strong>Email:</strong> {currentUser.email}
                        <br />
                        <strong>Email Verified:</strong> {JSON.stringify(currentUser.emailVerified)}
                        <br />
                        {Register?.country ? (
                            <>
                                <strong>Country:</strong> {Register.country}
                                <br />
                                <strong>State:</strong> {Register.state}
                                <br />
                            </>
                        ) : null}
                    </span>
                ) : (
                    <>
                        {Register?.subscribePlan === "Premium" ? (
                            <div>
                                <div className="master_admins">
                                    <h3>Master Admins</h3>
                                    <hr />
                                </div>
                                <div className="d-flex justify-content-center">
                                    {Premium_plans_data?.map((premium, index) => (
                                        <Accounts name={premium.name} type="masteradmin" key={index} login_txt={login_txt} />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {Register?.subscribePlan === "Premium" ? (
                            <div>
                                <div className="managers">
                                    <h3>Managers</h3>
                                    <hr />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="border rounded-4 d-flex justify-content-center align-items-center mx-2"
                                        style={{ width: "200px", height: "200px", fontWeight: "600", cursor: "pointer" }}
                                        onClick={() => setManager_select("All")}
                                    >
                                        <span>All</span>
                                    </div>
                                    {Premium_plans_data?.map((premium, index) =>
                                        premium.managers.map((manager, i) => (
                                            <Accounts
                                                id={manager.id}
                                                name={manager.name}
                                                key={i}
                                                type="manager"
                                                bgcolor={manager.bgcolor}
                                                setManager_select={setManager_select}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="managers">
                                    <h3>Managers</h3>
                                    <hr />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div
                                        className="border rounded-4 d-flex justify-content-center align-items-center mx-2"
                                        style={{ width: "200px", height: "200px", fontWeight: "600", cursor: "pointer" }}
                                        onClick={() => setManager_select("All")}
                                    >
                                        <span>All</span>
                                    </div>
                                    {Standard_plans_data?.map((standard, index) => (
                                        <Accounts
                                            id={standard.id}
                                            name={standard.name}
                                            key={index}
                                            type="manager"
                                            bgcolor={standard.bgcolor}
                                            setManager_select={setManager_select}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {Register?.subscribePlan === "Premium" ? (
                            <div>
                                <div className="employees">
                                    <h3>Employees</h3>
                                    <hr />
                                </div>
                                <div className="all_grids">
                                    {Premium_plans_data?.map((premium, index) =>
                                        premium.managers.map((manager, i) =>
                                            manager_select === "All"
                                                ? manager.employees.map((employee, n) => (
                                                      <Accounts name={employee.name} key={n} bgcolor={manager.bgcolor} type="employee" />
                                                  ))
                                                : manager_select === manager.id
                                                ? manager.employees.map((employee, n) => (
                                                      <Accounts name={employee.name} key={n} bgcolor={manager.bgcolor} type="employee" />
                                                  ))
                                                : null
                                        )
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="employees">
                                    <h3>Employees</h3>
                                    <hr />
                                </div>
                                <div className="d-flex justify-content-center">
                                    {Standard_plans_data?.map((standard, index) =>
                                        manager_select === "All"
                                            ? standard.employees.map((employee, n) => (
                                                  <Accounts name={employee.name} bgcolor={standard.bgcolor} key={n} type="employee" />
                                              ))
                                            : manager_select === standard.id
                                            ? standard.employees.map((employee, n) => (
                                                  <Accounts name={employee.name} bgcolor={standard.bgcolor} key={n} type="employee" />
                                              ))
                                            : null
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        Register: state.Register,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateRegister: (val) => {
            dispatch({
                type: "REGISTER",
                item: val,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
