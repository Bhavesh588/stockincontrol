import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import "./LoginForm.scss";
import { useAuth } from "../../contexts/AuthContext";
import { connect } from "react-redux";
import axios from "axios";

function LoginForm({ login_txt, login_box, message, setAccount, login_type, login_email, type, ...props }) {
    const { all_data } = props;

    const { err, login, googleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [main_err, setMain_err] = useState("");

    const navigate = useNavigate();

    const validate = (values) => {
        const errors = {};

        var mailFormat = /\S+@\S+\.\S+/;
        if (!values.email.match(mailFormat)) errors.email = "Invalid Email address!";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";

        return errors;
    };

    const initialValues = {
        email: type !== "loginsignup" ? "" : login_email,
        password: "",
    };

    const onSubmit = async (values, { resetForm }) => {
        try {
            setMain_err("");
            setLoading(true);
            await login(values.email, values.password);
            resetForm();
            if (type === "loginsignup") {
                if (login_type === "Store") {
                    for (var i = 0; i < all_data.length; i++) {
                        for (var j = 0; j < all_data[i].employees.length; j++) {
                            if (all_data[i].employees[j].Email === values.email) {
                                if (all_data[i].employees[j].emailVerified === "1") {
                                    document.getElementById("logsignclose").click();
                                    navigate("/employeeorder");
                                    return;
                                }
                            }
                        }
                    }
                } else if (login_type === "Manager") {
                    if (all_data.find((ele) => ele.Email === values.email).emailVerified === "1") {
                        document.getElementById("logsignclose").click();
                        navigate("/manager");
                    }
                }
            } else {
                var data = {};
                await axios.get(`http://localhost:5000/deposito`).then((alldep) => {
                    data = alldep.data.find((ele) => ele.Email === values.email);
                    localStorage.setItem("Register", data);
                    // for (var i = 0; i < data.length; i++) {
                    //     if (data[i])
                    //     for (var j = 0; j < alldep.data.length; j++) {
                    //         if (alldep.data[j].Deposito_id_fk === data[i].Deposito_id) {
                    //             console.log(alldep.data[j]);
                    //         }
                    //     }
                    // }
                    // for (var i = 0; i < alldep.length; i++) {
                    //     if (alldep[i].Email === values.email) {
                    //         main_type = "Manager";
                    //         return;
                    //     } else {
                    //         for (var j = 0; j < alldep[i].employees.length; j++) {
                    //             if (alldep[i].employees[j].Email === values.email) {
                    //                 main_type = "Store";
                    //                 console.log(main_type);
                    //                 return;
                    //             }
                    //         }
                    //     }
                    // }
                });
                if (data.Type === "Store") {
                    navigate("/employeeorder");
                } else if (data.Type === "Manager") {
                    navigate("/manager");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            setMain_err("Your Email / Password does not correct");
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
            if (error.message !== "Firebase: Error (auth/popup-closed-by-user).") {
                setMain_err("Failed to sign in with Google");
            }
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
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} enableReinitialize={true}>
                {(props) => (
                    <Form className="w-100 d-flex flex-column justify-content-center align-items-center">
                        {type !== "loginsignup" ? <h2>Login</h2> : null}
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
                            {type !== "loginsignup" ? (
                                <>
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
                                    {props.errors.email && props.touched.email ? <span className="text-danger">{props.errors.email}</span> : null}
                                </>
                            ) : (
                                <div className="py-2">
                                    <span style={{ fontWeight: "600" }}>Email: </span>
                                    <span>{login_email}</span>
                                </div>
                            )}
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
                            {props.errors.password && props.touched.password ? <span className="text-danger">Required</span> : null}
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
            {type !== "loginsignup" ? (
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
            ) : null}
            {type !== "loginsignup" ? (
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
            ) : null}
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
            {type !== "loginsignup" ? (
                <div className="btn-all google-btn d-flex align-items-center" onClick={loginWithGoogle}>
                    <FontAwesomeIcon icon="fa-brands fa-google" className="mx-2" />
                    <span className="w-100 d-flex justify-content-center">Login with Google</span>
                </div>
            ) : null}
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

const mapStateToProps = (state) => {
    return {
        all_data: state.all_data,
    };
};

export default connect(mapStateToProps)(LoginForm);
