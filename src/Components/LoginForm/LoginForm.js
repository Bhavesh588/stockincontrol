import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./LoginForm.scss";

function LoginForm({ login_txt, login_box, setAccount }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Handle Submit");
    };

    return (
        <div className="loginform w-100">
            <form
                onSubmit={handleSubmit}
                className="w-100 d-flex flex-column justify-content-center align-items-center"
            >
                <h2>Login</h2>
                <div className="inputbox d-flex flex-column">
                    <input
                        type="text"
                        placeholder="Email"
                        className="input_text"
                        style={{
                            color: `${login_txt}`,
                            borderColor: `${login_txt}`,
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input_text"
                        style={{
                            color: `${login_txt}`,
                            borderColor: `${login_txt}`,
                        }}
                    />
                </div>
                <div className="not_account">
                    <button
                        style={{
                            color: `${login_txt}`,
                        }}
                    >
                        Forgot Password?
                    </button>
                </div>
                <button
                    className="login_btn"
                    style={{
                        color: `${login_txt}`,
                        borderColor: `${login_txt}`,
                    }}
                >
                    Login
                </button>
                <div className="not_account">
                    <span>Don't have an account?</span>
                    <button
                        onClick={() => setAccount(true)}
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
                    <span
                        className="or_text"
                        style={{
                            backgroundColor: `${login_box}`,
                        }}
                    >
                        OR
                    </span>
                </div>
                <div className="btn-all facebook-btn d-flex align-items-center">
                    <FontAwesomeIcon
                        icon="fa-brands fa-facebook-f"
                        className="mx-2"
                    />
                    <span className="w-100 d-flex justify-content-center">
                        Login with Facebook
                    </span>
                </div>
                <div className="btn-all google-btn d-flex align-items-center">
                    <FontAwesomeIcon
                        icon="fa-brands fa-google"
                        className="mx-2"
                    />
                    <span className="w-100 d-flex justify-content-center">
                        Login with Google
                    </span>
                </div>
                <div className="btn-all twitter-btn d-flex align-items-center">
                    <FontAwesomeIcon
                        icon="fa-brands fa-twitter"
                        className="mx-2"
                    />
                    <span className="w-100 d-flex justify-content-center">
                        Login with Twitter
                    </span>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
