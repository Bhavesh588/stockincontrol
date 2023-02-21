import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import "./LoginForm.scss";
import { useAuth } from "../../contexts/AuthContext";

function LoginForm({ login_txt, login_box, message, setAccount }) {
    const { err, login, googleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [main_err, setMain_err] = useState("");

    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};

        var mailFormat = /\S+@\S+\.\S+/;
        if (!values.email.match(mailFormat))
            errors.email = "Invalid Email address!";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";

        return errors;
    };

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            setMain_err("");
            setLoading(true);
            await login(values.email, values.password);
            resetForm();
            navigate("/");
        } catch (error) {
            setMain_err("Failed to sign in");
        }
        setLoading(false);
    };

    const loginWithGoogle = async () => {
        try {
            setMain_err("");
            setLoading(true);
            await googleLogin();
            navigate("/");
        } catch (error) {
            setMain_err("Failed to sign in with Google");
        }
        setLoading(false);
    };

    // const loginWithFacebook = async () => {
    //     try {
    //         setMain_err("");
    //         setLoading(true);
    //         await facebookLogin();
    //         navigate("/");
    //     } catch (error) {
    //         setMain_err("Failed to sign in with Facebook");
    //     }
    //     setLoading(false);
    // };

    // const loginWithTwitter = async () => {
    //     try {
    //         setMain_err("");
    //         setLoading(true);
    //         await twitterLogin();
    //         navigate("/");
    //     } catch (error) {
    //         setMain_err("Failed to sign in with Facebook");
    //     }
    //     setLoading(false);
    // };

    return (
        <div className="loginform w-100 d-flex flex-column justify-content-center align-items-center">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
                enableReinitialize={true}
            >
                {(props) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                        <h2>Login</h2>
                        <div className="inputbox d-flex flex-column">
                            {err === "" ? null : (
                                <div className="bg-danger p-1 text-center text-light">
                                    <strong>{err}</strong>
                                </div>
                            )}
                            {main_err === "" ? null : (
                                <div className="bg-danger p-1 text-center text-light">
                                    <strong>{main_err}</strong>
                                </div>
                            )}
                            {message === "" ? null : (
                                <div className="bg-success p-1 text-center text-light">
                                    <strong>{message}</strong>
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
                            <Field
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input_text"
                                style={{
                                    color: `${login_txt}`,
                                    borderColor: `${login_txt}`,
                                }}
                            />
                            {props.errors.password && props.touched.password ? (
                                <span className="text-danger">Required</span>
                            ) : null}
                        </div>
                        <div className="not_account">
                            <button
                                onClick={() => setAccount("forgotpassword")}
                                type="button"
                                style={{
                                    color: `${login_txt}`,
                                }}
                            >
                                Forgot Password?
                            </button>
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
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="not_account">
                <span>Don't have an account?</span>
                <button
                    onClick={() => setAccount("signup")}
                    style={{
                        color: `${login_txt}`,
                    }}
                >
                    Create Account
                </button>
            </div>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <hr
                    style={{
                        backgroundColor: `${login_txt}`,
                    }}
                />
                <div
                    className="or_text"
                    style={{
                        backgroundColor: `${login_box}`,
                    }}
                >
                    OR
                </div>
            </div>
            {/* <div
                className="btn-all facebook-btn d-flex align-items-center"
                onClick={loginWithFacebook}
            >
                <FontAwesomeIcon
                    icon="fa-brands fa-facebook-f"
                    className="mx-2"
                />
                <span className="w-100 d-flex justify-content-center">
                    Login with Facebook
                </span>
            </div> */}
            <div
                className="btn-all google-btn d-flex align-items-center"
                onClick={loginWithGoogle}
            >
                <FontAwesomeIcon icon="fa-brands fa-google" className="mx-2" />
                <span className="w-100 d-flex justify-content-center">
                    Login with Google
                </span>
            </div>
            {/* <div
                className="btn-all twitter-btn d-flex align-items-center"
                onClick={loginWithTwitter}
            >
                <FontAwesomeIcon icon="fa-brands fa-twitter" className="mx-2" />
                <span className="w-100 d-flex justify-content-center">
                    Login with Twitter
                </span>
            </div> */}
        </div>
    );
}

export default LoginForm;
