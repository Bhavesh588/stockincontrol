import React from "react";

import "./Login.scss";
import RangeSlider from "../../Components/RangeSlider/RangeSlider";
import ColorPicker from "../../Components/ColorPicker/ColorPicker";
import SignupForm from "../../Components/SignupForm/SignupForm";
import LoginForm from "../../Components/LoginForm/LoginForm";
import ForgotPasswordForm from "../../Components/ForgotPasswordForm/ForgotPasswordForm";

function Login({
    account,
    setAccount,
    login_box,
    setLogin_box,
    login_txt,
    setLogin_txt,
    side_box,
    setSide_box,
    app_back,
    setApp_back,
    blending,
    setBlending,
    back_rotate,
    setBack_rotate,
    message,
    setMessage,
}) {
    return (
        <div className="login">
            <div className="tilt-container">
                <div
                    className="background-style tooltip-2"
                    style={{
                        background: `linear-gradient(${back_rotate}deg, ${app_back[0]} ${blending[0]}%, ${app_back[1]} ${blending[1]}%)`,
                    }}
                >
                    <span className="tooltiptext p-2">
                        <span>Layer Left</span>
                        <ColorPicker
                            onClick={(color) =>
                                setApp_back([color, app_back[1]])
                            }
                        />
                        <span>Layer Right</span>
                        <ColorPicker
                            onClick={(color) =>
                                setApp_back([app_back[0], color])
                            }
                        />
                        <span>Background Blending</span>
                        <RangeSlider
                            name="Left"
                            min="0"
                            max="100"
                            onChange={(e) =>
                                setBlending([e.target.value, blending[1]])
                            }
                            slider={blending[0]}
                        />
                        <RangeSlider
                            name="Right"
                            min="0"
                            max="100"
                            onChange={(e) =>
                                setBlending([blending[0], e.target.value])
                            }
                            slider={blending[1]}
                        />
                        <span>Background Rotate</span>
                        <RangeSlider
                            name="Degree"
                            min="0"
                            max="180"
                            onChange={(e) => setBack_rotate(e.target.value)}
                            slider={back_rotate}
                        />
                    </span>
                </div>
                <div
                    className="tilt-box-wrap"
                    style={{ backgroundColor: `${side_box}` }}
                >
                    <div className="container h-100 d-flex align-items-center justify-content-center">
                        <div className="row">
                            <div className="col-md tooltip-2">
                                <span className="tooltiptext d-flex flex-column p-2">
                                    <span>Background Color</span>
                                    <div className="my-1">
                                        <ColorPicker
                                            onClick={(color) =>
                                                setSide_box(color)
                                            }
                                        />
                                    </div>
                                </span>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="t_over"></div>
                                <div className="tilt-box">
                                    <div className="img_cloud w-100 h-100">
                                        <img
                                            src={require("../../assets/Cloud.png")}
                                            alt="cloud"
                                            className="w-100 h-100"
                                        />
                                    </div>
                                    <div className="img_main h-100">
                                        <img
                                            src={require("../../assets/mainBackground.png")}
                                            alt="cloud"
                                            className="w-100 h-100"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-md d-flex flex-column justify-content-center align-items-center tooltip-2"
                                style={{
                                    backgroundColor: `${login_box}`,
                                    color: `${login_txt}`,
                                }}
                            >
                                <span className="tooltiptext d-flex flex-column p-2">
                                    <span>Background Color</span>
                                    <div className="my-1">
                                        <ColorPicker
                                            onClick={(color) =>
                                                setLogin_box(color)
                                            }
                                        />
                                    </div>
                                    <span>Text Color</span>
                                    <div className="my-1">
                                        <ColorPicker
                                            onClick={(color) =>
                                                setLogin_txt(color)
                                            }
                                        />
                                    </div>
                                </span>
                                {account === "signup" ? (
                                    <SignupForm
                                        login_txt={login_txt}
                                        setMessage={setMessage}
                                        setAccount={setAccount}
                                    />
                                ) : account === "login" ? (
                                    <LoginForm
                                        login_txt={login_txt}
                                        login_box={login_box}
                                        message={message}
                                        setAccount={setAccount}
                                    />
                                ) : (
                                    <ForgotPasswordForm
                                        login_txt={login_txt}
                                        setMessage={setMessage}
                                        setAccount={setAccount}
                                    />
                                )}
                                {/* <div className="btn-all instagram-btn d-flex align-items-center">
                                    <FontAwesomeIcon
                                        icon="fa-brands fa-instagram"
                                        className="mx-2"
                                    />
                                    <span className="w-100 d-flex justify-content-center">
                                        Login with Instagram
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
