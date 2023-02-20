import { Field, Form, Formik } from "formik";
import React from "react";

import "./ForgotPasswordForm.scss";

function ForgotPasswordForm({ login_txt, setAccount }) {
    const validate = (values) => {
        const errors = {};

        var mailFormat = /\S+@\S+\.\S+/;
        if (!values.email.match(mailFormat))
            errors.email = "Invalid Email address!";
        if (!values.email) errors.email = "Required";

        return errors;
    };

    const initialValues = {
        email: "",
    };

    const onSubmit = (values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        resetForm();
    };

    return (
        <div className="forgotpasswordform w-100 d-flex flex-column justify-content-center align-items-center">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                enableReinitialize={true}
            >
                {(props) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <h2>Send Email</h2>
                        <div className="inputbox d-flex flex-column">
                            <Field
                                type="text"
                                name="email"
                                placeholder="Email"
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
                        </div>
                        <button
                            type="submit"
                            className="login_btn"
                            style={{
                                color: `${login_txt}`,
                                borderColor: `${login_txt}`,
                            }}
                        >
                            Send Email
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="not_account">
                <span></span>
                <button
                    onClick={() => setAccount("login")}
                    style={{
                        color: `${login_txt}`,
                    }}
                >
                    Go Back to Login
                </button>
            </div>
        </div>
    );
}

export default ForgotPasswordForm;
