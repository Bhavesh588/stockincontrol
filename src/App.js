import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import loader from "./assets/Loader.gif";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

const Login = lazy(() => import("./Pages/Login/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

// prettier-ignore
function App() {
    const [account, setAccount] = useState("login");
    const [login_box, setLogin_box] = useState("#ffffff");
    const [login_txt, setLogin_txt] = useState("#000000");
    const [side_box, setSide_box] = useState("#141414");
    const [app_back, setApp_back] = useState(["#1b1b1b", "#141414"]);
    const [blending, setBlending] = useState([50, 50]);
    const [back_rotate, setBack_rotate] = useState(90);
    const [message, setMessage] = useState("");

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute />}>
                        <Route exact path="/" element={
                                <Suspense fallback={<div className="load"><div style={{ width: "100px" }}><img src={loader} alt="loader" style={{ width: "100%" }}/></div></div>}>
                                    <Dashboard login_txt={login_txt} login_box={login_box} message={message} setMessage={setMessage} account={account} setAccount={setAccount} />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route exact path="/login" element={
                            <Suspense fallback={<div className="load"><div style={{ width: "100px" }}><img src={loader} alt="loader" style={{ width: "100%" }}/></div></div>}>
                                <Login 
                                    account={account} 
                                    setAccount={setAccount}
                                    login_box={login_box}
                                    setLogin_box={setLogin_box}
                                    login_txt={login_txt}
                                    setLogin_txt={setLogin_txt}
                                    side_box={side_box}
                                    setSide_box={setSide_box}
                                    app_back={app_back}
                                    setApp_back={setApp_back}
                                    blending={blending}
                                    setBlending={setBlending}
                                    back_rotate={back_rotate}
                                    setBack_rotate={setBack_rotate}
                                    message={message}
                                    setMessage={setMessage}
                                />
                            </Suspense>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
