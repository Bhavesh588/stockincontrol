import React, { useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { auth, facebookAuth, googleAuth, twitterAuth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

// prettier-ignore
export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    async function signup(email, password, data, login_type, type) {
        setErr('')
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async (user) => {
                if (user !== null) {
                    updateProfile(user.user, {
                        displayName: data.fullName
                    })
                    var color = ''
                    for (var i = 0; i < 6; i++) {
                        color += Math.floor(Math.random() * 10);
                    }
                    var finalUser = {
                        Deposito_id: user.user.uid,
                        nombre: data.fullName,
                        Email: user.user.email,
                        Password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                        Employee_list: "[]",
                        Type: login_type,
                        emailVerified: user.user.emailVerified,
                        providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                        subscribePlan: type !== "loginsignup" ? "Basic" : null,
                        country: data.country,
                        state: data.state,
                        bgcolor: login_type === "Store" ? null : color,
                        Deposito_id_fk: type === "loginsignup" ? login_type === "Store" ? data.manager : currentUser.uid : null
                    };
                    await axios.post(
                        "http://localhost:5000/deposito/new",
                        finalUser
                    );
                    if (type !== "loginsignup") {
                        localStorage.setItem("Register", JSON.stringify(finalUser))
                        await sendEmailVerification(user.user, {
                            url: "http://localhost:3000/login",
                        });
                    } else {
                        await sendEmailVerification(user.user);
                    }
                }
            })
            .catch((err) => {
                if(err.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setErr("Email is Already Registered")
                }
            });
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then(async (user) => {
            setErr('')
            if(user !== null) {
                if(user.user.emailVerified) {
                    var finalEdit = {
                        id: user.user.uid,
                        displayName: user.user.displayName,
                        email: user.user.email,
                        password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                        emailVerified: user.user.emailVerified,
                        providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                        subscribePlan: "Basic",
                    };
                    await axios.put(
                        "http://localhost:5000/deposito/edit",
                        finalEdit
                    );
                } else {
                    setErr("Email is not Verified");
                }
            }
        })
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    async function googleLogin() {
        return signInWithPopup(auth, googleAuth).then(async (user) => {
            if (user !== null) {
                var color = ''
                for (var i = 0; i < 6; i++) {
                    color += Math.floor(Math.random() * 10);
                }
                var finalUser = {
                    Deposito_id: user.user.uid,
                    nombre: user.user.displayName,
                    Email: user.user.email,
                    Password: user.user.reloadUserInfo.passwordHash ? user.user.reloadUserInfo.passwordHash : null,
                    Employee_list: "[]",
                    Type: "Master Manager",
                    emailVerified: user.user.emailVerified,
                    providerId: user.user.reloadUserInfo.providerUserInfo[0].providerId,
                    subscribePlan: "Basic",
                    bgcolor: color
                };
                localStorage.setItem("Register", JSON.stringify(finalUser))
                await axios.get(`http://localhost:5000/deposito/${finalUser.Deposito_id}`).then(async (res) => {
                    if(res.data.length === 0) {
                        await axios.post(
                            "http://localhost:5000/deposito/new",
                            finalUser
                        );
                    }
                })
            }
        })
    }

    function facebookLogin() {
        return signInWithPopup(auth, facebookAuth);
    }

    function twitterLogin() {
        return signInWithPopup(auth, twitterAuth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null)
            }
            setLoading(false);
        });

        return unsubscribe;

    }, []);

    const value = {
        currentUser,
        err,
        signup,
        login,
        logout,
        resetPassword,
        googleLogin,
        facebookLogin,
        twitterLogin,
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
