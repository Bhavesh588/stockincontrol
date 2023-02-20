import React from "react";

import "./SignupForm.scss";

function SignupForm({ login_txt, setAccount }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Handle Submit");
    };

    return (
        <div className="signup w-100">
            <form
                onSubmit={handleSubmit}
                className="w-100 d-flex flex-column justify-content-center align-items-center"
            >
                <h2>Sign Up</h2>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="input_text"
                        style={{
                            color: `${login_txt}`,
                            borderColor: `${login_txt}`,
                        }}
                    />
                </div>
                <button
                    className="login_btn"
                    style={{
                        color: `${login_txt}`,
                        borderColor: `${login_txt}`,
                    }}
                >
                    Signup
                </button>
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
            </form>
        </div>
    );
}

export default SignupForm;
