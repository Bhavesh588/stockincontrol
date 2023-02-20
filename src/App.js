import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import "./App.scss";

import loader from "./assets/Loader.gif";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

const Login = lazy(() => import("./Pages/Login/Login"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));

// prettier-ignore
function App() {

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute />}>
                        <Route exact path="/" element={
                                <Suspense fallback={<div className="load"><div style={{ width: "100px" }}><img src={loader} alt="loader" style={{ width: "100%" }}/></div></div>}>
                                    <Dashboard />
                                </Suspense>
                            }
                        />
                    </Route>
                    <Route exact path="/login" element={
                            <Suspense fallback={<div className="load"><div style={{ width: "100px" }}><img src={loader} alt="loader" style={{ width: "100%" }}/></div></div>}>
                                <Login />
                            </Suspense>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;
