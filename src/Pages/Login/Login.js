import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Login.scss";
import RangeSlider from "../../Components/RangeSlider/RangeSlider";

function Login() {
    const [all_colors] = useState(["#ED7B2D", "#ffffff", "#1b1b1b", "#141414"]);
    const [login_box, setLogin_box] = useState("#ffffff");
    const [side_box, setSide_box] = useState("#141414");
    const [app_back, setApp_back] = useState(["#1b1b1b", "#141414"]);
    const [blending, setBlending] = useState([50, 50]);

    return (
        <div className="login">
            <div className="tilt-container">
                <div
                    className="background-style tooltip-2"
                    style={{
                        background: `linear-gradient(to right, ${app_back[0]} ${blending[0]}%, ${app_back[1]} ${blending[1]}%)`,
                    }}
                >
                    <span className="tooltiptext p-2">
                        <span>Layer Left</span>
                        <div className="d-flex">
                            {all_colors.map((color, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        setApp_back([color, app_back[1]])
                                    }
                                    className="color-box"
                                    style={{
                                        backgroundColor: `${color}`,
                                    }}
                                ></div>
                            ))}
                        </div>
                        <span>Layer Right</span>
                        <div className="d-flex">
                            {all_colors.map((color, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        setApp_back([app_back[0], color])
                                    }
                                    className="color-box"
                                    style={{
                                        backgroundColor: `${color}`,
                                    }}
                                ></div>
                            ))}
                        </div>
                        <span>Background Blending</span>
                        <RangeSlider
                            name="Left"
                            setBlending={setBlending}
                            blending={blending}
                        />
                        <RangeSlider
                            name="Right"
                            setBlending={setBlending}
                            blending={blending}
                        />
                    </span>
                </div>
                <div
                    className="tilt-box-wrap"
                    style={{ backgroundColor: `${side_box}` }}
                >
                    <div className="container h-100 d-flex align-items-center justify-content-center">
                        <div className="row">
                            <div className="col tooltip-2">
                                <span className="tooltiptext d-flex p-2">
                                    {all_colors.map((color, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setSide_box(color)}
                                            className="color-box"
                                            style={{
                                                backgroundColor: `${color}`,
                                            }}
                                        ></div>
                                    ))}
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
                                className="col d-flex flex-column justify-content-center align-items-center tooltip-2"
                                style={{ backgroundColor: `${login_box}` }}
                            >
                                <span className="tooltiptext d-flex p-2">
                                    {all_colors.map((color, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setLogin_box(color)}
                                            className="color-box"
                                            style={{
                                                backgroundColor: `${color}`,
                                            }}
                                        ></div>
                                    ))}
                                </span>
                                <h2>Login</h2>
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
                                <div className="btn-all instagram-btn d-flex align-items-center">
                                    <FontAwesomeIcon
                                        icon="fa-brands fa-instagram"
                                        className="mx-2"
                                    />
                                    <span className="w-100 d-flex justify-content-center">
                                        Login with Instagram
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
