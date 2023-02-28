import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SignupForm from "../SignupForm/SignupForm";

import "./LoginSignupModal.scss";
import LoginForm from "../LoginForm/LoginForm";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

function LoginSignupModal({ login_txt, type, message, setMessage, account, setAccount, login_box }) {
    return (
        <>
            <div
                className="modal fade"
                tabIndex="-1"
                role="dialog"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
                id="loginsignupmodal"
            >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{type}</h5>
                            <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAccount("login")}>
                                <span aria-hidden="true">
                                    <FontAwesomeIcon icon="xmark" />
                                </span>
                            </button>
                        </div>
                        {type === "Signup" ? (
                            <SignupForm login_txt={login_txt} setMessage={setMessage} setAccount={setAccount} type="loginsignup" />
                        ) : account === "login" ? (
                            <LoginForm login_txt={login_txt} login_box={login_box} message={message} setAccount={setAccount} type="loginsignup" />
                        ) : (
                            <ForgotPasswordForm login_txt={login_txt} setMessage={setMessage} setAccount={setAccount} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginSignupModal;
