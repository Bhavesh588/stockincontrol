import { Field, Form, Formik } from "formik";
import React from "react";

import "./SignupForm.scss";

function SignupForm({ login_txt, setAccount }) {
    const validate = (values) => {
        const errors = {};

        var mailFormat = /\S+@\S+\.\S+/;
        if (!values.email.match(mailFormat))
            errors.email = "Invalid Email address!";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        if (values.password !== values.confirmPassword)
            errors.confirmPassword = "Password does not match";
        if (!values.confirmPassword) errors.confirmPassword = "Required";

        return errors;
    };

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const onSubmit = (values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
    };

    return (
        <div className="signup w-100 d-flex flex-column justify-content-center align-items-center">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                enableReinitialize={true}
            >
                {(props) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <h2>Sign Up</h2>
                        <div className="inputbox d-flex flex-column">
                            <Field
                                type="text"
                                placeholder="Email"
                                name="email"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.email && props.touched.email ? (
                                <span className="text-danger">
                                    {props.errors.email}
                                </span>
                            ) : null}
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
                            {props.errors.password && props.touched.password ? (
                                <span className="text-danger">
                                    {props.errors.password}
                                </span>
                            ) : null}
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
                            {props.errors.confirmPassword &&
                            props.touched.confirmPassword ? (
                                <span className="text-danger">
                                    {props.errors.confirmPassword}
                                </span>
                            ) : null}
                        </div>
                        <button
                            type="submit"
                            className="login_btn"
                            style={{
                                color: `${login_txt}`,
                                borderColor: `${login_txt}`,
                            }}
                        >
                            Signup
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="not_account">
                <span>Already have an account?</span>
                <button
                    onClick={() => setAccount(false)}
                    style={{
                        color: `${login_txt}`,
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default SignupForm;
