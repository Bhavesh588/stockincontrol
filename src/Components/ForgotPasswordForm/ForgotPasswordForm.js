import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useAuth } from "../../contexts/AuthContext";

import "./ForgotPasswordForm.scss";

function ForgotPasswordForm({ login_txt, setMessage, setAccount }) {
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const [main_err, setMain_err] = useState("");

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

    const onSubmit = async (values, { resetForm }) => {
        // alert(JSON.stringify(values, null, 2));
        try {
            setMain_err("");
            setMessage("");
            setLoading(true);
            await resetPassword(values.email);
            setMessage("Check your inbox for futher instructions");
            resetForm();
            setAccount("login");
        } catch (error) {
            setMain_err("Failed to reset Password");
        }
        setLoading(false);
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
                            {main_err === "" ? null : (
                                <div className="bg-danger p-1 text-center text-light">
                                    <strong>{main_err}</strong>
                                </div>
                            )}
                            <Field
                                type="email"
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
                            disabled={loading}
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
