import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../../contexts/AuthContext";

import "./SignupForm.scss";
import { countries_data } from "../../Data/Countries_data";

function SignupForm({ login_txt, setMessage, setAccount, type }) {
    const { err, signup } = useAuth();
    const [main_err, setMain_err] = useState("");
    const [loading, setLoading] = useState(false);

    const validate = (values) => {
        const errors = {};

        var mailFormat = /\S+@\S+\.\S+/;
        if (!values.fullName) errors.fullName = "Required";
        if (!values.email.match(mailFormat)) errors.email = "Invalid Email address!";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        if (values.password !== values.confirmPassword) errors.confirmPassword = "Password does not match";
        if (!values.confirmPassword) errors.confirmPassword = "Required";
        if (!values.country) errors.country = "Required";
        if (!values.state) errors.state = "Required";

        return errors;
    };

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
        country: "",
        state: "",
        confirmPassword: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        try {
            setMain_err("");
            setLoading(true);
            await signup(values.email, values.password, values);
            if (err !== "") {
                resetForm();
                setAccount("login");
                setMessage("Verify your Email");
            }
        } catch (error) {
            setMain_err("Failed to create your account");
        }
        setLoading(false);
    };

    return (
        <div className="signup w-100 d-flex flex-column justify-content-center align-items-center">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} enableReinitialize={true}>
                {(props) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                        {type !== "loginsignup" ? <h2>Sign Up</h2> : null}
                        <div className="inputbox d-flex flex-column">
                            {main_err === "" ? null : (
                                <div className="bg-danger p-1 text-center text-light">
                                    <strong>{main_err}</strong>
                                </div>
                            )}
                            {err === "" ? null : (
                                <div className="bg-danger p-1 text-center text-light">
                                    <strong>{err}</strong>
                                </div>
                            )}
                            <Field
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.fullName && props.touched.fullName ? <span className="text-danger">{props.errors.fullName}</span> : null}
                            <Field
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.email && props.touched.email ? <span className="text-danger">{props.errors.email}</span> : null}
                            <Field
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.password && props.touched.password ? <span className="text-danger">{props.errors.password}</span> : null}
                            <Field
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.confirmPassword && props.touched.confirmPassword ? (
                                <span className="text-danger">{props.errors.confirmPassword}</span>
                            ) : null}
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
                            {props.errors.country && props.touched.country ? <span className="text-danger">{props.errors.country}</span> : null}
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
                            {props.errors.state && props.touched.state ? <span className="text-danger">{props.errors.state}</span> : null}
                        </div>
                        <button
                            type="submit"
                            className="login_btn"
                            disabled={loading}
                            style={{
                                color: `${login_txt}`,
                                borderColor: `${login_txt}`,
                            }}
                        >
                            Signup
                        </button>
                        {type === "loginsignup" ? (
                            <button
                                type="button"
                                className="m-0 mb-2 login_btn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => props.resetForm()}
                            >
                                <span aria-hidden="true">Close</span>
                            </button>
                        ) : null}
                    </Form>
                )}
            </Formik>
            {type !== "loginsignup" ? (
                <div className="not_account">
                    <span>Already have an account?</span>
                    <button
                        onClick={() => setAccount("login")}
                        style={{
                            color: `${login_txt}`,
                        }}
                    >
                        Login
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default SignupForm;
